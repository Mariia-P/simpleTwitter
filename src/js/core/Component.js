export class Component {
    constructor({
        //
        tagName = 'div',
        className,
        attrs,
        html,
        text,
        children
        //
    }) {
        this._node = document.createElement(tagName);
        this._foundNode = null;

        if (className) {
 this._node.className = className; 
}
        if (html) {
 this._node.innerHTML = html; 
}
        if (text) {
 this._node.textContent = text; 
}
        if (children) {
 this._insert('append', children); 
}

        for (const key in attrs) {
            const attrValue = attrs[key];

            if (!attrValue) {
 continue; 
}

            this._node.setAttribute(key, attrValue);
        }
    }

    toHtml() {
        return this._node.outerHTML;
    }

    toNode() {
        return this._node;
    }

    findNode(node) {
        if (typeof node === 'string') {
            this._foundNode = this._node.querySelector(node);
        } else {
            this._foundNode = node;
        }

        return this;
    }

    resetNode() {
        this._foundNode = null;

        return this;
    }

    _insert(methodName, components) {
        const children = Array.isArray(components) ? components : [components];

        const nodes = children.map(child => child.toNode());
        (this._foundNode || this._node)[methodName](...nodes);
    }

    html(htmlString) {
        (this._foundNode || this._node).innerHTML = htmlString;
        return this;
    }

    text(textValue) {
        (this._foundNode || this._node).textContent = textValue;
        return this;
    }

    append(components) {
        this._insert('append', components);
        return this;
    }

    prepend(components) {
        this._insert('prepend', components);
        return this;
    }

    before(components) {
        this._insert('before', components);
        return this;
    }

    after(components) {
        this._insert('after', components);
        return this;
    }

    truncate() {
        (this._foundNode || this._node).innerHTML = '';
        return this;
    }

    remove() {
        (this._foundNode || this._node).remove();
        return this;
    }
    removeChild() {
        while ((this._foundNode || this._node).firstChild) {
            (this._foundNode || this._node).removeChild((this._foundNode || this._node).firstChild);
          }
        return this;
    }

    addListeners(listeners) {
        for (const eventType in listeners) {
            const eventHandler = listeners[eventType];

            if (typeof eventHandler !== 'function') {
 continue; 
}
            (this._foundNode || this._node).addEventListener(
                eventType,
                eventHandler
            );
        }
        return this;
    }

    addClass(className) {
        (this._foundNode || this._node).classList.add(className);

        return this;
    }

    removeClass(className) {
        (this._foundNode || this._node).classList.remove(className);

        return this;
    }
}
