<?php

namespace Biz\WeChatNotification\Event;

use Biz\Course\Service\CourseService;
use Codeages\Biz\Framework\Queue\Service\QueueService;
use Codeages\Biz\Framework\Scheduler\Service\SchedulerService;
use Codeages\Biz\Framework\Event\Event;
use Codeages\PluginBundle\Event\EventSubscriber;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Biz\AppLoggerConstant;

class WeChatNotificationEventSubscriber extends EventSubscriber implements EventSubscriberInterface
{
    private $testpaperStatus = array('excellent' => '优秀', 'good' => '良好', 'passed' => '合格', 'unpassed' => '不合格');

    /**
     * @return mixed
     */
    public static function getSubscribedEvents()
    {
        return array(
            'course.task.unpublish' => 'onTaskUnpublish',
            'course.task.publish' => 'onTaskPublish',
            'course.task.update' => 'onTaskUpdate',
            'course.task.delete' => 'onTaskDelete',
            'exam.reviewed' => 'onTestpaperReviewd',
            'payment_trade.paid' => 'onPaid',
        );
    }

    public function onTaskPublish(Event $event)
    {
        $task = $event->getSubject();
        $course = $this->getCourseService()->getCourse($task['courseId']);
        $courseSet = $this->getCourseSetService()->getCourseSet($course['courseSetId']);
        if ('published' != $courseSet['status'] || 'published' != $course['status']) {
            return;
        }

        if ('live' == $task['type']) {
            $key = 'liveTaskUpdate';
            $this->deleteLiveNotificationJob($task);
            $this->registerLiveNotificationJob($task);
        } else {
            $key = 'normalTaskUpdate';
        }

        $this->deleteLessonPublishJob($task);
        $this->registerLessonNotifiactionJob($key, $task);
    }

    public function onTaskUnpublish(Event $event)
    {
        $task = $event->getSubject();
        $this->deleteLiveNotificationJob($task);
    }

    public function onTaskDelete(Event $event)
    {
        $task = $event->getSubject();
        $this->deleteLiveNotificationJob($task);
    }

    public function onTaskUpdate(Event $event)
    {
        $task = $event->getSubject();
        if ('live' == $task['type']) {
            $this->deleteLiveNotificationJob($task);

            if ('published' == $task['status']) {
                $this->registerLiveNotificationJob($task);
            }
        }
    }

    public function onTestpaperReviewd(Event $event)
    {
        $paperResult = $event->getSubject();
        $task = $this->getTaskService()->getTask($paperResult['lessonId']);

        if ('testpaper' == $paperResult['type']) {
            $key = 'examResult';
            $logName = 'wechat_notify_exam_result';
            $data = array(
                'first' => array('value' => '同学，你好，你的试卷已批阅完成'),
                'keyword1' => array('value' => $task['title']),
                'keyword2' => array('value' => $paperResult['score']),
                'remark' => array('value' => '再接再厉哦'),
            );
        } elseif ('homework' == $paperResult['type']) {
            $key = 'homeworkResult';
            $logName = 'wechat_notify_homework_result';
            $course = $this->getCourseService()->getCourse($task['courseId']);
            $teachers = $this->getCourseMemberService()->searchMembers(
                array('courseId' => $course['id'], 'role' => 'teacher', 'isVisible' => 1),
                array('id' => 'asc'),
                0,
                1
            );
            if (empty($teachers)) {
                $nickname = '';
            } else {
                $user = $this->getUserService()->getUser($teachers[0]['userId']);
                $nickname = $user['nickname'];
            }

            $data = array(
                'first' => array('value' => '同学，你好，你的作业已批阅完成'),
                'keyword1' => array('value' => $task['title']),
                'keyword2' => array('value' => $course['courseSetTitle']),
                'keyword3' => array('value' => $nickname),
                'remark' => array('value' => '作业结果：'.$this->testpaperStatus[$paperResult['passedStatus']]),
            );
        } else {
            return;
        }

        $templateId = $this->getWeChatService()->getTemplateId($key);
        if (empty($templateId)) {
            return;
        }

        $options = array('type' => 'url', 'url' => $this->generateUrl('course_task_show', array('courseId' => $task['courseId'], 'id' => $task['id']), true));
        $weChatUser = $this->getWeChatService()->getOfficialWeChatUserByUserId($paperResult['userId']);
        if (empty($weChatUser['isSubscribe'])) {
            return;
        }

        $list = array(array(
            'channel' => 'wechat',
            'to_id' => $weChatUser['openId'],
            'template_id' => $templateId,
            'template_args' => $data,
            'goto' => $options,
        ));
        $this->sendCloudWeChatNotification($key, $logName, $list);
    }

