#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"


aws s3 sync s3://aws-hackathon-iot ./bucket_aws-hackathon-iot
