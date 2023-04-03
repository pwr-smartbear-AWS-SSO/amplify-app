import boto3

cognito = boto3.client('cognito-idp')

def lambda_handler(event, context):
    user_pool_id = event['key1'] #cognito pool ID
    group_name = event['key2'] #f.e. 'TechUser'
    description = event['key3'] #f.e. 'technical users'
    precedence = event['key4'] #f.e. 1
    
    response = cognito.create_group(
        GroupName=group_name,
        UserPoolId=user_pool_id,
        Description=description,
        #RoleArn='arn:aws:iam::762785132751:policy/testTech', #might be implemented by the enet key in the future
        Precedence=precedence
    )
    return group_name
