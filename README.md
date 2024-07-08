# qiankun project demo

## 一、项目介绍
此项目使用 qiankun 实现微前端，包含主应用、子应用1、子应用2，均基于vue2.0。\
主要实现了：
1. 主应用可同时加载多个子应用。
2. 主应用统一自定义页签管理，根据路由自动添加页签，也可以手动关闭。多个子应用页签可同时存在，互相切换。并使用 LRU 算法对页签进行管理，防止页签过多导致页面卡顿。

## 二、 项目启动
依赖安装

```
npm run install
```
启动主、子应用

```
npm run start
```

## 三、TODO
 1. 样式隔离、脚本隔离的实践
 2. 父子应用间通信的实践
 3. vue2 以外的框架接入