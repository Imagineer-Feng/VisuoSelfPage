# VisuoSelf 项目主页

基于 [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) 的英文科研项目主页。采用模板的居中论文标题、作者、入口按钮、摘要和图表展示结构，并接入 VisuoSelf 的完整结果和交互。

这是独立、无需构建的静态网站。所有页面、样式、脚本、字体和图片均在此目录内，运行时不需要 npm、CDN、外部字体服务或后端。资源全部使用相对路径，兼容 `username.github.io` 根站点和 `username.github.io/VisuoSelf/` 项目站点。

模板署名保留在页脚。上游版本与许可证见 `THIRD_PARTY_NOTICES.md`。当前所有论文按钮仍保留原链接；本地的 `assets/pdf/visuoself-paper.pdf` 已被移除，按要求暂不处理，之后可以补回 PDF 或替换为真实的论文链接。

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

1. 创建名为 `VisuoSelf` 的公开 GitHub 仓库，即可使用项目站点地址 `https://用户名.github.io/VisuoSelf/`。
2. 将 **website 文件夹内的全部内容** 放入仓库根目录，包括隐藏文件 `.nojekyll` 和 `.github/workflows/deploy-pages.yml`。仓库根目录应能直接看到 `index.html`、`styles.css` 和 `assets/`。
3. 在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 推送到 `main` 或 `master` 分支；也可以在 Actions 中手动运行 **Deploy VisuoSelf to GitHub Pages**。
5. 工作流完成后，在 Pages 设置或工作流的 `github-pages` environment 中查看实际网址。

如果首次运行在 `Configure GitHub Pages` 步骤报 `Get Pages site failed` / `Not Found`，先完成第 3 步启用 Pages 并将 Source 设置为 GitHub Actions，再重新运行工作流。

如果不使用 Actions，也可以让独立仓库从 `main` 分支的 `/(root)` 发布；本项目不需要构建。

### 方式二：保留当前仓库中的 website 子目录

将 `website/` 保持原样，然后将 `website/.github/workflows/deploy-pages.yml` **复制到仓库根目录的** `.github/workflows/deploy-pages.yml`。GitHub 只识别根目录下的工作流。之后按上面的步骤将 Pages 的 Source 设为 GitHub Actions。

工作流会自动检测 `website/index.html` 并只上传 `website/` 作为站点内容。若直接把网站内容放在仓库根目录，它会自动使用根目录。默认监听 `main`、`master`；使用其他分支时修改工作流中的 `branches`。

