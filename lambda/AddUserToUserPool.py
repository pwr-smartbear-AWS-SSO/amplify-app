import boto3
import json

def lambda_handler(event, context):
    # Set the Cognito User Pool settings
    user_pool_ID = event['key1'] #getting user pool id
    user_name = event['key2']

    cognito = boto3.client("cognito-idp")
    response = cognito.admin_create_user(
        UserPoolId=user_pool_ID,
        Username=user_name,
        UserAttributes=[
            {
                "Name": "email",
                "Value": user_name
            },
            {
                "Name": "phone_number_verified",
                "Value": "false"
            }
        ],
        DesiredDeliveryMediums=[
            'EMAIL',
        ]
    )



   # Convert datetime objects to strings
    response = json.loads(json.dumps(response, default=str))

    return response
