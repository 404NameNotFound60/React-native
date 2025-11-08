from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Topic
from .serializers import TopicSerializiers
from course.models import Course

class TopicList(APIView) : 
    def post(self, req) : 
        try : 
            data = req.data
            courseId = data.get('course')
            course = Course.objects.get(id=courseId)
        except Course.DoesNotExist : 
            return Response({'error': 'course id doesn`t exits'},status=status.HTTP_404_NOT_FOUND)
    
        topicData = {
            'title': data.get('title'),
            'course': course.id
        }
        serializers = TopicSerializiers(data=topicData)
        if serializers.is_valid() : 
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        
        return Response(serializers.errors,status=status.HTTP_424_FAILED_DEPENDENCY)

class TopicDetail(APIView) : 
    def put(self, req,id) : 
        try : data = Topic.objects.get(id=id)
        except Topic.DoesNotExist : 
            return Response({'error': 'Topic id doesn`t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        serializers = TopicSerializiers(data, data=req.data, partial=True)
        if serializers.is_valid() : 
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        
        return Response(serializers.errors,status=status.HTTP_424_FAILED_DEPENDENCY)
    
    def delete(self, req,id) : 
        try : data = Topic.objects.get(id=id)
        except Topic.DoesNotExist : 
            return Response({'error': 'Topic id doesn`t exists'}, status=status.HTTP_404_NOT_FOUND)
        
        data.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)
    
class TopicCourse(APIView) : 
    def get(self, req, id) : 
        try : data = Topic.objects.filter(course=id)
        except Exception as err : 
            return Response({'error': str(err)},status=status.HTTP_424_FAILED_DEPENDENCY)
        
        serializers = TopicSerializiers(data,many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
