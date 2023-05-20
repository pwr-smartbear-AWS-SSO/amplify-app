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

    #client_id = request_body['clientId']
    clients_ids = request_body['clientIds']
    
    
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

    clinet1_response = UpdateClient(client, clients_ids[0], user_pool_id, provider_name, 'https://jwt.io/', 1)
    clinet2_response = UpdateClient(client, clients_ids[1], user_pool_id, provider_name, 'https://jwt.io/', 0)
    
    print("Update Client 1 Response", clinet1_response)
    print("Update Client 2 Response", clinet2_response)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({
        #    'client1Response': str(clinet1_response),
        #    'client2Response': str(clinet2_response)
            'test': 'TEST'
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

def UpdateClient(client, client_id, user_pool_id, idprovider_name, callback_url, oauth_flow_code):
    if oauth_flow_code:
        allow_oauth_flow = 'code'
    else:
        allow_oauth_flow = 'implicit'
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
            allow_oauth_flow,
        ],
        AllowedOAuthScopes=[
            'openid',
            'email',
            'profile',
        ],
        AllowedOAuthFlowsUserPoolClient=True
    )
    return response