import { describe, it, expect } from 'vitest';
import isValidUrl from "@/utils/isValidUrl"; // 替换为你的函数文件路径

describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
        expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid HTTPS URLs', () => {
        expect(isValidUrl('https://example.com')).toBe(true);
    });

    it('should return true for valid URLs with paths', () => {
        expect(isValidUrl('https://example.com/path/to/resource')).toBe(true);
    });

    it('should return true for valid URLs with query strings', () => {
        expect(isValidUrl('https://example.com?query=string')).toBe(true);
    });

    it('should return true for valid URLs with fragments', () => {
        expect(isValidUrl('https://example.com#fragment')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
        expect(isValidUrl('not-a-valid-url')).toBe(false);
    });

    it('should return false for empty string', () => {
        expect(isValidUrl('')).toBe(false);
    });

    it('should return false for whitespace string', () => {
        expect(isValidUrl('   ')).toBe(false);
    });

    it('should return true for whitespace string', () => {
        expect(isValidUrl('https://example.com/path/to/resource#jdioas=1231?q=22&b=12')).toBe(true);
    });

    it('should return true for whitespace string', () => {
        expect(isValidUrl('https://example.com/path/to/resource#jdioas=1231#adowa=12?q=22&b=12')).toBe(true);
    });


    it('should return true for whitespace string', () => {
        expect(isValidUrl('https://example.com/path/to/resource/#/jdioas=1231#adowa=12?q=22&b=12')).toBe(true);
    });
});

