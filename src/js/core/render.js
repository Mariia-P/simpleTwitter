export const render = (component, parentNode) => {
    parentNode.append(component.toNode());
};
