# wx-mp-update-manager
> 微信小程序更新管理工具

## 安装
```cmd
// 打开小程序项目根目录
cd project-dir
```
```cmd
// 使用 npm
npm init
npm i wx-mp-update-manager

// 或 yarn
yarn init
yarn add wx-mp-update-manager
```

## 构建NPM
* 第一步：点击微信开发者工具（小程序模式）下的“详情”；
* 第二步：勾选“使用npm模块”；
* 第三步：点击微信开发者工具（小程序模式）下的“工具”；
* 第四步：点击“构建npm”；
* 等待构建完毕；

## 引入
```js
const UpdateManager = require('wx-mp-update-manager');

// 设置默认提示标题
UpdateManager.setTitle('更新提示')
// 设置默认提示内容
UpdateManager.setContent('新版本已经准备好，是否重启应用？')

// 更新消息回调
UpdateManager.onMessage(res=>{
  // TODO
})
// 更新安装包下载完成回调
// UpdateManager.onReady() 不传入回调则显示默认提示信息
UpdateManager.onReady(res=>{
  // TODO
})
// 更新失败回调
UpdateManager.onFail(res=>{
  // TODO
})
```

## 拓展
> 支持链式编程
```js
const UpdateManager = require('wx-mp-update-manager');

UpdateManager
  .setTitle('更新提示')
  .setContent('新版本已经准备好，是否重启应用？')
  .onMessage(res=>{
   console.log('onMessage',res) 
  })
  .onReady()
  .onFail(res=>{
   console.log('onFail',res) 
  })
```
