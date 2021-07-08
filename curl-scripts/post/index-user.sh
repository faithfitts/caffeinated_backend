#!/bin/sh

API="http://localhost:4741"
URL_PATH="/posts"

curl "${API}${URL_PATH}/${USER}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
