### 搭建项目步骤：
#### 1:创建 react app，create-react-app pool-pc
#### 2:启动 cd pool-pc  yarn start
#### 3:安装react路由模块 npm i react-router-dom
#### 4:安装react反向代理 npm i http-proxy-middleware
#### 5:安装xml请求模块 npm install axios
#### 6:在src下建立setupProxy.js文件 
#### 7:安装npm install redux 安装 npm install react-redux

### 安装css语言扩展：暴露webpack配置文件
#### 8:npm install less less-loader
#### 9:有时报git错误，执行git add .
#### 10:git commit -am "Save before ejecting"
#### 11:npm run eject 
#### 12:配置config/webpack.config.js文件
#### 8-12步骤配置参照：[https://www.jianshu.com/p/bfa308164df4](https://www.jianshu.com/p/bfa308164df4)

### redux持久化模块
#### 13：npm install redux-persist
#### 14：reducer和action代码不需要动，store代码修改如index.js（redux的index）
#### 15：主入口的index文件修改为当前index.js
#### 13-15步操作参照：：[https://www.jianshu.com/p/bfa308164df4](https://www.jianshu.com/p/bfa308164df4)

### 样式及插件模块安装
### 16：npm install antd