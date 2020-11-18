#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# Deatach policy 
aws iam detach-role-policy \
    --role-name hackathon-lambda-role \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Delete the role
aws iam delete-role \
    --role-name hackathon-lambda-role