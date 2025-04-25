// 等待目标元素加载

function waitForElement<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
function waitForElement<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
function waitForElement<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
// /** @deprecated */
function waitForElement<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
function waitForElement<E extends Element = Element>(selectors: string): E | null;



function waitForElement(selector: any) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
};

export default waitForElement;