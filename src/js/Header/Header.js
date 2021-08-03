import { Component } from '../core/Component'

export class Header extends Component {
    constructor({text}) {
        super({
            tagName: 'h1',
            className: 'header',
            text: text
        });
    }
}