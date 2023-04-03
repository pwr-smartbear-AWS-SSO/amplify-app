import boto3
import json

def lambda_handler(event, context):

    idPool = AddCognitoUserPoolGit()
    add(idPool)

    return response

user_pool_ID = runLambda(addUserPool,"", event['key1']) #key1 is userpoll name
runLambda(adUserToPool,"", user_pool_ID, event['kay2']) #key2 is admni mail

def RunLambda(lambda_name, invo_type, key1="", key2="", key3=""):
    client = boto3.client('lambda')

    payload = {
        "key1": key1
        "key2": key2
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
