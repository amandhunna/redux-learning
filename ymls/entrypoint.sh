#!/bin/sh -l

declare -i mainBuildSize=$(jq '.[0].mainBuildSize' ./buildSize.json)
#npm run build
declare -i currentBuildSize=$(du -s ./build | cut -f1)
difference=`expr ${currentBuildSize} - ${mainBuildSize}`
echo "[{ current:$currentBuildSize, mainBuildSize:${mainBuildSize}, difference: ${difference} }]" 

up=$(jq --arg var1 $currentBuildSize --arg var2 $mainBuildSize --arg var3  $difference '.[0].mainBuildSize=$var1 | .[0].difference=$var3 | .[0].prevBuildSize=$var2' buildSize.json)
echo ${up} > buildSize.json
