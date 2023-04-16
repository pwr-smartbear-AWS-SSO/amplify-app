import boto3
import json

def lambda_handler(event, context):
   # Set the Cognito User Pool settings
    user_pool_name = event['pathParameters']['value1']
    policies = {
        "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireLowercase": True,
            "RequireNumbers": True,
            "RequireSymbols": True,
            "RequireUppercase": True
        }
    }
    username_attributes = ["email"]
    
    # Create a Cognito User Pool
    cognito = boto3.client("cognito-idp")
    response = cognito.create_user_pool(
        PoolName=user_pool_name,
        Policies=policies,
        UsernameAttributes=username_attributes
    )

    return {response["UserPool"]["Id"]}