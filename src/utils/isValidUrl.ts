function isValidUrl(url: string): boolean {
    try {
        // const pattern = new RegExp(
        //     '^' + // 开始于
        //     '(https?:\\/\\/)?' + // 协议：http或https
        //     '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // 域名
        //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // 或者IP地址
        //     '(\\:\\d+)?' + // 端口号
        //     '(\\/[-a-zA-Z\\d%_.~+]*)*' + // 路径
        //     '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 查询字符串
        //     '(\\#[-a-zA-Z\\d_]*)?' + // 锚点
        //     '$' // 结束于
        //     , 'i'); // 不区分大小写

        // const ret = pattern.test(url);
        // if (!ret) return ret;
        const uri = new URL(url);
        return !!uri;
    } catch (error) {
        return false;
    }
}


export default isValidUrl;


// 创建隐藏下载链接
// const a = document.createElement('a');
// a.href = downloadUrl;
// a.setAttribute("href", downloadUrl)
// a.download = `B站视频_${Date.now()}.mp4`;
// a.style.display = 'none';
// document.body.appendChild(a);
// a.click();
// document.body.removeChild(a);




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