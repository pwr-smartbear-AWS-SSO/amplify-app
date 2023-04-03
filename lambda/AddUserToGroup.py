import boto3
import json

def lambda_handler(event, context):
    user_pool_ID = event['key1'] #getting user pool id
    user_name = event['key2'] #the user name is the email
    group_name = event['key3'] #f.e. 'TechUser'

    cognito = boto3.client("cognito-idp")
    response = cognito.admin_add_user_to_group(
        UserPoolId=user_pool_ID,
        Username=user_name,
        GroupName=group_name
)


   # Convert datetime objects to strings
    response = json.loads(json.dumps(response, default=str))

    return response
