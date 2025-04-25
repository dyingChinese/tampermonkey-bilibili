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




