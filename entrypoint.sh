#!/bin/bash

if ! type "$curl" > /dev/null; then
  echo install curl before proceeding 
  exit 1
fi

bash <(curl -s https://detect.synopsys.com/detect.sh) "$*"
