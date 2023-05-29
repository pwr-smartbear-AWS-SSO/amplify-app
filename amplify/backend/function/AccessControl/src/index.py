import boto3
from botocore.exceptions import ClientError


def handler(event, context):

    token = event['authorizationToken']
    if validate_token(token):
        return generate_policy('user', 'Allow', event['methodArn'])
    else:
        return generate_policy('user', 'Deny', event['methodArn'])


def validate_token(token):
    try:
        client = boto3.client('cognito-idp', region_name='eu-central-1')

        response = client.get_user(AccessToken=token)

        if response['UserPoolId'] == 'eu-central-1_QOoTXKgsC':
            return True
        else:
            return False
    except ClientError as e:
        print(e)
        return False


def generate_policy(principal_id, effect, resource):
    policy = {
        'principalId': principal_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource
                }
            ]
        }
    }

    return policy

