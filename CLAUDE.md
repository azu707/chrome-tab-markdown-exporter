# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**Tab URL Saver** - Chrome拡張機能

開いているタブのURL、タイトル、Favicon、ページメタ情報をマークダウン形式でエクスポートする拡張機能です。

### 主な機能

- 現在のウィンドウまたは全てのタブを保存
- マークダウン形式(.md)でエクスポート
- ページメタ情報の取得と保存
  - Open Graph (OG) タグ
  - Twitter Card
  - meta description, keywords, author
- Faviconの表示

## プロジェクト構造

```
ChromeExt01/
├── manifest.json      # 拡張機能のメタデータと設定（Manifest V3）
├── popup.html         # ポップアップUIのHTML
├── popup.js           # ポップアップUIのロジック
├── content.js         # コンテンツスクリプト（メタ情報抽出）
├── icons/             # 拡張機能のアイコン
│   ├── icon-16.png
│   ├── icon-48.png
│   ├── icon-64.png
│   └── icon-128.png
└── package.json       # プロジェクト設定
```

## 開発ガイド

### Chrome拡張機能の読み込み

1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このプロジェクトのディレクトリを選択

### コード変更後の反映

- `popup.html`, `popup.js` の変更: ポップアップを閉じて再度開く
- `content.js` の変更: タブをリロード
- `manifest.json` の変更: 拡張機能を再読み込み

## 技術仕様

### 使用しているChrome API

- `chrome.tabs` - タブ情報の取得
- `chrome.downloads` - ファイルのダウンロード
- `chrome.scripting` - コンテンツスクリプトの実行
- `chrome.runtime` - メッセージング

### エクスポートフォーマット

マークダウンファイルには以下の情報が含まれます：

- エクスポート日時
- 総タブ数
- 各タブの情報：
  - タイトル（見出し）
  - URL（リンク形式）
  - Favicon（画像）
  - 説明文
  - キーワード
  - 著者
  - OG画像
  - コンテンツタイプ

## 注意事項

- Chrome拡張機能のManifest V3に準拠
- `chrome://`, `edge://`, `about:` などの特殊なURLはメタ情報の取得をスキップ
- コンテンツスクリプトの実行にはページの読み込み完了が必要
- ファイル名にはタイムスタンプが含まれる（例: `current-window-tabs_2025-01-15T10-30-45.md`）