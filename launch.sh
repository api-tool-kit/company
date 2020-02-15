#!/bin/bash

# **************************************
# launch : launch-test-deploy
#
# see "Design and Build Great Web APIs"
# 2020-04 : @mamund
# 
# notes:
#   - set up "npm run dev" in package.json
#   - create test collection in postman (test-run.sh)
#   - establish heroku app using git
#
# assumes:
#   - you have npm and package mgmt
#   - you have postman collections
#   - you have a heroku git remote
#
# direct dependencies:
#   - npm
#   - git
#
# **************************************

# **************************************
# exit var
ex=0

# commands
svc="npm run dev"
test="./test-run.sh"
deploy="git push heroku master"

# **************************************
# setup killing backgrounds when done
trap "kill 0" EXIT 

# **************************************
# start local instance of service
$svc &

# **************************************
# run test script
cd tests/postman
$test
ex=$?

# **************************************
# check test status
if [ $ex -eq 1 ]
then
  echo "*** TESTS FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **************************************
# use git push to heroku
echo "Deploying to production..."
$deploy
ex=$?

# **************************************
# check heroku status
if [ $ex -eq 1 ]
then
  echo "*** DEPLOY FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **************************************
# report successful run
echo 
echo "***********************************"
echo "*** DEPLOYMENT SUCCESSFUL ***"
echo "***********************************"
exit 0

# **************************************
# EOF
# **************************************

