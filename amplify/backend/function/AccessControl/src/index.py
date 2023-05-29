import boto3

def lambda_handler(event, context):

    token = event['authorizationToken']

    client = boto3.client('cognito-idp')

    try:

        response = client.get_user(AccessToken=token)
        user_pool_id = response['UserAttributes'][0]['Value']

        if user_pool_id == 'eu-central-1_QOoTXKgsC':
            auth_status = 'Allow'
        else:
            auth_status = 'Deny'
    except:
        auth_status = 'Deny'

    authResponse = {
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Resource': [
                        event['methodArn']
                    ],
                    'Effect': auth_status
                }
            ]
        }
    }

    return authResponse
