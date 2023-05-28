import boto3


def handler(event, context):
    authorization_token = event['authorizationToken']
    cognito_client = boto3.client('cognito-idp', region_name='eu-central-1')

    try:
        response = cognito_client.get_user(
            AccessToken=authorization_token
        )
        user_id = response['Username']

        if user_id in ['eu-central-1_QOoTXKgsC']:
            auth_status = 'Allow'
        else:
            auth_status = 'Deny'
    except Exception as e:
        print(e)
        auth_status = 'Deny'

    auth_response = {
        'principalId': user_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Resource': [event['methodArn']],
                    'Effect': auth_status
                }
            ]
        }
    }

    return auth_response
