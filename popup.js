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
  
  function saveTabsToFile(tabs, filePrefix) {
    try {
      // ファイル内容を生成
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const content = generateTabsContent(tabs);
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
      content += `\n`;
    });

    return content;
  }
  
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = type === 'error' ? '#fce8e6' : '#e8f5e8';
    statusDiv.style.color = type === 'error' ? '#d93025' : '#137333';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
});