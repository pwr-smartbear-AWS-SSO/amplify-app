import json
import boto3


def handler(event, context):
    
    tech_user_id = event['pathParameters']['TechUserId']
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb')

    # Get the table
    table = dynamodb.Table('tech_user_list')

    # Scan the table to get all the items
    response = table.scan()
    # Extract the items from the response
    items_arrey = response['Items']
    
    tech_user_projects = []
    for item in items_arrey:
        if item['tech_user_id'] == tech_user_id:
            tech_user_projects.append(json.dumps({
              'name': item['project_name'], 
              'user_pool_id': item['user_pool_id'], 
              'domain_url': item['domain_url'], 
              'client1_id': item['client1_id'], 
              'client2_id': item['client2_id']}))
    
    return {
  'statusCode': 200,
  'headers': {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST'
  },
  'body': json.dumps(tech_user_projects)
}