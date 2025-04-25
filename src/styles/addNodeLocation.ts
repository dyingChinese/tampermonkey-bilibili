
function addNodeLocation(domRef: Element): Element {
    const children = domRef.children;
    if (!children || children.length === 0) throw new Error("节点不存在");
    if (children.length < 3) {
        return children[-1];
    }
    return children[3];
}

export default addNodeLocation