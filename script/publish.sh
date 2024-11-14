cd /Users/yinzhennan/work/oscollege/react-chat-widget
# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# 切换到指定版本
nvm use 13
#获取包名
name=$(grep '"name":' package.json | sed -E 's/.*"name": "(.*)".*/\1/')
echo name $name
#获取版本号
current_version=$(grep '"version":' package.json | sed -E 's/.*"version": "(.*)".*/\1/')
echo old version $current_version
#更新版本号
IFS='.' read -r major minor patch <<< "$current_version"
new_patch=$((patch + 1))
new_version="$major.$minor.$new_patch"
sed -i "" "s/\"version\": \"${current_version}\"/\"version\": \"${new_version}\"/" package.json
echo new version $new_version
#build
npm run build
# 检查构建命令是否成功
if [[ $? -ne 0 ]]; then
  echo "构建失败，终止发布！"
  sed -i "" "s/\"version\": \"${new_version}\"/\"version\": \"${current_version}\"/" package.json

  exit 1
fi
echo "构建成功，准备发布..."
#发布
npm config set registry https://registry.npmjs.org/
proxy npm publish --access public
echo "发布完成"
echo "\"$name\": \"^$new_version\"",
