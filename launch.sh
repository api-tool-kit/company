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
# start title
echo 
echo "Launching deployment..."

# **********************************************
# exit var
ex=0

# **********************************************
# load config
config="launch.config"
if [ ! -f "$config" ]
then
  echo
  echo "Missing launch.config"
  echo
  exit 1
fi

source $config

# **********************************************
# setup killing backgrounds when done
trap "kill 0" EXIT 

# **********************************************
# start local instance of service as background
$svc &

# **********************************************
# run pre-deploy test script
ex=1
echo "Running pre-deployment tests..."
cd $test_folder
$test_pre
ex=$?

# **********************************************
# check test status
if [ $ex -gt 0 ]
then
  echo "*** PRE-DEPLOY TESTS FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **********************************************
# use git push to heroku
if [ $ex -eq 0 ]
then
  ex=1
  echo "Deploying to production..."
  $deploy
  ex=$?
fi  

# **********************************************
# check heroku status
if [ $ex -gt 0 ]
then
  echo "*** DEPLOY FAILED - job cancelled. ***"
  echo
  exit $ex
fi  

# **********************************************
# run post-deploy test script
if [ $ex -eq 0 ]
then	
  ex=1
  echo "Running post-deployment tests..."
  $test_post
  ex=$?
fi

# **********************************************
# check test status
if [ $ex -gt 0 ]
then
  echo "*** POST-DEPLOY TESTS FAILED - job cancelled. ***"
  echo
  exit $ex
else
  echo 
  echo "*****************************"
  echo "*** DEPLOYMENT SUCCESSFUL ***"
  echo "*****************************"
  date
  exit 0
fi  

# **********************************************
# EOF
# **********************************************
