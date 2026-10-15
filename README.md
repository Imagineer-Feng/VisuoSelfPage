# VisuoSelf 项目主页

独立、无需构建的英文科研项目主页。所有页面、样式、脚本、字体、论文和图片均在此目录内，运行时不需要 npm、CDN、第三方字体或后端。资源全部使用相对路径，兼容 `username.github.io` 根站点和 `username.github.io/VisuoSelf/` 项目站点。

## 本地查看

如果终端已经位于 `website/` 目录（当前目录下可以看到 `index.html`），执行：

```bash
python3 -m http.server 8000
```

如果终端位于上一级 `EmbodiedPsychologyBench/` 项目根目录，执行：

```bash
python3 -m http.server 8000 --directory website
```

浏览器打开 `http://localhost:8000/`。`--directory` 的路径相对于启动命令时的当前目录；在 `website/` 内不要再加 `--directory website`，否则服务器会查找不存在的 `website/website/` 并返回 404。如果已启动错误的服务，先按 `Ctrl+C` 停止，再使用正确命令重启。

也可以直接打开 `index.html`；如果浏览器不允许剪贴板访问，复制按钮会选中引用文本，也可以下载 BibTeX。

## 上传到 GitHub Pages

### 方式一：独立网站仓库（推荐）

1. 创建一个 GitHub 仓库，例如 `VisuoSelf`。如果希望使用 `https://用户名.github.io/`，仓库名使用 `用户名.github.io`。
2. 将 **website 文件夹内的全部内容** 放入仓库根目录，包括隐藏文件 `.nojekyll` 和 `.github/workflows/deploy-pages.yml`。仓库根目录应能直接看到 `index.html`、`styles.css` 和 `assets/`。
3. 在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 推送到 `main` 或 `master` 分支；也可以在 Actions 中手动运行 **Deploy VisuoSelf to GitHub Pages**。
5. 工作流完成后，在 Pages 设置或工作流的 `github-pages` environment 中查看实际网址。

如果不使用 Actions，也可以让独立仓库从 `main` 分支的 `/(root)` 发布；本项目不需要构建。

### 方式二：保留当前仓库中的 website 子目录

将 `website/` 保持原样，然后将 `website/.github/workflows/deploy-pages.yml` **复制到仓库根目录的** `.github/workflows/deploy-pages.yml`。GitHub 只识别根目录下的工作流。之后按上面的步骤将 Pages 的 Source 设为 GitHub Actions。

工作流会自动检测 `website/index.html` 并只上传 `website/` 作为站点内容。若直接把网站内容放在仓库根目录，它会自动使用根目录。默认监听 `main`、`master`；使用其他分支时修改工作流中的 `branches`。

部署配置依据 [GitHub Pages 官方自定义工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)；分支发布参见 [发布源设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本次仅创建本地文件，未上传或发布。

## 页面内容与交互

- 项目标题、五位作者、上海交通大学机构信息、论文 PDF 和研究简介。
- Figure 1：研究动机与 choice / judgment 差异。
- Figure 2：基准构成、三种场景、匹配评测及结构化审计。
- 三种场景、三级难度的可切换示意。示意明确标注为 schematic，不是原始实验轨迹或模型预测。
- **Table 4：全部 14 个模型与 Random，150 个原始结果数值。** 保留两种格式的 S1 / S2 / S3 / Avg.、self / non-self recall，以及论文的最佳和次佳标记；支持按总体 choice、judgment 或 non-self recall 排序，Random 始终置于末尾。
- **Figure 4：四个代表模型的难度变化趋势图，含误差条。**
- `visuoself_radar_levels.pdf`：三级难度及其平均的分场景雷达图。该图的代表模型与 Figure 4 不完全相同，页面分别说明。
- 四张图均支持键盘可访问的放大弹窗、进一步缩放、Esc 关闭，以及原始 PDF 查看。弹窗关闭后焦点回到原图。
- Table 4 / 雷达图数据下载、BibTeX 下载与复制、作者联系邮箱。
- 移动端布局、横向滚动表格、减少动态效果偏好、打印样式与跳转到正文链接。

## 文件结构

```text
website/
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
├── .github/workflows/deploy-pages.yml
└── assets/
    ├── favicon.svg
    ├── visuoself.bib
    ├── fonts/          # 本地 Lato 字体和授权说明
    ├── images/         # 四张图的高清 WebP 和首图小尺寸版本
    ├── pdf/            # 四张原始图 PDF，以及当前论文副本
    └── data/           # Table 4、雷达图的 CSV / JSON
```

## 内容来源与后续更新

内容依据 `cvpr2026/arxiv/main.tex` 和 `VisuoSelf/README.md`。网站中的 Figure 4 按**当前论文编号**命名，源文件实际名为 `visuoself_fig5.pdf`。

| 网页资源 | 项目中的原始文件 |
| --- | --- |
| `assets/pdf/figure1.pdf` | `cvpr2026/arxiv/figure/figure1.pdf` |
| `assets/pdf/figure2.pdf` | `cvpr2026/arxiv/figure/figure2.pdf` |
| `assets/pdf/figure4.pdf` | `cvpr2026/arxiv/figure/visuoself_fig5.pdf` |
| `assets/pdf/visuoself_radar_levels.pdf` | `cvpr2026/arxiv/figure/visuoself_radar_levels.pdf` |
| `assets/pdf/visuoself-paper.pdf` | `cvpr2026/arxiv/main.pdf` |
| Table 4 的静态 HTML 和 CSV / JSON | `main.tex` 中 `tab:main-results` 的表格，逐项提取 |
| 雷达图 CSV / JSON | `figure/visuoself_radar_levels.csv` / `.json`，网站 JSON 仅保留展示所需字段 |

PDF 原件按字节复制，未修改。WebP 展示图只裁去 PDF 白边并转换格式。Figure 2 按要求保留原始图，其中 Scene 3 审计框的文字在当前论文正文中已修正为“exact lag in steps”；网页图注与场景说明使用正确的整数延迟审计定义。

后续更新时：

- **论文**：替换 `assets/pdf/visuoself-paper.pdf`。
- **arXiv 和代码仓库链接**：确认真实地址后，在 `index.html` 的按钮或资源区添加。当前没有填写未经确认的 arXiv 编号或仓库地址。
- **引用**：同步修改 `index.html` 中的 BibTeX 和 `assets/visuoself.bib`。当前引用为 2026 年 project manuscript，没有推定会议接收情况或 DOI。
- **Table 4**：同步更新 HTML 表格与 `assets/data/table4.csv` / `.json`。排序直接使用每个 `<tr>` 的 `data-choice`、`data-judgment` 和 `data-nonself`，更新数值时需一并更新。
- **图形**：替换对应 PDF 与 WebP；图片尺寸改变时同步修改 HTML 的 `width` / `height`。三张用户指定 PDF 和 Figure 4 均已随站点附上。

本地 Lato 字体遵循 SIL Open Font License，详见 `assets/fonts/LICENSE-Lato.txt`。论文、插图与结果数据的权利归原作者；此页面未额外为研究材料指定开源许可。
