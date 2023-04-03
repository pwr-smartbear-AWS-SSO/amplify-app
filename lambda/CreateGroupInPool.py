import boto3

client = boto3.client('cognito-idp')

def lambda_handler(event, context):
    user_pool_id = event['user_pool_id']
    response = client.create_group(
        GroupName='TechUser',
        UserPoolId=user_pool_id,
        Description='TechUser',
        RoleArn='arn:aws:iam::762785132751:policy/testTech',
        Precedence=1
    )
    return response
