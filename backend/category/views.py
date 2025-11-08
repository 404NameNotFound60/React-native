from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .models import Category
from .serializers import CategorySerializiers

class CategoryList(APIView) : 
    def post(self, req) : 
        try : 
            data = req.data
            newCategory = Category(user=req.user,**data)
            newCategory.save()
            serialize = CategorySerializiers(newCategory)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as err : 
            return Response({'error': str(err)}, status=status.HTTP_424_FAILED_DEPENDENCY)
        
class CategoryDetail(APIView) : 
    def get(self, req, id) : 
        try : data = Category.objects.filter(user=id)
        except Category.DoesNotExist : 
            return Response({'error': 'User id doesn`t exist'},status=status.HTTP_404_NOT_FOUND)
        
        serailizers = CategorySerializiers(data,many=True)
        return Response(serailizers.data,status=status.HTTP_200_OK)
    
    def delete(self, req, id) : 
        try : data = Category.objects.get(id=id)
        except Category.DoesNotExist : 
            return Response({'error': 'Category id doesn`t exist'},status=status.HTTP_404_NOT_FOUND)
        
        data.delete()
        return Response({'success': True},status=status.HTTP_200_OK)