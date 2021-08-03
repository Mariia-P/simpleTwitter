import { Component } from "../core/Component";

export class Tweet extends Component {
  constructor({ attrs, text, like }) {
    super({
      tagName: "li",
      className: "tweet-li",
      attrs: attrs,
      html: ` <p class="text">${text}</p>
                    <div class="editButtonWrapper">
                    <button class="remove" data-id="remove">Remove</button>
                    <button class="like" data-id="like">${
                      like ? "UnLike" : "Like"
                    }</button>
                    </div>
                    `,
    });
  }

  
}
