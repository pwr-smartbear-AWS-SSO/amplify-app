import boto3
import json
# from datetime import datetime

def lambda_handler(event, context):
   # Set the Cognito User Pool settings
    user_pool_name = event['key1']
    policies = {
        "PasswordPolicy": {
            "MinimumLength": 6,
            "RequireLowercase": False,
            "RequireNumbers": False,
            "RequireSymbols": False,
            "RequireUppercase": False
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

   # Convert datetime objects to strings
    response = json.loads(json.dumps(response, default=str))

    # Print information about the new Cognito User Pool
    print("Created user pool with ID:", response["UserPool"]["Id"])
    print("User pool name:", response["UserPool"]["Name"])

    return response
