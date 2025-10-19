# Tab URL Saver

Chrome拡張機能 - 開いているタブのURL、タイトル、Favicon、ページメタ情報をマークダウン形式でエクスポート

## 特徴

- 📑 **マークダウン形式でエクスポート** - タブ情報を読みやすいマークダウン(.md)ファイルで保存
- 🌐 **豊富なメタ情報** - Open Graph、Twitter Card、meta descriptionなどを自動取得
- 🎯 **柔軟な保存オプション** - 現在のウィンドウまたは全てのタブを選択可能
- 🖼️ **Faviconも保存** - 各ページのFaviconを画像として含める
- 🚀 **シンプルなUI** - ワンクリックで簡単にエクスポート

## インストール方法

### 開発版（デベロッパーモード）

1. このリポジトリをクローン
   ```bash
   git clone <repository-url>
   cd ChromeExt01
   ```

2. Chromeで `chrome://extensions/` を開く

3. 右上の「デベロッパーモード」を有効化

4. 「パッケージ化されていない拡張機能を読み込む」をクリック

5. このプロジェクトのディレクトリを選択

## 使い方

1. Chromeツールバーの拡張機能アイコンをクリック

2. 以下のいずれかを選択：
   - **現在のウィンドウのタブを保存** - アクティブなウィンドウのタブのみ保存
   - **全てのタブを保存** - 全ウィンドウの全タブを保存

3. 保存場所を選択してファイルを保存

## エクスポート内容

マークダウンファイルには以下の情報が含まれます：

- エクスポート日時
- 総タブ数
- 各タブごとに：
  - ページタイトル
  - URL（クリック可能なリンク）
  - Favicon
  - ページ説明文
  - キーワード
  - 著者情報
  - OG画像
  - コンテンツタイプ

### エクスポート例

```markdown
# Tab URLs Export

**Export Date:** 2025/1/15 10:30:45
**Total Tabs:** 5

---

## GitHub - Example Repository

[https://github.com/example/repo](https://github.com/example/repo)

![favicon](https://github.com/favicon.ico)

Example repository for demonstration purposes

**Keywords:** github, repository, example

**Author:** Example User

---
```

## 技術仕様

- **Manifest Version:** 3
- **対応ブラウザ:** Google Chrome, Microsoft Edge（Chromiumベース）
- **使用API:**
  - `chrome.tabs` - タブ情報の取得
  - `chrome.downloads` - ファイルのダウンロード
  - `chrome.scripting` - コンテンツスクリプトの実行
  - `chrome.runtime` - メッセージング

## プロジェクト構造

```
ChromeExt01/
├── manifest.json      # 拡張機能の設定
├── popup.html         # ポップアップUI
├── popup.js           # UIロジック
├── content.js         # メタ情報抽出
├── icons/             # アイコン
└── README.md          # このファイル
```

## 開発

### コード変更後の反映方法

- `popup.html`, `popup.js`: ポップアップを閉じて再度開く
- `content.js`: タブをリロード
- `manifest.json`: 拡張機能を `chrome://extensions/` で再読み込み

## 制限事項

- `chrome://`, `edge://`, `about:` などのブラウザ内部ページはメタ情報を取得できません
- コンテンツスクリプトが実行できないページでは一部の情報が取得できない場合があります

## ライセンス

MIT

## 作成者

azu
