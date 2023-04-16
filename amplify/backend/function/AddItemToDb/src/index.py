import json
import boto3


def lambda_handler(event, context):
    
    client = boto3.client('dynamodb')
    
    response = client.put_item(
    TableName='tech_user_list',
    Item = {
        "tech_user_id": {
            "S": str(event['pathParameters']['value1'])
        },
        "user_pool_id": {
            "S": str(event['pathParameters']['value2'])
        },
        "project_name": {
            "S": str(event['pathParameters']['value3'])
        }
    })
    
    #response = json.loads(json.dumps(response, default=str))
    #return response
    return {'statusCode': 200}