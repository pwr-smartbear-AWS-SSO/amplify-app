import boto3
import json

# key 1 = name of Cognito UserPool
# key 2 = admin's email adres for new UserPool

def lambda_handler(event, context):
    lambda_client = boto3.client('lambda')
    #ENTER YOUR LAMBDA ARM FOR 'AddCognitoUserPool'
    user_pool_ID = runLambda('arn:aws:lambda:eu-central-1:762785132751:function:AddCognitoUserPoolGit',"RequestResponse", event['key1'])
    #ENTER YOUR ARN FOR 'AddUserToUserPool'
    runLambda('ARN',"RequestResponse", user_pool_ID, event['key2']) #key2 is admni mail
    #ENTER YOUR ARN FOR 'CreateGroupInPool'
    runLambda('ARN', "RequestResponse", user_pool_ID, 'TechUser', 'technical user with higher permitions', 1) #key1: groupName; key2: description; key3: precedence;
    #ENTER YOUR ARN FOR 'AddUserToGroup'
    runLambda('ARN', "RequestResponse", user_pool_ID, event['key2'], 'TechUser')
    
    #return user_pool_ID #its for testing if function works properly


def runLambda(lambda_name, invo_type, key1=" ", key2=" ", key3=" ", key4=" "):
    client = boto3.client('lambda')

    payload = {
        "key1": key1,
        "key2": key2,
        "key3": key3,
        "key4": key4
    }
    
    response = client.invoke(
        FunctionName=lambda_name,
        InvocationType=invo_type,
        Payload=json.dumps(payload)
    )

    # Obsługa odpowiedzi z innej funkcji Lambda
    response_payload = json.loads(response['Payload'].read().decode())
    return response_payload
