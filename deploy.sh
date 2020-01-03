###
 # @Author: cA7dEm0n
 # @Blog: http://www.a-cat.cn
 # @Since: 2020-01-03 23:26:49
 # @Motto: 欲目千里，更上一层
 # @message: 构建脚本
 ###
#!/bin/bash
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
cd public
if [ -n "$GITHUB_TOKEN" ]
then
    touch ~/.git-credentials
    chmod 0600 ~/.git-credentials
    echo $GITHUB_TOKEN > ~/.git-credentials
    git config credential.helper store
    git config user.email "a-ca7@139.com"
    git config user.name "ca7dEm0n"
fi
git add .
git commit -m "Rebuild site"
git push --force origin HEAD:master