import { GM_xmlhttpRequest, GM_log, GM_download, GM_notification } from "$";
import getBVNumber from "./getBVNumber";
import GLOBAL_CONFIG from "@/global.config"
import getHexHash from "./getHexHash";


// 统一错误处理
export const handleError = (message: string, details?: string) => {
    const fullMessage = details ? `${message}: ${details}` : message;
    GM_log(fullMessage);
    console.error(fullMessage);
};

// 下载函数
export const download = (url: string, filename?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const defaultName = `B站视频_${Date.now()}.mp4`;
        GM_download({
            url,
            name: filename || defaultName,
            saveAs: true,
            conflictAction: 'uniquify',
            timeout: 1000 * 60 * 30, // 30分钟
            onload: () => resolve(),
            onprogress: (ev) => {
                // progress对象包含以下属性：
                // - done：已下载的字节数
                // - total：总字节数
                // - lengthComputable：是否可以计算总大小

                if (ev.lengthComputable) {
                    const percent = (ev.done / ev.total) * 100;
                    console.log(`下载进度：${percent.toFixed(2)}%`);

                    // 这里你可以更新你的进度条显示
                    // 例如，如果你有一个HTML元素显示进度，你可以这样更新它：
                    // document.getElementById('progressBar').style.width = `${percent}%`;
                }
            },
            onerror: (e) => {
                const { error, details } = e;
                const errorMap: Record<string, string> = {
                    'not_enabled': '下载功能未启用',
                    'not_whitelisted': '文件类型不在白名单中',
                    'not_supported': '浏览器不支持下载功能',
                    'not_permitted': '没有下载权限',
                    'not_succeeded': '下载启动失败'
                };

                const message = errorMap[error] || '未知下载错误';
                handleError(message, details);
                reject(new Error(message));
            },
            ontimeout: () => {
                const message = `下载超时（30分钟）`;
                handleError(message);
                reject(new Error(message));
            }
        });
    });
};



// 处理下载逻辑
//备用方法
// 优化后的处理下载逻辑
export const handleDownload = async () => {
    try {
        // 改进BV号获取逻辑
        const bvNumber = getBVNumber(window.location.href) //  || alternativeBVGetMethod();
        if (!bvNumber) {
            throw new Error('无法获取视频BV号');
        }

        const downloadUrls = await getDownloadUrl(bvNumber);
        if (!downloadUrls?.length) {
            throw new Error('未找到可下载资源');
        }

        // 并行下载处理
        const downloadPromises = downloadUrls.map((url, index) =>
            download(url, `B站视频_${bvNumber}_${index + 1}.mp4`)
        );

        const results = await Promise.allSettled(downloadPromises);

        // 处理下载结果
        const failedCount = results.filter(r => r.status === 'rejected').length;
        if (failedCount > 0) {
            throw new Error(`${failedCount}/${downloadUrls.length} 个文件下载失败`);
        }

        showUserFeedback('success', '所有视频下载完成！');
    } catch (error) {
        const message = error instanceof Error ? error.message : '未知错误';
        showUserFeedback('error', `下载失败: ${message}`);
    }
};


// 用户反馈统一处理
export const showUserFeedback = (type: 'success' | 'error', message: string) => {
    // 替换为更优雅的UI提示，例如使用浮动通知而不是alert
    const style = type === 'error' ? 'color: red;' : 'color: green;';
    console.log(`%c${message}`, style);
};




// 获取下载地址
export const getDownloadUrl = async (bvNumber: string): Promise<string[]> => {
    /**
     * 原始代码示例
     * @example
     *  let m = Date.now()
     * , b = {
     *  "Content-Type": "application/json"
     *   };
     *  b[x.$Q] = w.locale,
     *  b[x.ZH] = String(m),
     *  b[x.$Z] = p()(a + w.locale + m + u.qc);
     * 
     * @example
     *  a = "http://blblb/BVHBUISH"
     *  w = {
     *      "locale": "zh",
     *      "site": "bilibili"
     *  };
     *  u = {
     *      n: {
     *          en: "English",
     *          zh: "简体中文",
     *          ja: "日本語",
     *          es: "Espa\xf1ol"
     *      },
     *      a: {
     *          name: "SnapAny",
     *          url: "https://snapany.com",
     *          email: "snapany@icloud.com",
     *          ogImage: "/images/og.png",
     *          socials: {
     *              telegram: "https://t.me/snapany_app",
     *              discord: "https://discord.gg/dbKP6FKfvx"
     *          }
     *      },
     *      t: {
     *          locales: ["en", "zh", "ja", "es"],
     *          defaultLocale: "en",
     *          localePrefix: "as-needed"
     *      },
     *      u: "6HTugjCXxR",
     *      c: "https://api.snapany.com"
     *  }
     * }
     */
    return new Promise((resolve, reject) => {
        const now = Date.now();
        const url = GLOBAL_CONFIG.BIBI_HOST + `/${bvNumber}/`
        const hashContext = url + "zh" + now + "6HTugjCXxR";

        // 统一请求头配置
        const headers = {
            'accept': '*/*',
            'accept-language': 'zh',
            'content-type': 'application/json',
            'G-Footer': getHexHash(hashContext),
            "G-Timestamp": now.toString(),
            'origin': 'https://snapany.com',
            'Dnt': '1',
            'Pragma': 'no-cache',
            'Priority': 'u=1, i',
            'Sec-Gpc': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Accept-Language': 'zh',
            'Referer': 'https://snapany.com/',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'Content-Type': 'application/json'
        };

        try {
            GM_xmlhttpRequest({
                method: 'POST',
                url: GLOBAL_CONFIG.API_ENDPOINT,
                headers,
                data: JSON.stringify({ link: url }),
                responseType: 'json',
                onload: (res) => {
                    if (res.status === 200) {
                        // 需要根据实际API响应结构调整
                        const data = res.response as SNAPResponse;
                        if (data.medias && data.medias.length > 0) {
                            const ret = data.medias.map((val) => val.resourceUrl);
                            const previewImg = data.medias[0].previewUrl;
                            resolve(ret);
                        } else {
                            reject(new Error('未找到下载链接'));
                        }
                    } else if (res.status = 400) {
                        const data = res.response as SNAPResponseError;
                        if (data.message) {
                            reject(new Error(data.message))
                        }
                        reject(new Error('API请求失败' + data.message));
                    }
                    else {
                        reject(new Error(`API请求失败: ${res.status}`));
                    }
                },
                onerror: (err) => reject(err),
                ontimeout: () => reject(new Error('请求超时'))
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : 'API请求失败';
            reject(new Error(`获取下载地址失败: ${message}`));
        }
    })

};

export default {
    handleError, download, handleDownload, showUserFeedback, getDownloadUrl
}