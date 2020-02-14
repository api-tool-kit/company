#!/bin/bash

# **************************************
# run a postman collection of tests
# see "Design and Build Great Web APIs"
# 2020-04 : @mamund
#
# assumes target API is up and running
#   and availble at environment's URL
#
# utility dependencies:
#   - newman
#   - curl
#
# **************************************

# **************************************
# share vars
title="BigCo Company Tests"

svr="https://api.getpostman.com"
apikey=$POSTMAN_KEY

collid="48501-e8b3b37c-13ab-4eb9-9070-466bd8552699"
envid="48501-3ed1e4f5-d531-42ef-a044-95ea24c8649f"

testfile="test-collection.json"
envfile="test-environment.json"
outfile="test-results.txt"

# **************************************
# heading
clear
echo $title
echo "===================================================="
date

# **************************************
# clean up
echo "Initializing..."
if [ -f "$testfile" ]
then
  rm $testfile
fi

if [ -f "$envfile" ]
then
  rm $envfile
fi

if [ -f "$outfile" ]
then
  rm $outfile
fi

curl -s -X GET $svr/collections/ -H "X-Api-Key:$apikey" -H "Cache-Control:no-cache" -o collection-list.json 
curl -s -X GET $svr/environments/ -H "X-Api-Key:$apikey" -H "Cache-Control:no-cache" -o environment-list.json

# **************************************
# pull collection 
echo "Pulling postman data..."
curl -s -X GET $svr/collections/$collid -H "X-Api-Key:$apikey" -H "Cache-Control:no-cache" -o $testfile
curl -s -X GET $svr/environments/$envid -H "X-Api-Key:$apikey" -H "Cache-Control:no-cache" -o $envfile

# **************************************
# run the tests
echo "Running tests..."
newman run $testfile -e $envfile > $outfile
newman run $testfile -e $envfile -r cli --reporter-cli-no-failures --reporter-cli-no-assertions --reporter-cli-no-console

# **************************************
# clean up
echo
echo "Test run completed and saved to $outfile."
echo

# **************************************
# EOF
# **************************************

