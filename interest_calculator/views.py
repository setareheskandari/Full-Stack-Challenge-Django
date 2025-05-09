from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProjectionInputSerializer
from .services.projections import calculate_projections

@api_view(['POST'])
def interest_data(request):
    # Validate the input data (incoming JSON) using the serializer
    serializer = ProjectionInputSerializer(data=request.data)
    if not serializer.is_valid():
        # If validation fails, return field-specific errors (HTTP 400)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate the projections (intrest data) using the validated typed values
    # This returns two parallel lists: one for years and one for balances
    x_axis, y_axis = calculate_projections(
        initial = serializer.validated_data['initial'],
        deposit_amount = serializer.validated_data['deposit_amount'],
        interest_rate = serializer.validated_data['interest_rate']
    )
    
    # Return the results in a JSON format
    return Response({'xAxis': x_axis, 'yAxis': y_axis})