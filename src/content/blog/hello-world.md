---
title: "告别手动上传：Hugo + GitHub Actions 自动化部署复盘"
date: 2026-01-14T08:00:00+08:00
description: "从重复劳动到自动化触发：Hugo + GitHub Actions + 腾讯云的 CI/CD 流水线复盘"
categories: ["技术复盘"]
---

# 告别手动上传：Hugo + GitHub Actions 自动化部署复盘

> **日期：** 2026-01-14  
> **环境：** Windows 11 / Debian 12 / GitHub Private Repo

---

## 前言：从重复劳动到自动化触发

手动执行 Hugo 生成、连接服务器、传输文件的发布流程，不仅效率低下，且容易因操作失误导致部署异常。理想的发布流程应满足：**版本控制即发布行为**，代码推送完成后，构建与部署环节应完全自动化。

基于此目标，本次实践旨在搭建 Hugo + GitHub Actions + 腾讯云的 CI/CD 流水线。预估耗时 30 分钟，实际耗时约 4 小时，主要阻塞点集中在 SSH 密钥认证与 Linux 文件权限配置。

---

## 系统架构

| 组件 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **本地开发** | Windows 11 + VS Code | 配置透明化工作区与连体字体 |
| **静态站点生成器** | Hugo | 构建速度快，生态成熟 |
| **代码仓库** | GitHub Private Repository | 保护草稿阶段内容 |
| **服务器** | 腾讯云轻量应用服务器 | 操作系统：Debian 12 |
| **Web 服务** | Nginx | 静态资源托管 |
| **自动化工具** | GitHub Actions | 免费额度满足个人博客需求 |

---

## 关键问题复盘

### 问题一：Git 推送拒绝（历史线冲突）

**现象：**  
初始化仓库后首次 `git push` 失败，提示 `failed to push some refs to...`。

**根因：**  
远程仓库初始化时勾选了「创建 README.md」，导致远端与本地历史线不一致，Git 拒绝非快进式合并。

**解决方案：**  
首次推送采用强制覆盖策略（仅适用于初始化阶段）：

```bash
git remote add origin git@github.com:username/repository.git
git push -u origin main -f  # -f 参数强制同步，后续提交需避免使用
```

**经验总结：**  
自动化流程要求仓库历史线纯净，建议初始化时选择空仓库，后续通过代码提交补充 README。

---

### 问题二：SSH 私钥保护密码导致认证失败

**现象：**  
GitHub Actions 日志显示 `ssh: unable to authenticate`，提示私钥被密码保护。

**根因：**  
生成 SSH 密钥时设置了通行密码（passphrase），自动化脚本无法交互式输入，导致握手失败。

**解决方案：**  
生成无密码保护的专用部署密钥：

```powershell
ssh-keygen -t rsa -b 4096 -m PEM -f ~/.ssh/github_deploy -N ""
```

**安全风险说明：**  
无密码密钥需配合 GitHub Secrets 严格保管，建议服务器端限制该密钥的来源 IP 与执行权限。

---

### 问题三：Linux 权限模型的强制约束

**现象：**  
本地 SSH 测试连接成功，GitHub Actions 持续返回 `Permission denied (publickey)`。开启 verbose 模式后，日志中断在 `we did not send a packet, disable method`。

**根因：**  
SSH 服务对密钥文件权限有强制性安全校验。若 `.ssh` 目录或 `authorized_keys` 文件权限过松（如组用户或其他用户可读/写），SSH 将拒绝使用该密钥认证，且不会明确提示权限问题。

**解决方案：**  
执行权限修正三阶段操作：

```bash
chmod 700 ~/.ssh                      # 目录：仅所有者可读写执行
chmod 600 ~/.ssh/authorized_keys      # 公钥文件：仅所有者可读写
chmod 750 /home/username              # 用户主目录：避免 777 权限导致校验失败
```

**排查建议：**  
此问题隐蔽性强，建议通过 `ssh -vvv` 逐行分析握手过程，关注密钥加载阶段的日志输出。

---

### 问题四：服务端 SSH 配置未启用公钥认证

**现象：**  
上述步骤完成后，GitHub Actions 仍无法连接，但本地客户端可成功认证。

**根因：**  
服务器 `/etc/ssh/sshd_config` 配置文件中，`PubkeyAuthentication` 未显式开启或 `PermitRootLogin` 被禁用。

**解决方案：**  
修改服务端 SSH 配置并重启服务：

```bash
sudo nano /etc/ssh/sshd_config

# 确保以下配置项已启用
PubkeyAuthentication yes
PermitRootLogin yes          # 生产环境建议改用普通用户 + sudo

sudo systemctl restart ssh
```

---

## 最终成果：自动化工作流

完成上述配置后，GitHub Actions 执行状态由 ❌ 全部转为 ✅，部署流程实现完全自动化。

**当前工作流：**
1. **本地提交：** `git commit` 后执行 `git push origin main`
2. **触发构建：** GitHub Actions 监听 `push` 事件，拉取代码
3. **静态生成：** 执行 `hugo --minify` 生成优化后的静态文件
4. **部署传输：** 通过 `scp` 命令将 `public/` 目录同步至服务器 Nginx 路径
5. **线上生效：** Nginx 配置 `autoindex off`，无需重启即可对外服务

**平均部署耗时：** 35-45 秒

---

## 开发环境优化

为提升写作体验，同步优化了 VS Code 工作区配置：

```json
{
  "workbench.colorCustomizations": {
    "statusBar.background": "#673ab7",
    "statusBar.foreground": "#e1e1e1"
  },
  "editor.fontFamily": "JetBrains Mono, Consolas, monospace",
  "editor.fontLigatures": true,
  "glassit.alpha": 250
}
```

* **JetBrains Mono 字体：** 符号连字提升代码可读性
* **GlassIt-VSC 插件：** 调整窗口透明度，适应多任务参考场景
* **状态栏配色：** 视觉区分工作区状态

---

## 总结与后续规划

本次实践的核心价值在于理解 CI/CD 底层机制：**Git 作为事件源、SSH 作为认证通道、Linux 权限作为安全基线**。自动化不仅节省重复劳动，更强化了部署流程的规范性与可回滚性。

**后续待办事项：**
1. **安全加固：** 创建专用部署用户，禁用 root 远程登录
2. **传输优化：** 采用 `rsync` 替代 `scp`，实现增量同步
3. **HTTPS 配置：** 申请并配置 Let's Encrypt 证书
4. **多环境部署：** 利用 GitHub Actions Environments 实现预览站点与生产站点分离

对于仍在手动部署的同学，建议尽早投入时间搭建自动化流水线。初期踩坑成本虽高，但长期收益显著。

---

*技术复盘于 2026-01-15 凌晨完成，部署流程现已稳定运行。*