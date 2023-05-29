import jwt
from jwt.contrib.algorithms.pycrypto import RSAAlgorithm


def validate_cognito_token(token, user_pool_id, region):

    keys_url = f"https://cognito-idp.{region}.amazonaws.com/{user_pool_id}/.well-known/jwks.json"
    response = requests.get(keys_url)
    keys = response.json()["keys"]
    jwt.register_algorithm("RS256", RSAAlgorithm(RSAAlgorithm.SHA256))
    
    decoded_token = jwt.decode(token, algorithms=["RS256"], options={"verify_signature": False})

    kid = decoded_token.get("kid")
    public_key = None
    for key in keys:
        if key["kid"] == kid:
            public_key = RSAAlgorithm.from_jwk(json.dumps(key))
            break

    try:
        jwt.decode(token, public_key, algorithms=["RS256"])
        return True
    except jwt.InvalidSignatureError:
        return False

def lambda_handler(event, context):
    token = event["authorizationToken"]
    user_pool_id = "eu-central-1_QOoTXKgsC"
    region = "eu-central-1"

    is_valid_token = validate_cognito_token(token, user_pool_id, region)

    if is_valid_token:

        auth_response = {
            'principalId': 'user_id',
            'policyDocument': {
                'Version': '2012-10-17',
                'Statement': [
                    {
                        'Action': 'execute-api:Invoke',
                        'Resource': 'arn:aws:execute-api:region:account-id:api-id/stage/HTTP_METHOD/Resource_path',
                        'Effect': 'Allow'
                    }
                ]
            }
        }
        return auth_response
    else:

        auth_response = {
            'principalId': 'user_id',
            'policyDocument': {
                'Version': '2012-10-17',
                'Statement': [
                    {
                        'Action': 'execute-api:Invoke',
                        'Resource': 'arn:aws:execute-api:region:account-id:api-id/stage/HTTP_METHOD/Resource_path',
                        'Effect': 'Deny'
                    }
                ]
            }
        }
        return auth_response
