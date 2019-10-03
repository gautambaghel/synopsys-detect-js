#!/bin/bash

export JAVA_HOME="/usr/local/openjdk-8"

set -e

if [[ -z "${BLACKDUCK_URL}" || -z "${POLARIS_URL}" ]]; then
  echo "Set atleast one of Black Duck or Polaris URL secret variable."
  exit 1
fi

bash <(curl -s https://detect.synopsys.com/detect.sh) "$*"
