import boto3
import json

# key 1 = name of Cognito Pool
# key 2 = admin adres for new Pools 

def lambda_handler(event, context):
    lambda_client = boto3.client('lambda')
    poolID = runLambda('arn:aws:lambda:eu-central-1:762785132751:function:AddCognitoUserPoolGit',"RequestResponse", event['key1'])
    # runLambda(AddUserToUserPool,"RequestResponse", user_pool_ID, event['kay2']) #key2 is admni mail
    return poolID


def runLambda(lambda_name, invo_type, key1=" ", key2=" ", key3=" "):
    client = boto3.client('lambda')

    payload = {
        "key1": key1,
        "key2": key2,
        "key3": key3
    }
    
    response = client.invoke(
        FunctionName=lambda_name,
        InvocationType=invo_type,
        Payload=json.dumps(payload)
    )

    # Obsługa odpowiedzi z innej funkcji Lambda
    response_payload = json.loads(response['Payload'].read().decode())
    return response_payload
