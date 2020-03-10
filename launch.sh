#!/bin/bash

# **********************************************
# launch : launch-test-deploy
#
# see "Design and Build Great Web APIs"
# 2020-04 : @mamund
# 
# notes:
#   - set up "npm run dev" in package.json (uses nodemon)
#   - create test collection in postman (called in test-run.sh)
#   - establish heroku app using git (via heroku cli)
#
# assumes:
#   - you have npm, package mgmt, and nodemon
#   - you have postman collections
#   - you have a heroku git remote
#
# direct dependencies:
#   - npm
#   - git
#
# **********************************************

# **********************************************
# exit var
ex=0

# commands
svc="npm run dev"
test_folder="test/postman"
test_pre="./test-run.sh local"
test_post="./test-run.sh remote"
deploy="git push heroku master"

# **********************************************
# setup killing backgrounds when done
trap "kill 0" EXIT 

# **********************************************
# start local instance of service as background
$svc &

# **********************************************
# run pre-deploy test script
echo "Running pre-deployment tests..."
cd $test_folder
$test_pre
ex=$?

# **********************************************
# check test status
if [ $ex -eq 1 ]
then
  echo "*** PRE-DEPLOY TESTS FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **********************************************
# use git push to heroku
echo "Deploying to production..."
$deploy
ex=$?

# **********************************************
# check heroku status
if [ $ex -eq 1 ]
then
  echo "*** DEPLOY FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **********************************************
# run post-deploy test script
echo "Running post-deployment tests..."
$test_post
ex=$?

# **********************************************
# check test status
if [ $ex -eq 1 ]
then
  echo "*** POST-DEPLOY TESTS FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **********************************************
# report successful run
echo 
echo "*****************************"
echo "*** DEPLOYMENT SUCCESSFUL ***"
echo "*****************************"
date
exit 0

# **********************************************
# EOF
# **********************************************

