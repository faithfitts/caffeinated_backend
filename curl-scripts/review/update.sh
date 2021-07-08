#!/bin/bash

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}/${REVIEW_ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "review": {
    "content": "'"${CONTENT}"'",
    "postId": "'"${POST_ID}"'"
  }
}'

echo
