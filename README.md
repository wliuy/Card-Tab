# Card-Tab - 功能强大的卡片式导航

这是一个美观、现代化的书签导航项目。它采用卡片式布局，支持暗色主题、拖拽排序、私密书签，并拥有强大的分类管理和云端备份恢复功能。

本项目基于 Cloudflare Workers 和 KV 存储，部署简单，响应迅速，实现了真正的“一键部署”。

您当前查看的是 **wliuy** 的个人修改版，基于 [hmhm2022/Card-Tab](https://github.com/hmhm2022/Card-Tab) 项目进行了功能增强和流程优化。

![1745910265848](https://github.com/user-attachments/assets/bce632fc-d61c-4efe-a74e-e416cab085b8)

### ✨ 核心功能

#### 🎨 界面与体验
* **现代化设计**：优雅的卡片式布局，支持亮色/暗色双主题，并能记忆您的选择。
* **响应式布局**：完美适配桌面、平板和移动设备。
* **流畅交互**：拥有加载动画、悬停提示、一键返回顶部等细节优化。
* **个性化图标**：支持自定义图标URL，或自动从网站抓取 Favicon。

#### 🔍 搜索功能
* **多引擎切换**：内置 SearXNG、百度、谷歌、必应等多个搜索引擎，并能记住您的默认选择。
* **实时书签搜索**：在导航内即时搜索已保存的书签，快速定位。
* **分类快捷导航**：顶部分类按钮可快速跳转到指定区域，并高亮显示当前分类。

#### 📚 强大的书签管理
* **拖拽排序**：在“设置”模式下，通过拖拽直观地调整书签顺序。
* **完整分类管理**：
    * **增删改查**：轻松添加、删除、重命名分类。
    * **自由排序**：通过上下箭头调整分类的显示顺序。
* **私密书签**：支持设置登录后才可见的私密书签，保护个人隐私。
* **便捷编辑**：进入设置模式后，鼠标悬浮在卡片上即可快速编辑或删除。

#### 🔐 数据安全与备份
* **安全登录**：基于 JWT 的身份验证机制，Token 自动过期。
* **自动云端备份**：
    * **进入设置时自动备份**：每次进入“设置”模式前，系统会自动创建一份当前数据的快照。
    * **离开设置时安全退出**：退出设置时，您可以选择**保存修改**或**一键撤销**（从进入前的备份恢复），防止误操作。
* **手动备份与恢复**：
    * 提供**备份管理面板**，可查看多达10个历史备份节点。
    * 支持**手动创建**新的备份。
    * 支持从**任意历史节点**恢复数据。
* **导入/导出**：支持将所有书签数据导出为 `.json` 文件，或从文件中导入。

---

## 🚀 一键部署指南 (推荐)

我们使用 Cloudflare 官方命令行工具 `Wrangler`，抛弃繁琐的网页手动操作，只需两步即可完成所有配置和部署。

### 第 1 步：准备工作

1.  **克隆本项目到本地**
    ```bash
    git clone [https://github.com/wliuy/Card-Tab.git](https://github.com/wliuy/Card-Tab.git)
    cd Card-Tab
    ```

2.  **安装 Wrangler CLI**
    *(需要电脑上已安装 [Node.js](https://nodejs.org/) >= 16.17.0)*
    ```bash
    npm install -g wrangler
    ```

3.  **登录 Cloudflare 账户**
    执行以下命令，浏览器会自动打开授权页面，点击允许即可。
    ```bash
    wrangler login
    ```

4.  **修改配置文件 `wrangler.toml`**
    打开项目中的 `wrangler.toml` 文件，**您只需要修改两个地方**：
    * `account_id`: 替换成您自己的 Cloudflare 账户 ID。
        * *(获取方法：登录 Cloudflare -> 在首页右侧即可找到“账户 ID”)*
    * `ADMIN_PASSWORD`: 在 `[vars]` 部分，将 `"your_password_here"` 替换成您想设置的后台管理密码。

    **请将以下内容保存为 `wrangler.toml` 文件，并放到项目根目录：**
    ```toml
    # wrangler.toml
    name = "card-tab" # 您可以自定义Worker的名称
    main = "workers.js" # 指定入口文件
    compatibility_date = "2024-04-05"
    
    # ❗️❗️*** 请替换成你自己的 Account ID ***❗️❗️
    account_id = "YOUR_ACCOUNT_ID_HERE" 
    
    # 定义KV存储，Wrangler会自动创建并绑定
    kv_namespaces = [
      { binding = "CARD_ORDER", id = "", preview_id = "" }
    ]
    
    [vars]
    # ❗️❗️*** 在这里设置你的后台管理密码 ***❗️❗️
    ADMIN_PASSWORD = "your_password_here" 
    ```

### 第 2 步：执行部署

在项目根目录下（即 `wrangler.toml` 所在的目录），运行一个命令：

```bash
wrangler deploy



# 部署方法：
#### 五步即可完成部署：
#### 1. 登录 Cloudflare：  https://www.cloudflare.com  创建workers，复制 workers.js 的代码，然后部署
![image](https://github.com/user-attachments/assets/c067105b-91ee-43d5-90a9-806e5de5fe16)

#### 2. 新建一个名为CARD_ORDER的KV存储
![image](https://github.com/user-attachments/assets/706a7735-b47a-4f66-bdb4-827c38be692b)

#### 3. 添加环境变量，用于设置后台管理密码。变量名为ADMIN_PASSWORD，值your_password换成你自己的密码
![image](https://github.com/user-attachments/assets/532dcb8f-dc30-4ca9-aac9-21ef546bf367)

#### 4. 将workers的CARD_ORDER变量与新建的KV存储绑定，用于存储书签
![image](https://github.com/user-attachments/assets/9b166809-5b1e-451e-be99-253f6e60be54)

#### 5. 添加域名
![image](https://github.com/user-attachments/assets/4f23eab6-e94c-49b1-9198-3c8e05dffa8a)

## 此项目适合轻量使用，各位随意自行魔改，喜欢的话点一下小星星就行，谢谢！
