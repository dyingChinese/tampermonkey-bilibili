import { describe, it, expect } from 'vitest';
import getBVNumber from '@/utils/getBVNumber'; // 替换为你的函数文件路径

describe('getBVNumber', () => {
    it('should extract BV number from a valid URL', () => {
        const url = 'https://example.com/video/BV1mk5Qz1EAa/';
        const bvNumber = getBVNumber(url);
        expect(bvNumber).toBe('BV1mk5Qz1EAa');
    });

    it('should return undefined if no BV number is present', () => {
        const url = 'https://example.com/video/AV1mk5Qz1EAa/';
        const bvNumber = getBVNumber(url);
        expect(bvNumber).toBeUndefined();
    });

    it('should handle empty URL', () => {
        const url = '';
        const bvNumber = () => getBVNumber(url);
        expect(bvNumber).toThrowError("不是合法的链接");
    });

    it('should handle invalid URL', () => {
        const url = 'not-a-valid-url';
        const bvNumber = () => getBVNumber(url);
        expect(bvNumber).toThrowError("不是合法的链接");
    });


    it('should extract BV number from a valid URL', () => {
        const url = 'https://www.bilibili.com/video/BV1mk5Qz1EAa/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=0ba0117264cf06624bb877b37e922f00';
        const bvNumber = getBVNumber(url);
        expect(bvNumber).toBe("BV1mk5Qz1EAa");
    });
});
