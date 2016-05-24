<?php
namespace Topxia\Service\Course\Impl;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Topxia\Service\Common\BaseService;
use Topxia\Service\Course\MaterialService;
use Topxia\Common\ArrayToolkit;

class MaterialServiceImpl extends BaseService implements MaterialService
{

	public function uploadMaterial($material)
	{
		$argument = $material;
		if (!ArrayToolkit::requireds($material, array('courseId', 'fileId'))) {
			throw $this->createServiceException('参数缺失，上传失败！');
		}

        $fields = array(
            'courseId' => $material['courseId'],
            'lessonId' => empty($material['lessonId']) ? 0 : $material['lessonId'],
            'description'  => empty($material['description']) ? '' : $material['description'],
            'userId' => $this->getCurrentUser()->id,
            'source' => isset($material['source']) ? $material['source'] : 'coursematerial',
            'createdTime' => time(),
        );

        if (empty($material['fileId'])) {
            if (empty($material['link'])) {
                throw $this->createServiceException('资料链接地址不能为空，添加资料失败！');
            }
            $fields['fileId'] = 0;
            $fields['link'] = $material['link'];
            $fields['title'] = empty($material['description']) ? $material['link'] : $material['description'];
        } else {
            $fields['fileId'] = (int) $material['fileId'];
    		$file = $this->getUploadFileService()->getFile($material['fileId']);
    		if (empty($file)) {
    			throw $this->createServiceException('文件不存在，上传资料失败！');
    		}
            $fields['link'] = '';
            $fields['title'] = $file['filename'];
            $fields['fileSize'] = $file['fileSize'];
        }
        if(array_key_exists('copyId', $material)){
        	$fields['copyId'] = $material['copyId'];
        }

        if (!empty($fields['fileId'])) {
            /*$courseMaterials = $this->searchMaterials(
                array(
                    'courseId' => $fields['courseId'], 
                    'fileId'   => $fields['fileId'],
                    'lessonId' => 0,
                    'source'   => $fields['source']
                ), 
                array('createdTime','DESC'), 0, PHP_INT_MAX
            );
            if ($courseMaterials) {
                $material = $this->updateMaterial($courseMaterials[0]['id'], array('lessonId'=>$fields['lessonId']));
            } else {*/
	        	$material =  $this->getMaterialDao()->addMaterial($fields);
	        //}
        }

		// Increase the linked file usage count, if there's a linked file used by this material.
		if(!empty($material['fileId'])){
			$this->getUploadFileService()->waveUploadFile($material['fileId'],'usedCount',1);
		}

		if ($fields['lessonId'] && $fields['source'] == 'coursematerial') {
			$this->getCourseService()->increaseLessonMaterialCount($fields['lessonId']);
		}

		$this->dispatchEvent("material.create",array('argument'=>$argument,'material'=>$material));

		return $material;
	}

	public function updateMaterial($id, $fields)
	{
		return $this->getMaterialDao()->updateMaterial($id, $fields);
	}

	public function deleteMaterial($courseId, $materialId)
	{
		$material = $this->getMaterialDao()->getMaterial($materialId);
		if (empty($material) || $material['courseId'] != $courseId) {
			throw $this->createNotFoundException('课程资料不存在，删除失败。');
		}
		$this->getMaterialDao()->deleteMaterial($materialId);
		// Decrease the linked file usage count, if there's a linked file used by this material.
		if(!empty($material['fileId'])){
			$this->getUploadFileService()->waveUploadFile($material['fileId'],'usedCount',-1);
		}

		if($material['lessonId'] && $material['source'] == 'coursematerial'){
			$count = $this->searchMaterialCount(array(
					'courseId' => $material['courseId'],
					'lessonId' => $material['lessonId'],
					'source'   => 'coursematerial'
				)
			);
		   $this->getCourseService()->resetLessonMaterialCount($material['lessonId'], $count);
		}

		$this->dispatchEvent("material.delete",$material);
	}


	public function findMaterialsByCopyIdAndLockedCourseIds($copyId, $courseIds)
	{
		return $this->getMaterialDao()->findMaterialsByCopyIdAndLockedCourseIds($copyId, $courseIds);
	}

