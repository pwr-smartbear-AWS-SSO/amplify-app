import json
import boto3

def handler(event, context):
    print('received event:')
    print(event)
  
    user_pool_id =  event['pathParameters']['UserPoolId']
    provider_name =  event['pathParameters']['ProviderName']
    
    request_body = json.loads(event['body'])

    attr_map_json = request_body['attributesMap']
    
    metadata_json = {}
    metadata_method = request_body['metadataMethod'] # 'xml_file' | 'url'
    
    if metadata_method == 'xml_file':
        metadata_json ['MetadataFile']= request_body['metadata']
    
    elif metadata_method == 'url':
        metadata_json['MetadataURL'] = request_body['metadata']
    
    idp_identifiers = request_body['idpIdentifiers']

    client_id = request_body['clientId']
    
    
    client = boto3.client('cognito-idp')
    
    list_response = client.list_identity_providers(
    UserPoolId=user_pool_id
    )
    if len(list_response['Providers']) == 0:
        #crreate one
        CreateIdp(client, user_pool_id, provider_name, metadata_json, attr_map_json, idp_identifiers)
        
    else:
        #update existing
        UpdateIdp(client, user_pool_id, provider_name, metadata_json, attr_map_json, idp_identifiers)

    UpdateClient(client, client_id, user_pool_id, provider_name, 'https://jwt.io/')

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({
            'event': event
        })
    }

def CreateIdp(client, user_pool_id, provider_name, metadata_json, attr_map_json, idp_ids):
    create_response = client.create_identity_provider(
        UserPoolId=user_pool_id,                # REQUESTED
        ProviderName=provider_name,             # REQUESTED
        ProviderType='SAML',                    # REQUESTED
        ProviderDetails= metadata_json,         # REQUESTED
        AttributeMapping= attr_map_json,
        IdpIdentifiers=idp_ids
    )
    print('CreateIdP response:')
    print(create_response)
        
        
def UpdateIdp(client, user_pool_id, provider_name, metadata_json, attr_map_json, idp_ids):
    update_response = client.update_identity_provider(
        UserPoolId=user_pool_id,                # REQUESTED
        ProviderName=provider_name,             # REQUESTED
        ProviderDetails= metadata_json,
        AttributeMapping= attr_map_json,
        IdpIdentifiers=idp_ids
    )
    print('UpdateIdP response:')
    print(update_response)  

def UpdateClient(client, client_id, user_pool_id, idprovider_name, callback_url):
    response = client.update_user_pool_client(
        UserPoolId=user_pool_id,
        ClientId=client_id,
        SupportedIdentityProviders=[
            idprovider_name,
        ],
        CallbackURLs=[
            callback_url,
        ],
        AllowedOAuthFlows=[
            'code',
        ],
        AllowedOAuthScopes=[
            'openid',
            'email',
            'profile',
        ]
    )