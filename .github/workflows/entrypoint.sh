#!/bin/sh -l

mainBuildSize=$(jq '.[0].mainBuildSize' ./buildSize.json)
#Snpm run build
currentBuildSize=$(du -s ./build | cut -f1)
difference=`expr ${mainBuildSize} - ${currentBuildSize}`
echo "current:$currentBuildSize, mainBuildSize=${mainBuildSize}, difference: ${difference}"

contents="this is working"
#contt=`$(jq '.[0].prevBuildSize="${mainBuildSize}" .[0].mainBuildSize="${currentBuildSize}" .[0].difference="${difference}"' buildSize.json)`

echo "pre" $(jq . buildSize.json)

up=$(jq --arg var1 "$currentBuildSize" '.[0].mainBuildSize=$var1' buildSize.json)
echo ${up} > test.json
