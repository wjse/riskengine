#!/bin/bash
echo "> To start deploy app..."

if [ -f "./dist.tar.gz" ];then
rm -rf ./dist.tar.gz
echo "> Remove older version dist.tar.gz."
fi

echo "> Run npm build with $1"

env="dev"

if test 0 -ne $#
then
    env="$1"
fi

echo "> ${env}"

npm run "${env}"

echo "> Started to tar the dist package"

dist_file="dist.tar.gz"
tar -zcvf ${dist_file} dist

#username="root"
#password="bamboocloud@2017"
#host="192.168.2.141"
#dest_dir="/usr/share/nginx/html"

#./scp.exp $host $username $password $dist_file $dest_dir

#./login.exp $host $username $password $dest_dir


