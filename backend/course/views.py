from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import Course
from .serializers import CourseSerializiers

class CourseList(APIView) : 
    def post(self, req) : 
        try : 
            data = req.data
            newCourse = Course(user=req.user,**data)
            newCourse.save()
            serialize = CourseSerializiers(newCourse)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as err : 
            return Response({'error': str(err)}, status=status.HTTP_424_FAILED_DEPENDENCY)
        
class CourseDetail(APIView) : 
    def get(self, req, userId) : 
        try : data = Course.objects.filter(user=userId)
        except Exception as err : 
            return Response({'error': str(err)}, status=status.HTTP_424_FAILED_DEPENDENCY)
        serailizers = CourseSerializiers(data,many=True)
        return Response(serailizers.data,status=status.HTTP_200_OK)
    
class CourseExtra(APIView) : 
    def put(self, req, courseId) : 
        try : data = Course.objects.get(id=courseId)
        except Course.DoesNotExist : 
            return Response({'error': 'Course id doesn`t exist'}, status=status.HTTP_404_NOT_FOUND)
        
        serialize = CourseSerializiers(data, data=req.data, partial=True)
        if serialize.is_valid() : 
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Update failed !'}, status=status.HTTP_424_FAILED_DEPENDENCY)
