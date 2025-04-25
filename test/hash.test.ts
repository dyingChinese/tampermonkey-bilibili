import { describe, it, expect } from 'vitest';
import getHexHash from '@/utils/getHexHash'; // 确保路径正确
import CryptoJS from 'crypto-js';

describe('getHexHash', () => {
    it('should return correct SHA-256 hash for string input', () => {
        const input = 'https://www.bilibili.com/video/BV1mk5Qz1EAa/?share_source=copy_web&vd_source=06fdb00b5f8712d510295101a6adefe6zh17455368732146HTugjCXxR';
        expect(getHexHash(input)).toBe("fd31dc9ee2b8ad2e772c78829fb4f892");
    });

    it('should return correct SHA-256 hash for string input', () => {
        const input = 'https://www.bilibili.com/video/BV12x411y7sN/?share_source=copy_web&vd_source=06fdb00b5f8712d510295101a6adefe6zh17455471935806HTugjCXxR';
        expect(getHexHash(input)).toBe("5cfdfa3ddc6d6518cd8bc3bd6669cecc");
    });

    it('should return correct SHA-256 hash for empty string', () => {
        const input = '';
        const expectedHash = CryptoJS.MD5(input).toString()
        expect(getHexHash(input)).toBe(expectedHash);
    });

    it('should return correct SHA-256 hash for empty string', () => {
        const input = '123456';
        const expectedHash = CryptoJS.MD5(input).toString();
        expect(getHexHash(input)).toBe(expectedHash);
    });


    it('should return correct SHA-256 hash for string input', () => {
        const input = '123456';
        expect(getHexHash(input)).toBe("e10adc3949ba59abbe56e057f20f883e");
    });


    it('should return different hashes for different inputs', () => {
        const input1 = 'string1';
        const input2 = 'string2';
        const hash1 = getHexHash(input1);
        const hash2 = getHexHash(input2);
        expect(hash1).not.toBe(hash2);
    });




    // 如果cfg参数实际被使用，添加相应的测试用例
    // it('should handle cfg object correctly', () => {
    //   const input = 'testString';
    //   const cfg = { someConfig: 'value' };
    //   // 根据cfg的实际使用情况编写测试
    // });
});

