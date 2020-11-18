#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

function_name=sanitizer

# CD to the Workdir
cd $DIR

# Zip the lambda
zip -j $function_name.zip ../src/index.js

# Update a lambda on AWS
# https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html
aws lambda update-function-code \
    --function-name $function_name \
    --zip-file fileb://$function_name.zip