    public function onPaid(Event $event)
    {
        $trade = $event->getSubject();
        $chargeTemplateId = $this->getWeChatService()->getTemplateId('coinRecharge');
        $payTemplateId = $this->getWeChatService()->getTemplateId('paySuccess');
        if (!empty($chargeTemplateId) && 'recharge' == $trade['type']) {
            $data = array(
                'first' => array('value' => '尊敬的客户，您已充值成功'),
                'keyword1' => array('value' => '现金充值或学习卡'),
                'keyword2' => array('value' => $trade['trade_sn']),
                'keyword3' => array('value' => $trade['amount'] / 100),
                'keyword4' => array('value' => date('Y-m-d H:i', $trade['pay_time'])),
                'remark' => array('value' => '快去看看课程吧~'),
            );
            $options = array('type' => 'url', 'url' => $this->generateUrl('course_set_explore', array(), true));
            $weChatUser = $this->getWeChatService()->getOfficialWeChatUserByUserId($trade['user_id']);
            if (!empty($weChatUser['isSubscribe'])) {
                $list = array(array(
                    'channel' => 'wechat',
                    'to_id' => $weChatUser['openId'],
                    'template_id' => $chargeTemplateId,
                    'template_args' => $data,
                    'goto' => $options,
                ));
                $this->sendCloudWeChatNotification('coinRecharge', 'wechat_notify_coin_recharge', $list);
            }
        }

        if (!empty($payTemplateId)) {
            $data = array(
                'first' => array('value' => '尊敬的客户，您已支付成功'),
                'keyword1' => array('value' => $trade['title']),
                'keyword2' => array('value' => $trade['amount'] / 100),
                'keyword3' => array('value' => date('Y-m-d H:i', $trade['pay_time'])),
                'remark' => array('value' => '请前往查看'),
            );
            $order = $this->getOrderService()->getOrderBySn($trade['order_sn']);
            if (empty($order)) {
                return;
            }
            $orderItems = $this->getOrderService()->findOrderItemsByOrderId($order['id']);
            $options = array('type' => 'url', 'url' => $this->getOrderTargetDetailUrl($orderItems[0]['target_type'], $orderItems[0]['target_id']));
            $weChatUser = empty($weChatUser) ? $this->getWeChatService()->getOfficialWeChatUserByUserId($trade['user_id']) : $weChatUser;
            if (!empty($weChatUser['isSubscribe'])) {
                $list = array(array(
                    'channel' => 'wechat',
                    'to_id' => $weChatUser['openId'],
                    'template_id' => $payTemplateId,
                    'template_args' => $data,
                    'goto' => $options,
                ));
                $this->sendCloudWeChatNotification('paySuccess', 'wechat_notify_pay_success', $list);
            }
        }
    }

    protected function sendCloudWeChatNotification($key, $logName, $list)
    {
        try {
            $result = $this->getCloudNotificationClient()->sendNotifications($list);
        } catch (\Exception $e) {
            $this->getLogService()->error(AppLoggerConstant::NOTIFY, $logName, "发送微信通知失败:template:{$key}", array('error' => $e->getMessage()));

            return;
        }

        if (empty($result['sn'])) {
            $this->getLogService()->error(AppLoggerConstant::NOTIFY, $logName, "发送微信通知失败:template:{$key}", $result);

            return;
        }

        $this->getNotificationService()->createWeChatNotificationRecord($result['sn'], $key, $list[0]['template_args']);
    }

    private function getOrderTargetDetailUrl($targetType, $targetId)
    {
        switch ($targetType) {
            case 'course':
                return $this->generateUrl('course_show', array('id' => $targetId), true);

            case 'classroom':
                return $this->generateUrl('classroom_show', array('id' => $targetId), true);

            case 'vip':
                return $this->generateUrl('vip', array(), true);

            default:
                return '';
        }
    }

