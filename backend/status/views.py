from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Status
from .serializers import StatusSerializiers

class StatusList(APIView) : 
    def get(self, req) : 
        data = Status.objects.all()
        serialize = StatusSerializiers(data, many=True)
        return Response(serialize.data, status=status.HTTP_200_OK)

    def post(self, req) : 
        try : 
            data = req.data
            newStatus = Status(user=req.user,**data)
            newStatus.save()
            serialize = StatusSerializiers(newStatus)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as err : 
            return Response({'error': str(err)}, status=status.HTTP_424_FAILED_DEPENDENCY)

class StatusDetail(APIView) : 
    def put(self, req, id) : 
        try : data = Status.objects.get(id=id)
        except Status.DoesNotExist : 
            return Response({'error': f'{id} id doesn`t not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        serialize = StatusSerializiers(data, data=req.data, partial=True)
        if serialize.is_valid() : 
            serialize.save()
            return Response(serialize.data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Update failed !'}, status=status.HTTP_424_FAILED_DEPENDENCY)

    def delete(self, req, id) : 
        try : data = Status.objects.get(id=id)
        except Status.DoesNotExist : 
            return Response({'error': f'{id} id doesn`t not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        data.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)
