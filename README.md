# 🏫 学校专属页面模板

这是一个为教育系统设计的GitHub Pages模板仓库，学校管理员可以基于此快速创建自己的专属页面

## 🚀 快速开始

### 第一步：基于此模板创建学校页面
1. 点击上方绿色的 **"Use this template"** 按钮
2. 选择 **"Create a new repository"**
3. 输入仓库名，格式建议：`学校名称-pages` (如：`第一中学-pages`)
4. 点击创建，您的新仓库就包含了所有模板文件！

### 第二步：自定义您的学校信息
1. 在新仓库中找到 `config.json` 文件
2. 点击编辑（铅笔图标 ✏️）
3. 修改以下信息：
   - `school_id`: 学校唯一标识（英文，如 `first-middle-school`）
   - `school_name`: 学校全称
   - `primary_color`: 主题色（十六进制，如 `#4a6fa5`）
   - `contact`: 联系信息
   - `announcements`: 学校公告

### 第三步：查看您的页面
提交修改后，等待约 **30秒**，访问：
```
https://[您的组织名].github.io/[仓库名]/
```
例如：`https://edu-system.github.io/first-middle-school-pages/`

## 🎨 自定义进阶

### 修改页面结构
编辑 `index.html` 文件，您可以：
- 调整页面布局
- 添加新的内容区块
- 修改样式和配色

### 替换Logo和图片
1. 将图片文件上传到 `assets/images/` 目录
2. 在 `config.json` 中更新 `logo_url` 路径

### 与主系统集成
页面已预设与主教学系统的通信接口：
- 通过 iframe 嵌入主系统
- 支持双向消息传递
- 自动适配主题色

## 📁 文件结构说明
```
school-pages-template/
├── index.html              # 主页面模板
├── config.json             # 学校配置文件
├── assets/
│   ├── css/style.css      # 附加样式
│   └── js/main.js         # 页面逻辑
├── .github/workflows/
│   └── deploy.yml         # 自动部署配置
└── README.md              # 本文件
```

## 🔄 更新与维护
- 页面内容更新：直接编辑文件并提交，自动部署
- 模板升级：定期检查原模板仓库的更新
- 问题反馈：在 Issues 中提交问题

## 📞 技术支持
如有技术问题，请联系主系统管理员。

---
**提示**：本模板设计为响应式，在手机、平板和电脑上均有良好显示效果。
