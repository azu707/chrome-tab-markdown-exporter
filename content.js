// ページのメタ情報を抽出する関数
function extractPageMetadata() {
  const metadata = {
    description: '',
    keywords: '',
    author: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: ''
  };

  // meta descriptionを取得
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    metadata.description = descriptionMeta.getAttribute('content') || '';
  }

  // keywordsを取得
  const keywordsMeta = document.querySelector('meta[name="keywords"]');
  if (keywordsMeta) {
    metadata.keywords = keywordsMeta.getAttribute('content') || '';
  }

  // authorを取得
  const authorMeta = document.querySelector('meta[name="author"]');
  if (authorMeta) {
    metadata.author = authorMeta.getAttribute('content') || '';
  }

  // Open Graph (OG) タグを取得
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    metadata.ogTitle = ogTitleMeta.getAttribute('content') || '';
  }

  const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionMeta) {
    metadata.ogDescription = ogDescriptionMeta.getAttribute('content') || '';
  }

  const ogImageMeta = document.querySelector('meta[property="og:image"]');
  if (ogImageMeta) {
    metadata.ogImage = ogImageMeta.getAttribute('content') || '';
  }

  const ogTypeMeta = document.querySelector('meta[property="og:type"]');
  if (ogTypeMeta) {
    metadata.ogType = ogTypeMeta.getAttribute('content') || '';
  }

  // Twitter Cardタグを取得
  const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitleMeta) {
    metadata.twitterTitle = twitterTitleMeta.getAttribute('content') || '';
  }

  const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescriptionMeta) {
    metadata.twitterDescription = twitterDescriptionMeta.getAttribute('content') || '';
  }

  const twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
  if (twitterImageMeta) {
    metadata.twitterImage = twitterImageMeta.getAttribute('content') || '';
  }

  return metadata;
}

// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMetadata') {
    const metadata = extractPageMetadata();
    sendResponse({ metadata: metadata });
  }
  return true; // 非同期レスポンスを有効にする
});
