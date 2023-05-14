import json
import boto3

def handler(event, context):

    user_pool_id = event['pathParameters']['UserPoolId']

    request_body = json.loads(event['body'])
    domain_prefix = request_body['domainPrefix']

    cognito_idp = boto3.client('cognito-idp')
    dynamo_db = boto3.client('dynamodb')

    repsonse_del_item = dynamo_db.delete_item(
        TableName='projects_list',
        Key={'user_pool_id': {'S': user_pool_id}}
    )

    response_del_domain = cognito_idp.delete_user_pool_domain(
        Domain=domain_prefix,
        UserPoolId=user_pool_id
    )

    response_del_user_pool = cognito_idp.delete_user_pool(
        UserPoolId=user_pool_id
    )

    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE'
      },
      'body': json.dumps('Project deleted succesfully!')
    }
