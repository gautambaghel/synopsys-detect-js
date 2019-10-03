if [[ "$OSTYPE" == "linux-gnu" ]]; then
      echo "linux based os detected running bash script..."
elif [[ "$OSTYPE" == "darwin"* ]]; then
      echo "mac detected running bash script..."
elif [[ "$OSTYPE" == "cygwin" ]]; then
      echo "linux emulated windows detected running debian bash script..."
elif [[ "$OSTYPE" == "msys" ]]; then
      echo "lightweight windows detected running powershell bash script..."
elif [[ "$OSTYPE" == "win32" ]]; then
     echo "windows detected running powershell script..."
elif [[ "$OSTYPE" == "freebsd"* ]]; then
     echo "freebsd detected running debian bash script..."
else
     echo "Unknown OS detected trying debian bash script..."
fi

#!/bin/bash

bash <(curl -s https://detect.synopsys.com/detect.sh) "$*"
