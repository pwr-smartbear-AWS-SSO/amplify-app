import json
import boto3

def handler(event, context):
 
    project_name = event['pathParameters']['ProjectName']
    tech_user_email = event['pathParameters']['TechUserEmail']

    amplify_pool_id = "eu-central-1_QOoTXKgsC"
    
    cognito_idp = boto3.client("cognito-idp")

    if CheckUserPoolExistence(cognito_idp, project_name, 60):
        #raise Exception('UserPool Already Exists')
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('UserPool with given name already exists')
        }
    else:
        new_user_pool_data = CreateUserPool(cognito_idp, project_name)
        new_user_name = ""
        
        users_list = cognito_idp.list_users(
            UserPoolId=amplify_pool_id
        )

        for user in users_list['Users']:
            for attr in user['Attributes']:
                if attr['Name'] == 'email' and attr['Value'] == tech_user_email:
                    print(f"User with email {tech_user_email} exists")
                    new_user_name = user['Username']
                    break
            else:
                continue
            break
        else:
            print(f"No user with email {tech_user_email} found")
            new_user_name = CreateUser(cognito_idp, amplify_pool_id, tech_user_email)

        AddUserToGroup(cognito_idp, amplify_pool_id, new_user_name, 'techuser')
        domain_prefix = CreateDomain(cognito_idp, new_user_pool_data['id'], project_name)
        client1_id = CreateClient(cognito_idp, new_user_pool_data['id'], ((project_name.lower())+"-client1"), 'https://jwt.io/', 1)
        client2_id = CreateClient(cognito_idp, new_user_pool_data['id'], ((project_name.lower())+"-client2"), 'https://jwt.io/', 0)
        AddItemToDB("projects_list", new_user_name, new_user_pool_data['id'], tech_user_email, project_name, domain_prefix, client1_id, client2_id)
    
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('New Project created successfully')
        }
    

def CheckUserPoolExistence(cognito_idp, user_pool_name, max_res):
    response = cognito_idp.list_user_pools(
        MaxResults=max_res
    )
    for user_pool in response['UserPools']:
        if user_pool['Name'] == user_pool_name:
            print(f"User pool '{user_pool_name}' found with ID: {user_pool['Id']}")
            return True
            break
    else:
        print(f"User pool '{user_pool_name}' not found")
        return False

def CreateUserPool(cognito_idp, user_pool_name):
    policies = {
        "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireLowercase": True,
            "RequireNumbers": True,
            "RequireSymbols": True,
            "RequireUppercase": True
        }
    }
    response = cognito_idp.create_user_pool(
        PoolName=user_pool_name,
        Policies=policies,
        AdminCreateUserConfig={ 'AllowAdminCreateUserOnly': False },
        AutoVerifiedAttributes=['email'],
        UsernameAttributes=['email'],
        #UsernameAttributes=["email"],
        MfaConfiguration='OFF'
    )
    print("CreateUserPool response:")
    print(response)
    return {"id": response["UserPool"]["Id"], "arn": response["UserPool"]["Arn"]}



def CreateUser(cognito_idp, user_pool_id, user_mail):
    response = cognito_idp.admin_create_user(
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
    print("CreateUser response:")
    print(response)
    return response["User"]["Username"] #returns the user ID!

def AddUserToGroup(cognito_idp, user_pool_id, user_name, group_name):
    response = cognito_idp.admin_add_user_to_group(
        UserPoolId=user_pool_id,
        Username=user_name,
        GroupName=group_name
    )

def AddItemToDB(table_name, tech_user_id, user_pool_id, tech_user_email, project_name, domain_prefix, client1_id, client2_id):
    client = boto3.client('dynamodb')
    
    response = client.put_item(
    TableName=table_name,
    Item = {
        "user_pool_id": {
            "S": str(user_pool_id)
        },
        "project_name": {
            "S": str(project_name)
        },
        "tech_user_id": {
            "S": str(tech_user_id)
        },
        "tech_user_email": {
            "S": str(tech_user_email)
        },
        "domain_prefix": {
            "S": str(domain_prefix)
        },
        "domain_url": {
            "S": str("https://"+domain_prefix+".auth.eu-central-1.amazoncognito.com")
        },
        "client1_id": {
            "S": str(client1_id)
        },
        "client2_id": {
            "S": str(client2_id)
        }
    })
    print("CAddItemToDB response:")
    print(response)

def CreateDomain(cognito_idp, user_pool_id, project_name):
    domain_prefix = ((project_name.lower())+"-projectmanager-cxnajder-was-here")
    response = cognito_idp.create_user_pool_domain(
        Domain=domain_prefix,
        UserPoolId=user_pool_id
    )
    print("CreateDomain response:")
    print(response)
    return domain_prefix


def CreateClient(cognito_idp, user_pool_id, client_name, callback_url, oauth_flow_code):
    if oauth_flow_code:
        allow_oauth_flow = 'code'
    else:
        allow_oauth_flow = 'implicit'
    response = cognito_idp.create_user_pool_client(
        UserPoolId=user_pool_id,
        ClientName=client_name,
        GenerateSecret=True,
        CallbackURLs=[
            callback_url,
        ],
        AllowedOAuthFlows=[
            allow_oauth_flow,
        ],
        AllowedOAuthScopes=[
            'openid',
            'email',
            'profile',
        ],
        AllowedOAuthFlowsUserPoolClient=True
    )
    print("CreateClient",client_name , "response:")
    print(response)
    return response['UserPoolClient']['ClientId']
