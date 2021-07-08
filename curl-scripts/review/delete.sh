#!/bin/bash

API="http://localhost:4741"
URL_PATH="/reviews"

curl "${API}${URL_PATH}/${REVIEW_ID}" \
  --include \
  --request DELETE \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "review": {
    "postId": "'"${POST_ID}"'"
  }
}'

echo
