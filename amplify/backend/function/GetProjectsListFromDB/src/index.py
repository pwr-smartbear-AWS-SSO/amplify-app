import json
import boto3

def handler(event, context):
    # Create a DynamoDB resource
    dynamodb = boto3.resource('dynamodb')

    # Get the table
    table = dynamodb.Table('tech_user_list')

    # Scan the table to get all the items
    response = table.scan()
    # Extract the items from the response
    items_arrey = response['Items']
    
    #changing arrey to dict
    items_dict = {f"project{i+1}": json.dumps(v) for i, v in enumerate(items_arrey)}

    #print(items_dict) #testing
        
    
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.dumps(items_dict)
    }