部署配置依据 [GitHub Pages 官方自定义工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)；分支发布参见 [发布源设置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本次仅创建本地文件，未上传或发布。

## 页面内容与交互

- 模板式居中项目标题、七位作者及三家机构信息、论文入口、完整摘要和研究简介。作者顺序为 Yunfei Feng、Chunyi Li、Shengyu Guo、Rui Qing、Jianbo Zhang、Zicheng Zhang、Xiaohong Liu；Chunyi Li、Shengyu Guo、Zicheng Zhang 属于 Shanghai AI Lab，Xiaohong Liu 属于 Shanghai Innovative Institute，其余三位属于 Shanghai Jiao Tong University。
- Figure 1：桌面端采用左图右文布局，图片宽度限制为 430px；右侧展示研究问题、choice / judgment 对比及一组来自主结果表的结果。移动端自动纵向排列，保留图片放大和 PDF 下载。
- Figure 2：基准构成、三种场景、匹配评测及结构化审计。
- 三种场景、三级难度的可切换示意。示意明确标注为 schematic，不是原始实验轨迹或模型预测。
- **主结果表（当前本地 arXiv 稿件编号 Table 3）：全部 14 个模型与 Random，共 20 列。** 逐项同步 `tables/main_results.tex` 的 277 个百分比数值与 8 个未审计单元格：Choice S1 / S2 / S3 / Avg. / APR / LAA；Judgment S1 / S2 / S3 / Avg. / Self / Non-self / APR / LAA；Logic Audit S1 / S2 / S3 / All；跨格式 PTC。保留论文的最佳和次佳标记。支持按 Choice / Judgment 平均准确率、Non-self recall、两种格式的 LAA、Logic Audit All 或 PTC 排序，Random 始终置于末尾。表格支持横向滚动并固定模型名，表下说明 APR、LAA、item accuracy 与 PTC 的统计定义。
- **Figure 4：四个代表模型的难度变化趋势图，含误差条。**
- `visuoself_radar_levels.pdf`：三级难度及其平均的分场景雷达图。该图的代表模型与 Figure 4 不完全相同，页面分别说明。
- 四张图均支持键盘可访问的放大弹窗、进一步缩放、Esc 关闭，以及原始 PDF 查看。弹窗关闭后焦点回到原图。
- GitHub 项目按钮与资源入口：<https://github.com/Imagineer-Feng/VisuoSelf>。
- 主结果表 / 雷达图数据下载、BibTeX 下载与复制、作者联系邮箱。
- 移动端布局、横向滚动表格、减少动态效果偏好、打印样式与跳转到正文链接。

## 文件结构

```text
website/
├── index.html
├── styles.css
├── script.js
├── README.md
├── THIRD_PARTY_NOTICES.md
├── .nojekyll
├── .github/workflows/deploy-pages.yml
└── assets/
    ├── favicon.svg
    ├── visuoself.bib
    ├── fonts/          # 本地 Lato 字体和授权说明
    ├── images/         # 四张图的高清 WebP 和首图小尺寸版本
    ├── pdf/            # 四张原始图 PDF；论文入口预留 visuoself-paper.pdf
    ├── vendor/         # 模板基础样式、Bulma 和对应来源/许可证
    └── data/           # 主结果表、雷达图的 CSV / JSON
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
| 主结果表 HTML、`assets/data/main-results.csv` / `.json` | `cvpr2026/arxiv/tables/main_results.tex`，标签 `tab:main-results`，逐项提取并与 `analysis/experiment_summary.json` 核对 |
| 雷达图 CSV / JSON | `figure/visuoself_radar_levels.csv` / `.json`，网站 JSON 仅保留展示所需字段 |

四张图的 PDF 原件按字节复制，未修改。WebP 展示图只裁去 PDF 白边并转换格式。Figure 2 按要求保留原始图，其中 Scene 3 审计框的文字在当前论文正文中已修正为“exact lag in steps”；网页图注与场景说明使用正确的整数延迟审计定义。

主表编号以当前稿件为准：本地 PDF 的 Table 2 是数据验证覆盖表，模型主结果表是第 6 页的 Table 3。下载文件使用稳定名称 `main-results.csv` / `.json`，JSON 中记录当前表号、来源与 SHA-256；旧 `table4.csv` / `.json` 保留为相同内容的兼容副本，已有下载 URL 仍可使用。数值采用原稿同样的百分比四舍五入规则 `ROUND_HALF_UP`。Random 的未审计字段在网页显示为破折号、在 JSON 中为 `null`、在 CSV 中留空，保留其实际 PTC 13.3%。

后续更新时：

- **论文**：替换 `assets/pdf/visuoself-paper.pdf`。
- **项目仓库**：已在 `index.html` 顶部和资源区加入 `https://github.com/Imagineer-Feng/VisuoSelf`；后续变更地址时同步修改这两处。
- **arXiv 链接**：确认真实地址后，在 `index.html` 的按钮或资源区添加。当前没有填写未经确认的 arXiv 编号。
- **引用**：同步修改 `index.html` 中的 BibTeX 和 `assets/visuoself.bib`。当前引用为 2026 年 project manuscript，没有推定会议接收情况或 DOI。
- **主结果表**：以 `cvpr2026/arxiv/tables/main_results.tex` 为展示数值与排名标记的来源，同步更新 HTML、`assets/data/main-results.csv` / `.json` 及旧名兼容副本 `table4.csv` / `.json`。排序读取 `<tr>` 的 `data-choice`、`data-judgment`、`data-nonself`、`data-choice-laa`、`data-judgment-laa`、`data-audit` 和 `data-ptc`；更新数值时需同步这些属性。Logic Audit All 按必需审计项数加权，不对三个场景百分比求平均；未审计字段保留空值。
- **图形**：替换对应 PDF 与 WebP；图片尺寸改变时同步修改 HTML 的 `width` / `height`。三张用户指定 PDF 和 Figure 4 均已随站点附上。

网站模板和改编布局采用 CC BY-SA 4.0，Bulma 采用 MIT，本地 Lato 字体遵循 SIL Open Font License。详见 `THIRD_PARTY_NOTICES.md` 及对应本地许可文件。论文、插图与结果数据的权利归原作者；此页面未额外为研究材料指定开源许可。
