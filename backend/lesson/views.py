from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Lesson
from .serializers import LessonSerializiers
from topic.models import Topic

class LessonList(APIView) : 
    def post(self, req) : 
        try : 
            data = req.data
            topicId = data.get('topic')
            topic = Topic.objects.get(id=topicId)
        except Topic.DoesNotExist : 
            return Response({'error': 'topic id doesn`t exits'},status=status.HTTP_404_NOT_FOUND)
    
        topicData = {
            'title': data.get('title'),
            'topic': topic.id
        }
        serializers = LessonSerializiers(data=topicData)
        if serializers.is_valid() : 
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        
        return Response(serializers.errors,status=status.HTTP_424_FAILED_DEPENDENCY)

class LessonDetail(APIView) : 
    def put(self, req,id) : 
        try : data = Lesson.objects.get(id=id)
        except Lesson.DoesNotExist : 
            return Response({'error': 'Lesson id doesn`t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        serializers = LessonSerializiers(data, data=req.data, partial=True)
        if serializers.is_valid() : 
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        
        return Response(serializers.errors,status=status.HTTP_424_FAILED_DEPENDENCY)
    
    def delete(self, req,id) : 
        try : data = Lesson.objects.get(id=id)
        except Lesson.DoesNotExist : 
            return Response({'error': 'Lesson id doesn`t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        data.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)
    
class TopicLesson(APIView) : 
    def get(self, req, id) : 
        try : data = Lesson.objects.filter(topic=id)
        except Exception as err : 
            return Response({'error': str(err)},status=status.HTTP_424_FAILED_DEPENDENCY)
        
        serializers = LessonSerializiers(data,many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
