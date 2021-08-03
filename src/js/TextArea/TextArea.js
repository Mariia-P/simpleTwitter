import { Component } from '../core/Component'

export class TextArea extends Component {
    constructor({text}) {
        super({
            tagName: 'textarea',
            className: 'modifyItemInput',
            text: text,
            
        });
        
    }
    
}