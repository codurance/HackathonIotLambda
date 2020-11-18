#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# CD to the Workdir
cd $DIR

# Zip the lambda
zip -j sanitizer.zip ../src/index.js

# Create a lambda on AWS
# https://docs.aws.amazon.com/cli/latest/reference/lambda/create-function.html
aws lambda create-function \
    --function-name sanitizer \
    --zip-file fileb://sanitizer.zip \
    --handler index.handler \
    --runtime nodejs12.x \
    --role arn:aws:iam::300563897675:role/hackathon-lambda-role

# https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html