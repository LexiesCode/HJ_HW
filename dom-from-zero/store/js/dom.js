'use strict';

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    } else {
        const el = document.createElement(node.name);
        if (typeof node.props === 'object' && node.props !== null) {
            Object.keys(node.props).forEach(i => el.setAttribute(i, node.props[i]));
        }
        if (node.childs instanceof Array) {
            node.childs.forEach(child => {
                let nodeChild = createElement(child);
                el.appendChild(nodeChild);
            });
        }
        return el;
    }
}