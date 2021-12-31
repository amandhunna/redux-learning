#!/bin/sh -l

echo "Hello $current"
time=$(date)
echo ":ne:set-output name=time::$time"

# current=$(du -sh ./)