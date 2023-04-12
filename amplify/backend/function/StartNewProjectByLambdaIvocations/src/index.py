import boto3
import json


def lambda_handler(event, context):
    lambda_client = boto3.client('lambda')


    user_pool_name = event["queryStringParameters"]["project_name"]
    user_mail = event["queryStringParameters"]["tech_user_email"]

    #enter your ID's and ARN's
    amplify_user_pool_id = "xxxxxx"
    arn_dict = {
    "create_user_pool_arn": "xxxxxx",
    #"create_client_arn": "xxxxxx",
    "create_user_arn": "xxxxxx",
    #"create_role_arn": "xxxxxx",
    "create_group_arn": "xxxxxx",
    "add_user_to_group_arn": "xxxxxx",
    "add_item_to_db": "xxxxxx"
    }

    invocation_type = "RequestResponse"

    new_user_pool = RunLambda(arn_dict["create_user_pool_arn"], invocation_type, user_pool_name)
    #client1_id = RunLambda(arn_dict["create_client_arn"], invocation_type, new_user_pool["id"], "client1")
    #client2_id = RunLambda(arn_dict["create_client_arn"], invocation_type, new_user_pool["id"], "client2")
    user_id = RunLambda(arn_dict["create_user_arn"], invocation_type, amplify_user_pool_id, user_mail)
    #role_arn = RunLambda(arn_dict["create_role_arn"], invocation_type, new_user_pool["arn"], new_user_pool["id"])
    group_name = RunLambda(arn_dict["create_group_arn"], invocation_type, amplify_user_pool_id, new_user_pool["id"])
    RunLambda(arn_dict["add_user_to_group_arn"], invocation_type, amplify_user_pool_id, user_id, group_name)
    RunLambda(arn_dict["add_item_to_db"], invocation_type, user_id, new_user_pool)

    #save resoults to DynamoDB

def RunLambda(lambda_name, invo_type, key1=" ", key2=" ", key3=" "):
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