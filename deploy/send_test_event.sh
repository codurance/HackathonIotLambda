#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

function_name=sanitizer
invoke_result_filename=out

PAYLOAD='{ "date": "20201118083211-8", "temperature": "120F" }'


payload_b64=$(echo -n $PAYLOAD | openssl base64)

aws lambda invoke \
    --function-name $function_name \
    --payload "$payload_b64" \
    $invoke_result_filename

cat $invoke_result_filename | jq

rm $invoke_result_filename
