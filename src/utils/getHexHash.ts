
import CryptoJS from 'crypto-js';

function getHexHash(hashContext: CryptoJS.lib.WordArray | string, cfg?: object) {
    console.log(cfg);
    return CryptoJS.MD5(hashContext).toString();
}

export default getHexHash;

