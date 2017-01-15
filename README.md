# Kobirt
基于 [Mojo-Webqq](https://github.com/sjdy521/Mojo-Webqq) 的 QQ 机器人，K 菊专用。  
K 菊，Ingress 昆绿大佬，被<del>咸鱼</del>苏绿膜。

## 使用方法
### 搭建
1. 在服务器上部署 [sjdy521/Mojo-Webqq](https://github.com/sjdy521/Mojo-Webqq) 项目，设置上报地址为 `http://localhost:5001`
2. 按照提示登录机器人 QQ
3. 复制 `env.sample.sh` 到 `env.sh`，修改其中的环境变量值
4. 执行命令
```sh
source env.sh
npm install
npm start
```

### 支持的命令和功能
#### 私聊
```
K help - 输出帮助
K 账户 - 输出账户命令帮助
K 账户 我是谁 - 输出绑定的 Agent Stats 特工名
K 账户 绑定 - 绑定 Agent Stats
K 账户 注销 - 解除绑定 Agent Stats
K 得瑟 - 显示粗略统计信息
```
#### 群聊
```
K help 输出帮助
K 得瑟 - 显示粗略统计信息
```

## 二次开发
本项目使用 TypeScript 编写。
### 普通消息处理
示例见 `src/Message/Handler/HelloHandler`。

1. 自定义一个消息处理类
2. 实现接口 `Message/Handler/IMessageHandler` 和其中的 `Handle` 方法
3. 在 `Main.ts` 中引入该类，并于 `Insert your message handlers here!` 处添加类的实例

### 命令消息处理
示例见 `src/Command/Handler/HelpHandler.ts`。

1. 自定义一个命令处理类，继承 `Command/Handler/CommandHandlerBase`
2. 声明 `Prefix` 字段为命令文本，实现 `processCommand` 方法
3. 在 `Main.ts` 中引入该类，并于 `Insert your command handlers here!` 处注册类的实例

