
# Node.js（与 Deno）的安装与配置

学完本书正文后，日常写 Javascript 最常见的环境是 **Node.js**；也可以并行了解 **Deno**。两者都能在终端里直接运行 `.js` 文件，并提供模块系统、文件系统与网络等能力。

> Node 官方文档：https://nodejs.org/docs/latest/api/  
> Deno 官方文档：https://docs.deno.com/

## 安装 Node.js

### 推荐：用版本管理器（nvm）

这样你可以同时保留多个 Node 版本，切换成本很低 —— 和正文里提到的 “同时使用不同版本的 Node CLI” 正好对上。

**Mac / Linux：**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# 重新打开终端后：
nvm install --lts
nvm use --lts
node -v
npm -v
```

**Windows：** 可使用 [nvm-windows](https://github.com/coreybutler/nvm-windows)，或直接从官网安装 LTS 安装包：

> https://nodejs.org/

安装完毕后确认：

```bash
which node   # Windows 用 where node
node -v
npm -v
npx -v
```

### 也可用 Homebrew（Mac）

```bash
brew install node
node -v
```

## 第一次跑起来

随便建个目录练手：

```bash
mkdir ~/js-playground
cd ~/js-playground
npm init -y
```

若你打算用 ES Module（`import` / `export`），在 `package.json` 里加上：

```json
{
  "type": "module"
}
```

然后写个 `hello.js`：

```javascript
console.log('Hello, Javascript!');
```

运行：

```bash
node hello.js
```

也可以进入 REPL（交互环境）边敲边看：

```bash
node
```

在 REPL 里输入表达式后回车即可；退出用 `.exit` 或 `Ctrl + D`。

## 可选：安装 Deno

Deno 对权限与 ES Module 更直接，正文里部分章节也给了 Deno 跑法。安装（Mac / Linux）：

```bash
curl -fsSL https://deno.land/install.sh | sh
deno --version
```

Windows 可用 PowerShell：

```powershell
irm https://deno.land/install.ps1 | iex
```

试跑：

```bash
deno eval "console.log('Hello from Deno')"
deno run hello.js
```

需要读文件时记得加权限，例如：

```bash
deno run --allow-read hello.js
```

## 编辑器配合

装好 Node 之后，回到 [Visual Studio Code / Cursor 附录](T-appendix.editor.vscode.md)，装上 ESLint 等扩展，用集成终端运行 `node` / `deno` 即可。

常用终端命令备忘：

```bash
node -v                 # Node 版本
npm -v                  # npm 版本
npm init -y             # 初始化 package.json
npm install <pkg>       # 安装依赖
npx <cmd>               # 临时运行包提供的命令
node file.js            # 运行脚本
node                    # 进入 REPL
deno run file.js        # Deno 运行
deno repl               # Deno 交互环境
```

## 小习惯

> * 项目里生成并维护 `.gitignore`（至少忽略 `node_modules/`）
> * 优先学清 **ES Module**（`import`/`export`）；遇到老仓库再补 CommonJS（`require`/`module.exports`）
> * 官方文档永远是第一查询对象：拿不准就搜 MDN 或 Node / Deno docs

至此，你已经有了 “能写、能跑、能装包、能查文档” 的基本环境 —— 剩下的，就是多写、多拆、多造作品。
