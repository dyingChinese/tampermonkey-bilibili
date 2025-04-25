// @ts-ignore isolatedModules
'use strict';

import GLOBAL_CONFIG from "./global.config";
import addNodeLocation from "./styles/addNodeLocation";
import createDownloadButton from "./styles/createDownload";
import { handleDownload } from "./utils/handleDownload";
import waitForElement from "./utils/waitForElement";


/**
 * #arc_toolbar_report
 * ---.video-toolbar-left
 *    |-- .video-toolbar-left-main
 *        |---- .toolbar-left-item-wrap
 *        |---- .toolbar-left-item-wrap
 *        |---- .toolbar-left-item-wrap
 *        |---- .toolbar-left-item-wrap
 * ---.video-toolbar-right
 *    |-- 省略
 * 
 * 
 */
const Bilibili_Video_Tools = "#arc_toolbar_report";


async function main() {
    /** 是否进入视频页面 */
    const dom = await waitForElement(Bilibili_Video_Tools);
    if (!dom) return;

    const bilibili_toolbar_dom = await waitForElement('#arc_toolbar_report > .video-toolbar-left > .video-toolbar-left-main');
    if (!bilibili_toolbar_dom) return;

    // 防止重复添加
    if (document.querySelector(`#${GLOBAL_CONFIG.BUTTON_ID}`)) return;

    try {
        const insertLocation = addNodeLocation(bilibili_toolbar_dom);
        const downloadBtn = createDownloadButton(handleDownload);
        bilibili_toolbar_dom.insertBefore(downloadBtn, insertLocation);
    } catch (error) {
        console.log();
    }
}

main()


