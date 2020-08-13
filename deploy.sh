#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# cd到example
cd example

# 构建
npm run build

#复制 dist 到 docs 下
cp -Rf dist/* ../docs/.vuepress/public/example/

# 执行完退出
cd -

# 构建
npm run docs:build

# cd 到构建输出的目录下
cd docs/.vuepress/dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:hzyhbk/vue-create-dm.git master:gh-pages

cd -