import { Component } from '../core/Component'


// export class Button extends Component {
//     constructor({className, text}) {
//         super({
//             tagName: 'button',
//             className: className,
//             text: text
//         });
       
//     }
   
// }

export class Button extends Component {
    constructor({
        //
        className,
        title,
        type = 'button',
        attrs = {},
        text,
        html,
        onClick
        //
    } = {}) {
        super({
            tagName: 'button',
            className: className,
            attrs: {
                type,
                title,
                ...attrs
            },
            text,
            html
        });

        this.addListeners({ click: onClick });
    }
}
