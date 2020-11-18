#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

#   const event = {
#     date: "20201118083200-8",
#     temperature: "0C",
#   };

firehose_name=aws-hackathon-iot

PAYLOAD='{ "date": "20201118083200-8", "temperature": "31F", "txt": "Bedroom" }'

payload_b64=$(echo -n $PAYLOAD | openssl base64)

aws firehose put-record \
    --delivery-stream-name $firehose_name \
    --record Data="$payload_b64"


# https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#cw:dashboard=Lambda