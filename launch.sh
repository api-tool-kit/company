#!/bin/bash

# **************************************
# launch deployment run
#
# see "Design and Build Great Web APIs"
# 2020-04 : @mamund
#
# utility dependencies:
#   - nopm/NodeJS
#   - curl
#   - jq
#   - newman/postman
#   - heroku cli (later)
#
# **************************************

# ************************************
# setup killing backgrounds when done
trap "kill 0" EXIT 

# ************************************
# start local instance of service
npm run dev &

# ************************************
# run test script
cd tests/postman
bash ./test-run.sh
ex=$?

# ************************************
# check test status
if [ $ex -eq 0 ]
then
  echo "Success!"
else
  echo "Tests failed."
fi

# ************************************
# exit and return results
exit $ex

# ************************************
# EOF
# ************************************
