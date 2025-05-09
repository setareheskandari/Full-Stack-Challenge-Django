from rest_framework import serializers

class ProjectionInputSerializer(serializers.Serializer):
    initial        = serializers.FloatField(min_value=0)
    deposit_amount = serializers.FloatField(min_value=0)
    interest_rate  = serializers.FloatField(min_value=0)