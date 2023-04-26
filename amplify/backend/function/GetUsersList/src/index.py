import json
import boto3

def handler(event, context):
    user_pool_id = event['pathParameters']['UserPoolId']
    cognito_client = boto3.client('cognito-idp')
    users = cognito_client.list_users(UserPoolId=user_pool_id)['Users']
    user_list = []
    for user in users:
        user_obj = json.dumps({
            'userId': user['Username'],
            'email': next((attr['Value'] for attr in user['Attributes'] if attr['Name'] == 'email'), ''),
        })
        user_list.append(user_obj)
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.dumps(user_list)
    }
