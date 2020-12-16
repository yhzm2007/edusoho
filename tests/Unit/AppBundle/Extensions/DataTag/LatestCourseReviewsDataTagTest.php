<?php

namespace Tests\Unit\AppBundle\Extensions\DataTag;

use AppBundle\Extensions\DataTag\LatestCourseReviewsDataTag;
use Biz\BaseTestCase;
use Biz\Goods\Service\GoodsService;
use Biz\Product\Service\ProductService;

class LatestCourseReviewsDataTagTest extends BaseTestCase
{
    /**
     * @expectedException \InvalidArgumentException
     */
    public function testCountMissing()
    {
        $datatag = new LatestCourseReviewsDataTag();
        $datatag->getData([]);
    }

    /**
     * @expectedException \InvalidArgumentException
     */
    public function testCountError()
    {
        $datatag = new LatestCourseReviewsDataTag();
        $datatag->getData(['count' => 101]);
    }

    public function testGetData()
    {
        $courseSet = $this->getCourseSetService()->createCourseSet(['type' => 'normal', 'title' => 'course set1 title']);

        $course1 = $this->getCourseService()->createCourse(['title' => 'course title', 'courseSetId' => $courseSet['id'], 'expiryMode' => 'forever', 'learnMode' => 'freeMode', 'courseType' => 'default']);
        $this->getCourseService()->publishCourse($course1['id']);

        $product = $this->getProductService()->createProduct([
            'targetType' => 'course',
            'targetId' => $course1['id'],
            'title' => 'course title',
        ]);

        $goods = $this->getGoodsService()->createGoods([
            'productId' => $product['id'],
            'title' => 'testTitle',
            'type' => 'course',
            'images' => ['testImages'],
        ]);

        $user1 = $this->getuserService()->register([
            'email' => '1234@qq.com',
            'nickname' => 'user1',
            'password' => '123456',
            'confirmPassword' => '123456',
            'createdIp' => '127.0.0.1',
        ]);

        $user2 = $this->getuserService()->register([
            'email' => '12345@qq.com',
            'nickname' => 'user2',
            'password' => '123456',
            'confirmPassword' => '123456',
            'createdIp' => '127.0.0.1',
        ]);

        $this->getCourseMemberService()->becomeStudent($course1['id'], $user1['id']);
        $this->getCourseMemberService()->becomeStudent($course1['id'], $user2['id']);

        $review1 = $this->getReviewService()->createReview([
            'targetType' => 'goods',
            'targetId' => $goods['id'],
            'userId' => $user1['id'],
            'title' => 'review1',
            'content' => 'content1',
            'rating' => 4,
        ]);
        $review2 = $this->getReviewService()->createReview([
            'targetType' => 'goods',
            'targetId' => $goods['id'],
            'userId' => $user2['id'],
            'title' => 'review2',
            'content' => 'content2',
            'rating' => 4,
        ]);

        $datatag = new LatestCourseReviewsDataTag();
        $reviews = $datatag->getData(['courseId' => $goods['id'], 'count' => 5]);
        $this->assertEquals(2, count($reviews));
    }

    public function getReviewService()
    {
        return $this->createService('Review:ReviewService');
    }

    public function getCourseService()
    {
        return $this->createService('Course:CourseService');
    }

    public function getCourseSetService()
    {
        return $this->createService('Course:CourseSetService');
    }

    public function getUserService()
    {
        return $this->createService('User:UserService');
    }

    protected function getCourseMemberService()
    {
        return $this->createService('Course:MemberService');
    }

    /**
     * @return GoodsService
     */
    protected function getGoodsService()
    {
        return $this->createService('Goods:GoodsService');
    }

    /**
     * @return ProductService
     */
    protected function getProductService()
    {
        return $this->createService('Product:ProductService');
    }
}
