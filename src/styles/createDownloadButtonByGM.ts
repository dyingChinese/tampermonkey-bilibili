import { GM_addElement } from "$";
type CustomMouseEvent = (ev: MouseEvent) => any

function addDownloadButtonByGM(parentNode: Element, clickEvent?: CustomMouseEvent): void;



function addDownloadButtonByGM(parentNode: Element, clickEvent?: CustomMouseEvent): void {
    if (!parentNode) return;
    const divAttributes = { class: 'toolbar-item download-btn toolbar-left-item-wrap', "data-v-0bc28ce4": "" };
    var btn = GM_addElement(parentNode, 'div', divAttributes);
    btn.innerHTML = `
            <div class="video-toolbar-download video-download-wrap video-toolbar-left-item" title="下载">
                <svg class="download-icon" width="28" height="28" viewBox="0 0 28 28" fill="currentColor" class="video-download-icon video-toolbar-item-icon">
                    <path d="M14 2.5a1.5 1.5 0 0 1 1.5 1.5v11.379l2.44-2.439a1.5 1.5 0 1 1 2.122 2.122l-5 5a1.5 1.5 0 0 1-2.122 0l-5-5a1.5 1.5 0 1 1 2.122-2.122L12.5 15.38V4a1.5 1.5 0 0 1 1.5-1.5Z"></path>
                    <path d="M4.5 18.5a1.5 1.5 0 0 1 1.5 1.5v3.5h16.5V20a1.5 1.5 0 0 1 3 0v4a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 24v-4a1.5 1.5 0 0 1 1.5-1.5Z"></path>
                </svg>
                <span class="btn-text">下载</span>
            </div>
    `
    if (clickEvent) {
        btn.onclick = clickEvent;
    }
    return;
};

export default addDownloadButtonByGM;