#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

role_name=hackathon-lambda-role
function_name=sanitizer

# Create the role and associate trust policy
# https://docs.aws.amazon.com/cli/latest/reference/iam/create-role.html
role_arn=$(aws iam create-role \
    --role-name $role_name \
    --tags Key=hackathon-aws,Value=IoT Key=Name,Value=$role_name \
    --assume-role-policy-document file://create_execution_role/trust-policy.json |
    jq -r ".Role.Arn")

# Associate the role with the base AWS lambda policy
aws iam attach-role-policy \
    --role-name $role_name \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

## Deploy the lambda for the first time
# Zip the lambda
zip -j $function_name.zip ../src/index.js

# Create a lambda on AWS
# https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html
aws lambda create-function \
    --function-name $function_name \
    --zip-file fileb://$function_name.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role $role_arn

# Associate the role with a predefined AWS Kinesis policy
