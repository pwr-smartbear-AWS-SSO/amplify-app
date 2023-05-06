import json
import boto3

def handler(event, context):
 
    project_name = event['pathParameters']['ProjectName']
    tech_user_email = event['pathParameters']['TechUserEmail']

    amplify_pool_id = "eu-central-1_QOoTXKgsC"
    
    new_user_pool_data = CreateUserPool(project_name)
    new_user_name = CreateUser(amplify_pool_id, tech_user_email)
    AddUserToGroup(amplify_pool_id, new_user_name, 'TechUser')
    AddItemToDB("tech_user_list", new_user_name, new_user_pool_data['id'], tech_user_email, project_name)

    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Success!')
    }

def CreateUserPool(user_pool_name):
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
    
    cognito_idp = boto3.client("cognito-idp")
    response = cognito_idp.create_user_pool(
        PoolName=user_pool_name,
        Policies=policies,
        UsernameAttributes=username_attributes
    )
    return {"id": response["UserPool"]["Id"], "arn": response["UserPool"]["Arn"]}



def CreateUser(user_pool_id, user_mail):
    cognito = boto3.client("cognito-idp")
    response = cognito.admin_create_user(
        UserPoolId=user_pool_id,
        Username=user_mail,
        UserAttributes=[
            {
                "Name": "email",
                "Value": user_mail #the user name is the email
            },
            {
                "Name": "phone_number_verified",
                "Value": "false" #no phone number verification
            }
        ],
        DesiredDeliveryMediums=[
            'EMAIL',
        ]
    )
    return response["User"]["Username"] #returns the user ID!

def AddUserToGroup(user_pool_id, user_name, group_name):
    cognito = boto3.client("cognito-idp")
    response = cognito.admin_add_user_to_group(
        UserPoolId=user_pool_id,
        Username=user_name,
        GroupName=group_name
    )

def AddItemToDB(table_name, tech_user_id, user_pool_id, tech_user_email, project_name):
    client = boto3.client('dynamodb')
    
    response = client.put_item(
    TableName=table_name,
    Item = {
        "tech_user_id": {
            "S": str(tech_user_id)
        },
        "user_pool_id": {
            "S": str(user_pool_id)
        },
        "tech_user_email": {
            "S": str(tech_user_email)
        },"project_name": {
            "S": str(project_name)
        }
    })
