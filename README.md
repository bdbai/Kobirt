# Kobirt
基于酷 Q 框架的 QQ 机器人，K 菊专用。  
K 菊，Ingress 昆绿大佬，被苏绿膜。

## 使用方法
### 准备
你需要：

1. 在 LeanCloud 上创建一个应用  
Kobirt 需要 LeacCloud 作为存储后端。
2. 在 AgentStats 上创建一个账户  
用于接收分享的特工资料。
3. 在 Trello 上收藏 [Ingress Medal Arts](https://trello.com/b/LvwOjrYP/ingress-medal-arts)  
用于查询拼图。

### 搭建
1. 在项目目录中构建 Docker 镜像
2. 在新的 Docker 容器中运行该镜像，将 5000 端口映射到主机
3. 使用 `docker exec` 进入镜像 shell 环境，将 [coolq-http-api](https://github.com/richardchien/coolq-http-api/releases) 的 cpk 文件下载至 `/home/user/coolq/app` 目录
4. 在浏览器中打开 [localhost:9000](http://localhost:9000)，登录并重启酷 Q 客户端，启用 HTTP API 插件

<del>是挺难搞的，别折腾了。</del>

### 支持的命令和功能
#### 私聊
```
K help - 输出帮助

K 我是谁 - 输出绑定的 Agent Stats 特工名
K 绑定 - 绑定 Agent Stats
K 注销 - 解除绑定 Agent Stats

K 得瑟 - 显示粗略统计信息
```
#### 群聊
新人加群退群提醒；
```
K help 输出帮助

K 得瑟 - 显示粗略统计信息

K 诶嘿 - 加入群排行榜统计
K 诶嘿 算了吧 - 退出群排行榜统计

K 起八 - 发起或查看起八
K 起八 耶 - 完成起八
K 起八 带上我 - 加入起八
K 起八 算了吧 - 退出起八

K 记住 - 添加关键词回复
K 忘记 - 删除关键词回复
```
#### 定时任务
*北京时间*
- 每周日 20:00 提醒更新 AgentStats 信息
- 每周日 21:00 向每个群发送排行榜

#### 说奇怪的话
<del>膜？K 菊？</del>
手动屏蔽其它机器人，避免打扰其它群员。

## 二次开发
<del>不存在的。</del>
