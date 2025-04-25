import { GM_xmlhttpRequest, GM_log, GM_download } from "$";
import getBVNumber from "./getBVNumber";
import GLOBAL_CONFIG from "@/global.config"
import getHexHash from "./getHexHash";

async function download(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        GM_download({
            url,
            name: `B站视频_${Date.now()}.mp4`,
            saveAs: false,
            conflictAction: 'uniquify',
            timeout: 1000 * 60 * 30,
            onload: function () {
                resolve(true)
            },
            onerror: function (e) {
                /**
                * * Error reason
                * - `not_enabled` - the download feature isn't enabled by the user
                * - `not_whitelisted` - the requested file extension is not
                *   whitelisted id
                * not give the downloads permission
                * - `not_supported` - the download feature isn't supported by the
                * browser/version
                * - `not_succeeded` - the download wasn't started or failed, the
                 */
                if (e.error === 'not_permitted' || e.error === 'not_whitelisted' || e.error === 'not_enabled') {
                    GM_log('Error: 没有下载权限')
                    console.info('Error: 没有下载权限');
                } else if (e.error === 'not_supported') {
                    GM_log('Error: 没有下载权限')
                    console.info('Error: 用户浏览器不支持的类型');
                } else {
                    GM_log('Error: 下载失败, ' + e.details)
                    console.info('Error: 下载失败');
                }
                reject(false)
            }
        })
    })

}


// 处理下载逻辑
//备用方法
const handleDownload = async () => {
    try {
        let bvUrl = getBVNumber(window.location.href)
        if (!bvUrl) {
            //使用方案B获取
            GM_log("获取BV号失败, 尝试方案B获取");
            bvUrl = ""
        }
        const downloadUrlArr = await getDownloadUrl(bvUrl);


        if (downloadUrlArr && Array.isArray(downloadUrlArr)) {
            const downloadAsync = downloadUrlArr.map((val) => download(val))
            const result = Promise.allSettled(downloadAsync)
        }

    } catch (error) {
        //@ts-ignore
        alert('下载失败: ' + error.message);
    }
};
type ResponseType = string[] | Error;
// 获取下载地址
const getDownloadUrl = (url: string): Promise<ResponseType> => {
    return new Promise((resolve, reject) => {
        const now = Date.now();

        const hashContext = url + "zh" + now + "6HTugjCXxR"
        const hash = getHexHash(hashContext);
        GM_xmlhttpRequest({
            method: 'POST',
            url: GLOBAL_CONFIG.API_ENDPOINT,
            headers: {
                'accept': '*/*',
                'accept-language': 'zh',
                'content-type': 'application/json',
                'G-Footer': hash,
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
            },
            data: JSON.stringify({ link: url }),
            responseType: 'json',
            onload: (res) => {
                if (res.status === 200) {
                    // 需要根据实际API响应结构调整
                    const data = res.response as SNAPResponse;
                    if (data.medias && data.medias.length > 0) {
                        const ret = data.medias.map((val) => val.resourceUrl);
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
            onerror: (err) => reject(err)
        });
    });
};