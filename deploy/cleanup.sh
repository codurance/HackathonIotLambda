#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

role_name=hackathon-lambda-role
function_name=sanitizer

# Deatach policy 
aws iam detach-role-policy \
    --role-name $role_name \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Delete the role
aws iam delete-role \
    --role-name $role_name

# Delete lambda function
aws lambda delete-function \
--function-name $function_name