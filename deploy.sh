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