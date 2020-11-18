#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR


aws s3 sync --delete s3://aws-hackathon-iot ./bucket_aws-hackathon-iot
