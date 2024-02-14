
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">WorldHeritage</h3>



## 说明
该项目是一个基于[UniApp](https://uniapp.dcloud.net.cn/)的世界遗产项目
UniApp 是一个跨平台的开发框架，开发者编写一套代码，可编译成H5、小程序、App等多个平台的应用，故采用该框架进行开发。
## 安装
### 首先第一步需要安装HBuilderX
[下载地址](https://www.dcloud.io/hbuilderx.html)

### 第二步将项目下载到本地
将项目下载到本地，然后用HBuilderX打开项目，然后依次
- 文件/导入/从本地目录导入
- 设置所需的配置项
```bash
# 这部分设置为自己的后端地址，第三方的登录地址必须保持一致，因为认证域名需要在第三方平台上预设才能正常使用
module.exports = {
    baseUrl: 'http://192.168.0.104:8090/',
    googleAuthenticationUrl: 'http://exam.com/google/auth/redirect',
    twitterAuthenticationUrl: 'http://exam.com/twitter/auth/redirect',
    facebookAuthenticationUrl: 'http://exam.com/facebook/auth/redirect'
}
# 这部分为heroku的地址，如果需要部署到heroku上，需要将上面的baseUrl改为下面的地址
// module.exports = {
//     baseUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/',
//     googleAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/google/auth/redirect',
//     twitterAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/twitter/auth/redirect',
//     facebookAuthenticationUrl: 'https://world-heritage-d0047ce80266.herokuapp.com/facebook/auth/redirect'
// }


```
### 运行项目
依次点击
- 运行/运行到浏览器/选择浏览器

然后在控制台就会出现前端地址，点击即可进入项目
