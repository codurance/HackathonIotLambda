#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# Create the role and associate trust policy
# https://docs.aws.amazon.com/cli/latest/reference/iam/create-role.html
aws iam create-role \
    --role-name hackathon-lambda-role \
    --tags Key=hackathon-aws,Value=IoT Key=Name,Value=hackathon-lambda-role \
    --assume-role-policy-document file://create_execution_role/trust-policy.json

# Associate the role with the base AWS lambda policy
aws iam attach-role-policy \
    --role-name hackathon-lambda-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Associate the role with a predefined AWS Kinesis policy
