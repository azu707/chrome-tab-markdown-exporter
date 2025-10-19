document.addEventListener('DOMContentLoaded', function() {
  const saveAllTabsButton = document.getElementById('saveAllTabs');
  const saveCurrentWindowButton = document.getElementById('saveCurrentWindow');
  const statusDiv = document.getElementById('status');
  const tabCountDiv = document.getElementById('tabCount');
  
  // タブ数を表示
  updateTabCount();
  
  // 全てのタブを保存
  saveAllTabsButton.addEventListener('click', function() {
    chrome.tabs.query({}, function(tabs) {
      saveTabsToFile(tabs, 'all-tabs');
    });
  });
  
  // 現在のウィンドウのタブを保存
  saveCurrentWindowButton.addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      saveTabsToFile(tabs, 'current-window-tabs');
    });
  });
  
  function updateTabCount() {
    chrome.tabs.query({}, function(allTabs) {
      chrome.tabs.query({currentWindow: true}, function(currentWindowTabs) {
        tabCountDiv.textContent = `全タブ数: ${allTabs.length} | 現在のウィンドウ: ${currentWindowTabs.length}`;
      });
    });
  }
  
  async function saveTabsToFile(tabs, filePrefix) {
    try {
      showStatus('メタ情報を取得中...', 'info');

      // 各タブからメタ情報を取得
      const tabsWithMetadata = await Promise.all(
        tabs.map(async (tab) => {
          try {
            // chrome:// や edge:// などの特殊なURLはスキップ
            if (tab.url.startsWith('chrome://') ||
                tab.url.startsWith('edge://') ||
                tab.url.startsWith('about:')) {
              return { ...tab, metadata: null };
            }

            // タブにメッセージを送ってメタデータを取得
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'getMetadata' });
            return { ...tab, metadata: response.metadata };
          } catch (error) {
            // メタデータ取得に失敗した場合はnullを設定
            console.log(`Tab ${tab.id} metadata fetch failed:`, error);
            return { ...tab, metadata: null };
          }
        })
      );

      // ファイル内容を生成
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const content = generateTabsContent(tabsWithMetadata);
      const filename = `${filePrefix}_${timestamp}.md`;

      // Blobを作成してダウンロード
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      }, function(downloadId) {
        if (chrome.runtime.lastError) {
          showStatus('エラー: ' + chrome.runtime.lastError.message, 'error');
        } else {
          showStatus(`${tabs.length}個のタブを保存しました`, 'success');
          // ダウンロード完了後にURLを解放
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      });
    } catch (error) {
      showStatus('エラー: ' + error.message, 'error');
    }
  }
  
  function generateTabsContent(tabs) {
    const timestamp = new Date().toLocaleString('ja-JP');
    let content = `# Tab URLs Export\n\n`;
    content += `**Export Date:** ${timestamp}  \n`;
    content += `**Total Tabs:** ${tabs.length}\n\n`;
    content += `---\n\n`;

    tabs.forEach((tab, index) => {
      content += `## ${index + 1}. ${tab.title}\n\n`;
      content += `- **URL:** [${tab.url}](${tab.url})\n`;
      content += `- **Window ID:** ${tab.windowId}\n`;

      if (tab.favIconUrl) {
        content += `- **Favicon:** ![favicon](${tab.favIconUrl})\n`;
      }

      // メタ情報を追加
      if (tab.metadata) {
        const meta = tab.metadata;

        // 説明文（優先順位: OG > meta description > Twitter）
        const description = meta.ogDescription || meta.description || meta.twitterDescription;
        if (description) {
          content += `- **Description:** ${description}\n`;
        }

        // キーワード
        if (meta.keywords) {
          content += `- **Keywords:** ${meta.keywords}\n`;
        }

        // 著者
        if (meta.author) {
          content += `- **Author:** ${meta.author}\n`;
        }

        // OG画像
        if (meta.ogImage) {
          content += `- **OG Image:** ![og-image](${meta.ogImage})\n`;
        }

        // コンテンツタイプ
        if (meta.ogType) {
          content += `- **Type:** ${meta.ogType}\n`;
        }
      }

      content += `\n`;
    });

    return content;
  }
  
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';

    if (type === 'error') {
      statusDiv.style.backgroundColor = '#fce8e6';
      statusDiv.style.color = '#d93025';
    } else if (type === 'success') {
      statusDiv.style.backgroundColor = '#e8f5e8';
      statusDiv.style.color = '#137333';
    } else {
      // info
      statusDiv.style.backgroundColor = '#e8f0fe';
      statusDiv.style.color = '#1967d2';
    }

    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
});