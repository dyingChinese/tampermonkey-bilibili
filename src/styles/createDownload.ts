// 创建下载按钮

import GLOBAL_CONFIG from "@/global.config";

type CustomMouseEvent = (this: void, ev?: MouseEvent) => any;

function createDownloadButton(): HTMLDivElement;
function createDownloadButton(clickEvent?: CustomMouseEvent): HTMLDivElement;


function createDownloadButton(clickEvent?: CustomMouseEvent): HTMLDivElement {
    const btn = document.createElement('div');
    btn.className = 'toolbar-item download-btn toolbar-left-item-wrap';
    btn.id = GLOBAL_CONFIG.BUTTON_ID

    btn.innerHTML = `
            <div class="video-toolbar-download video-download-wrap video-toolbar-left-item" title="下载">
                <svg class="download-icon" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" class="video-download-icon video-toolbar-item-icon">
                    <path d="M14 2.5a1.5 1.5 0 0 1 1.5 1.5v11.379l2.44-2.439a1.5 1.5 0 1 1 2.122 2.122l-5 5a1.5 1.5 0 0 1-2.122 0l-5-5a1.5 1.5 0 1 1 2.122-2.122L12.5 15.38V4a1.5 1.5 0 0 1 1.5-1.5Z"></path>
                    <path d="M4.5 18.5a1.5 1.5 0 0 1 1.5 1.5v3.5h16.5V20a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 24v-4a1.5 1.5 0 0 1 1.5-1.5Z"></path>
                </svg>
                <span class="btn-text">下载</span>
            </div>
        `;

    if (clickEvent) {
        btn.onclick = clickEvent;
    }
    return btn;
};

export default createDownloadButton;