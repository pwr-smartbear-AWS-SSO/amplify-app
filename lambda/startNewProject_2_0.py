########################################################################################################
#EN:
#This lambda will:
# 1) Create new Cognito User Pool with 2 clients:
#       1a) Create User Pool
#       1b) Create SSO integration
#       1c) Create SSO integration example
# 2) Create new IAM role for that Cognito Pool to integrate (SAML) SSO
# 3) Create user in (!!!)Amplify User Pool(!!!) with created role for New Cognito Pool
# 4) Save: user_id, coognito_pool_id, clients_id to DynamoDB
#
#PL:
#Lambda ma za zadanie:
# 1) Utworzyć nowy Cognito User Pool z dwoma klientami
#       1a) Utworzyć nowy Pool
#       1b) Dodać integrację SSO
#       1c) Dodać przykład integracji SSO
#2) Utorzyć nową IAM-rolę dla nowopowstałego User Poola do integracji SSO
#3) Stworzenie usera W NASZYM AMPLIFY'OWYM POOLU z uprawnieniami do integracji SSO nowoutworzonego Poola
#4) Zapisanie id nowego usera, id nowego Poola i id dwuch klientów w Poolu do bazy danych Dynamo
########################################################################################################



# run lambda/function CreateUserPool(user_pool_name) that returns [user_pool_id, client1_id, client2_id]
# lambda/function CreateRole(user_pool_id) that returns iam_role_id/arn
# lamda/function CreteUser(tech_user_mail, iam_role_arn) that returns tech_user_id
# [user_pool_id, cient1_id, client2_id, tech_user_id] >> DynamoDB


import boto3
import json


def CreateUserPool(user_pool_name):
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
    cognito_idp = boto3.client("cognito-idp")
    response = cognito_idp.create_user_pool(
        PoolName=user_pool_name,
        Policies=policies,
        UsernameAttributes=username_attributes
    )

   # Convert datetime objects to strings
    response = json.loads(json.dumps(response, default=str))
    user_pool_id = response["UserPool"]["Id"]
    
    client1_id = CreateClient(user_pool_id, 'Client1')
    client2_id = CreateClient(user_pool_id, 'Client2')

    return {
        "user pool id": user_pool_id, 
        "client1 id": client1_id, 
        "client2 id": client2_id
        }
  
def CreateClient(user_pool_id, client_name):
    pass

def CreateRole(user_pool_id):
    pass

def CreateUser(amplify_pool_id, user_mail, iam_role_arn):
    pass

def lambda_handler(event, context):
    #event['key1'] is new UserPool name
    new_user_pool_name = event['key1']
    #event['key2'] is TechUser email
    tech_user_mail = event['key2']

    amplify_pool_id = 'XYZ' #copy-paste your amplify userpool id from AWS
    new_user_pool_return = CreateUserPool(new_user_pool_name)
    new_user_pool_id = new_user_pool_return["user pool id"]
    iam_role_arn = CreateRole(new_user_pool_id)
    tech_user_id = CreateUser(amplify_pool_id, tech_user_mail, iam_role_arn)

    return {
        "user pool id": new_user_pool_id, 
        "client1 id": new_user_pool_return["client1 id"], 
        "client2 id": new_user_pool_return["client2 id"], 
        "techuser id": tech_user_id
        }
