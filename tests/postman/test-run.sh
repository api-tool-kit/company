#!/bin/bash

# **************************************
# run a postman collection of tests
#
# see "Design and Build Great Web APIs"
# 2020-04 : @mamund
#
# assumes target API is up and running
#   and available at environment's URL
#
# utility dependencies:
#   - newman
#   - curl
#
# **************************************

# **************************************
# load local env values
if [ ! -f "postman.env" ]
then
  echo "Set POSTMAN_KEY in postman.env file first."
  exit 1
fi

source postman.env

# **************************************
# share vars
title="BigCo Company Tests"

svr="https://api.getpostman.com"
apikey=$POSTMAN_KEY
envid="na"
arg="na"

testfile="test-collection.json"
envfile="test-environment.json"
outfile="test-results.txt"

collid="48501-e8b3b37c-13ab-4eb9-9070-466bd8552699"
# localhost
local_envid="48501-3ed1e4f5-d531-42ef-a044-95ea24c8649f"
# heroku
remote_envid="48501-2ddd8578-43f1-41a6-9a7f-6ba2bdd1c9e8"

# **************************************
# heading
clear
echo $title
echo "===================================================="
date

# **************************************
# parse environment selection
if [ -z "$1" ]
then
  echo "*** missing environment - job cancelled. ***"
  exit 1
fi

arg=$1

if [ "$arg" == "local" ]
then
  envid=$local_envid
fi

if [ "$arg" == "remote" ]
then
  envid=$remote_envid
fi

echo "Running $arg environment..."

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

# **************************************
# pull collection 
echo "Pulling postman data..."
curl -s -X GET $svr/collections/$collid -H "X-Api-Key:$apikey" \
  -H "Cache-Control:no-cache" -o $testfile
curl -s -X GET $svr/environments/$envid -H "X-Api-Key:$apikey" \
  -H "Cache-Control:no-cache" -o $envfile

# **************************************
# run the tests
echo "Running tests..."
newman run $testfile -e $envfile > $outfile
newman run $testfile -e $envfile --bail newman  -r cli --reporter-cli-no-failures  \
  --reporter-cli-no-assertions --reporter-cli-no-console

# **************************************
# check exist code
if [ $? -eq 1 ]
then 
  echo "One or more tests failed!"
  ex=1
else
  echo "All tests passed."
  ex=0
fi

# **************************************
# clean up
echo
echo "Test run completed and saved to $outfile."
echo

exit $ex

# **************************************
# EOF
# **************************************

