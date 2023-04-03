import boto3
import json

def lambda_handler(event, context):
    
    idPool = AddCognitoUserPoolGit()
    
    return response
    

def AddCognitoUserPoolGit(event, context):
    # Utwórz klienta dla pracy z AWS Lambda
    client = boto3.client('lambda')
    
    # Ustawienia wywołania funkcji Lambda
    # FunctionName - nazwa funkcji, którą chcesz wywołać
    # InvocationType - typ wywołania. Wartość "RequestResponse" oznacza wywołanie synchroniczne
    # Payload - dane, które chcesz przesłać do innej funkcji
    payload = {
        "key": "value"
    }
    response = client.invoke(
        FunctionName="nazwa_innej_funkcji_lambda",
        InvocationType='RequestResponse',
        Payload=json.dumps(payload)
    )
    
    # Obsługa odpowiedzi z innej funkcji Lambda
    response_payload = json.loads(response['Payload'].read().decode())
    return response_payload
