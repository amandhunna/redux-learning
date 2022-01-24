# Getting Started with Redux

- masterBuild.txt : A file having list of file names and its corresponding size of base (master/main) branch
# step 1
```Run  buildSizeComparsion.yml```
1. create build of current branch and get files size
2. Run Node script and pass current build file size as arguments
   node script get build size of files from masterBuild.txt
   and run size comparaion function

# step 2
```Run buildSizeCommit.yml```
1. Once the PR is merged, update the masterBuild.txt with the new file size     of the build  

##Refs

- https://lannonbr.com/blog/2019-12-09-git-commit-in-actions (for push)