########################################################################################################
#EN:
#This lambda will:
# 1) Create new Cognito User Pool with 2 clients:
#       1a) Create User Pool
#       1b) Create SSO integration
#       1c) Create SSO integration example
# 2) Create new IAM role for that Cognito Pool to integrate (SAML) SSO
# 3) Create user in (!!!)Amplify User Pool(!!!) with created role for New Cognito Pool
# 4) Save: user_id, coognito_pool_id, clients_id to DynamoDB
#
#PL:
#Lambda ma za zadanie:
# 1) Utworzyć nowy Cognito User Pool z dwoma klientami
#       1a) Utworzyć nowy Pool
#       1b) Dodać integrację SSO
#       1c) Dodać przykład integracji SSO
#2) Utorzyć nową IAM-rolę dla nowopowstałego User Poola do integracji SSO
#3) Stworzenie usera W NASZYM AMPLIFY'OWYM POOLU z uprawnieniami do integracji SSO nowoutworzonego Poola
#4) Zapisanie id nowego usera, id nowego Poola i id dwuch klientów w Poolu do bazy danych Dynamo
########################################################################################################



# run lambda CreateUserPool(user_pool_name) that returns {user_pool_id: xyz, client1_id: xyz, client2_id: xyz}
# lambda CreateRole(user_pool_id) that returns iam_role_id/arn
# lamda CreteUser(tech_user_mail, iam_role_arn) that returns tech_user_id
# [user_pool_id, cient1_id, client2_id, tech_user_id] >> DynamoDB