    private function registerLessonNotifiactionJob($key, $task)
    {
        $templateId = $this->getWeChatService()->getTemplateId($key);
        if (!empty($templateId)) {
            $job = array(
                'name' => 'WeChatNotitficationJob_LessonPublish_'.$task['id'],
                'expression' => time(),
                'class' => 'Biz\WeChatNotification\Job\LessonPublishNotificationJob',
                'misfire_threshold' => 60 * 60,
                'args' => array(
                    'key' => $key,
                    'taskId' => $task['id'],
                    'url' => $this->generateUrl('course_task_show', array('courseId' => $task['courseId'], 'id' => $task['id']), true),
                ),
            );
            $this->getSchedulerService()->register($job);
        }
    }

    private function registerLiveNotificationJob($task)
    {
        $hourTemplateId = $this->getWeChatService()->getTemplateId('oneHourBeforeLiveOpen');
        $dayTemplateId = $this->getWeChatService()->getTemplateId('oneDayBeforeLiveOpen');
        if (!empty($hourTemplateId) && $task['startTime'] >= (time() + 24 * 60 * 60)) {
            $job = array(
                'name' => 'WeChatNotificationJob_LiveOneHour_'.$task['id'],
                'expression' => intval($task['startTime'] - 24 * 60 * 60),
                'class' => 'Biz\WeChatNotification\Job\LiveNotificationJob',
                'misfire_threshold' => 60 * 60,
                'args' => array(
                    'key' => 'oneHourBeforeLiveOpen',
                    'taskId' => $task['id'],
                    'url' => $this->generateUrl('course_task_show', array('courseId' => $task['courseId'], 'id' => $task['id']), true),
                ),
            );
            $this->getSchedulerService()->register($job);
        }

        if (!empty($dayTemplateId) && $task['startTime'] >= (time() + 60 * 60)) {
            $job = array(
                'name' => 'WeChatNotificationJob_LiveOneDay_'.$task['id'],
                'expression' => intval($task['startTime'] - 60 * 60),
                'class' => 'Biz\WeChatNotification\Job\LiveNotificationJob',
                'misfire_threshold' => 60 * 10,
                'args' => array(
                    'key' => 'oneDayBeforeLiveOpen',
                    'taskId' => $task['id'],
                    'url' => $this->generateUrl('course_task_show', array('courseId' => $task['courseId'], 'id' => $task['id']), true),
                ),
            );
            $this->getSchedulerService()->register($job);
        }
    }

    private function deleteLessonPublishJob($task)
    {
        $this->deleteByJobName('WeChatNotitficationJob_LessonPublish_'.$task['id']);
    }

    private function deleteLiveNotificationJob($task)
    {
        $this->deleteByJobName('WeChatNotificationJob_LiveOneHour_'.$task['id']);
        $this->deleteByJobName('WeChatNotificationJob_LiveOneDay_'.$task['id']);
    }

    private function deleteByJobName($jobName)
    {
        $jobs = $this->getSchedulerService()->searchJobs(array('name' => $jobName), array(), 0, PHP_INT_MAX);

        foreach ($jobs as $job) {
            $this->getSchedulerService()->deleteJob($job['id']);
        }
    }

    private function generateUrl($route, $parameters, $referenceType)
    {
        global $kernel;

        return $kernel->getContainer()->get('router')->generate($route, $parameters, $referenceType);
    }

    private function getCloudNotificationClient()
    {
        $biz = $this->getBiz();

        return $biz['qiQiuYunSdk.notification'];
    }

    /**
     * @return CourseService
     */
    protected function getCourseService()
    {
        return $this->getBiz()->service('Course:CourseService');
    }

    /**
     * @return QueueService
     */
    protected function getQueueService()
    {
        return $this->getBiz()->service('Queue:QueueService');
    }

    /**
     * @return SchedulerService
     */
    private function getSchedulerService()
    {
        return $this->getBiz()->service('Scheduler:SchedulerService');
    }

    protected function getTaskService()
    {
        return $this->getBiz()->service('Task:TaskService');
    }

    protected function getCourseSetService()
    {
        return $this->getBiz()->service('Course:CourseSetService');
    }

    protected function getCourseMemberService()
    {
        return $this->getBiz()->service('Course:MemberService');
    }

    protected function getUserService()
    {
        return $this->getBiz()->service('User:UserService');
    }

    protected function getWeChatService()
    {
        return $this->getBiz()->service('WeChat:WeChatService');
    }

    protected function getOrderService()
    {
        return $this->getBiz()->service('Order:OrderService');
    }

    protected function getLogService()
    {
        return $this->getBiz()->service('System:LogService');
    }

    protected function getNotificationService()
    {
        return $this->getBiz()->service('Notification:NotificationService');
    }
}