	public function deleteMaterialByMaterialId($materialId)
	{
		return $this->getMaterialDao()->deleteMaterial($materialId);
	}

	public function deleteMaterialsByLessonId($lessonId)
	{
		$materials = $this->getMaterialDao()->findMaterialsByLessonId($lessonId, 0, 1000);

		$fileIds = ArrayToolkit::column($materials, "fileId");

		// Decrease the linked matrial file usage count, if there are linked materials used by this lesson.
		if(!empty($fileIds)){
			foreach ($fileIds as $fileId) {
				$this->getUploadFileService()->waveUploadFile($fileId,'usedCount',-1);
			}
		}

		return $this->getMaterialDao()->deleteMaterialsByLessonId($lessonId);
	}

	public function deleteMaterialsByCourseId($courseId)
	{
		$materials = $this->getMaterialDao()->findMaterialsByCourseId($courseId, 0, 1000);

		$fileIds = ArrayToolkit::column($materials, "fileId");

		// Decrease the linked material file usage count, if there are linked materials used by this course.
		if(!empty($fileIds)){
			foreach ($fileIds as $fileId) {
				$this->getUploadFileService()->waveUploadFile($fileId,'usedCount',-1);
			}
		}

		return $this->getMaterialDao()->deleteMaterialsByCourseId($courseId);
	}

	public function deleteMaterialsByFileId($fileId)
	{
		return $this->getMaterialDao()->deleteMaterialsByFileId($fileId);
	}

	public function deleteMaterials($courseId, $fileIds)
	{
		$materials = $this->searchMaterials(
			array('courseId' => $courseId, 'fileIds' => $fileIds),
			array('createdTime','DESC'), 0, PHP_INT_MAX
		);

		if (!$materials) {
			return false;
		}

		foreach ($materials as $key => $material) {
			$this->deleteMaterial($courseId, $material['id']);
		}

		return true;
	}

	public function getMaterial($courseId, $materialId)
	{
		$material = $this->getMaterialDao()->getMaterial($materialId);
		if (empty($material) || $material['courseId'] != $courseId) {
			return null;
		}
		return $material;
	}

	public function findCourseMaterials($courseId, $start, $limit)
	{
		return $this->getMaterialDao()->findMaterialsByCourseId($courseId, $start, $limit);
	}

	public function getMaterialCountByFileId($fileId)
	{
		return $this->getMaterialDao()->getMaterialCountByFileId($fileId);
	}

    public function findLessonMaterials($lessonId, $start, $limit)
    {
        return $this->getMaterialDao()->findMaterialsByLessonId($lessonId, $start, $limit);
    }

	public function getMaterialCount($courseId)
	{
		return $this->getMaterialDao()->getMaterialCountByCourseId($courseId);
	}

	public function searchMaterials($conditions, $orderBy, $start, $limit)
	{
		return $this->getMaterialDao()->searchMaterials($conditions, $orderBy, $start, $limit);
	}

    public function searchMaterialCount($conditions)
    {
    	return $this->getMaterialDao()->searchMaterialCount($conditions);
    }

    public function findCourseMaterialsQuotes($courseId, $fileIds)
    {
    	$materials = $this->searchMaterials(
            array('courseId' => $courseId, 'fileIds' => $fileIds),
            array('createdTime','DESC'), 0, PHP_INT_MAX 
        );
        $materials = ArrayToolkit::group($materials, 'fileId');
        $files     = array();

        foreach ($materials as $fileId => $material) {
        	$files[$fileId] = ArrayToolkit::column($material, 'source');
        }

        return $files;
    }

    protected function getMaterialDao()
    {
    	return $this->createDao('Course.CourseMaterialDao');
    }

    protected function getCourseService()
    {
    	return $this->createService('Course.CourseService');
    }

    protected function getFileService()
    {
    	return $this->createService('Content.FileService');
    }

    protected function getUploadFileService()
    {
        return $this->createService('File.UploadFileService');
    }

}
