import isValidUrl from "./isValidUrl";


function getBVNumber(uri: string): string | undefined {
    if (!isValidUrl(uri)) throw new Error("不是合法的链接");
    const reg = /BV[\w]+/
    const url = new URL(uri);
    const BV = url.pathname.split('/').find((val) => reg.exec(val))
    return BV;
}


export default getBVNumber;