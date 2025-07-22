# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

このリポジトリはChrome拡張機能プロジェクトです。

## 開発コマンド

現在、このプロジェクトは初期化段階にあります。一般的なChrome拡張機能開発では以下のコマンドが使用されます：

- `npm install` - 依存関係のインストール
- `npm run build` - 拡張機能のビルド
- `npm run dev` - 開発モードでの実行
- `npm run lint` - コードの静的解析
- `npm test` - テストの実行

## アーキテクチャ

Chrome拡張機能の一般的な構造：

- `manifest.json` - 拡張機能のメタデータと設定
- `src/` - ソースコードディレクトリ
  - `background/` - バックグラウンドスクリプト
  - `content/` - コンテンツスクリプト
  - `popup/` - ポップアップUI
  - `options/` - オプションページ
- `public/` - 静的ファイル（アイコン、HTML等）
- `dist/` - ビルド成果物

## 注意事項

- Chrome拡張機能のManifest V3に対応した開発を行う
- セキュリティポリシー（CSP）を考慮したコード記述
- Chrome APIの適切な使用と権限管理