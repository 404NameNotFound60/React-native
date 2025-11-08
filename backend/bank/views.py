from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import BankSerializiers
from .models import Bank

class BankAcount(APIView) : 
    def post(self, req) : 
        try : 
            data = req.data
            newBank = Bank(user=req.user,**data)
            newBank.save()
            serialize = BankSerializiers(newBank)
            return Response(serialize.data, status=status.HTTP_200_OK)
        except Exception as err : 
            return Response({'error': str(err)}, status=status.HTTP_424_FAILED_DEPENDENCY)
        
class BankAcountByUser(APIView) : 
    def get(self,req,userId) : 
        try : data = Bank.objects.get(user=userId)
        except Bank.DoesNotExist : 
            return Response({'error': 'user id doesn`t exist'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = BankSerializiers(data)
        return Response(serializer.data,status=status.HTTP_200_OK)