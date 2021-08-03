import { Component } from "../core/Component";
import { Button } from "../Button/Button";
import { Header } from "../Header/Header";
import { TextArea } from "../TextArea/TextArea";

export class EditTweetPage extends Component {
  constructor({ storedTweets, className, editTweet, gs }) {
    super({
      className: className,
    });
    this.storedTweets = storedTweets;
    this.editTweet = editTweet;
    this.gs = gs;
    this.addListeners({ click: this.toEditTweet.bind(this) });

    const Area = new TextArea({
      text: this.editTweet.text,
    });
    console.log("[Area]", Area);
    this.findNode(".add_content-wrapper")
      .append(new Header({ text: "Edit Tweet" }))
      .append(Area)
      .findNode(".modifyItemInput")
      .after(new Component({ className: "button-wrapper" }))
      .findNode(".button-wrapper")
      .append(new Button({ className: "cancelModification", text: "Cancel" }))
      .append(
        new Button({ className: "saveModifiedItem", text: "Save Change" })
      );
  }

  validateTweet(userTweet, message) {
    let answer = [];
    answer = this.storedTweets.map(function (tweet) {
      if (tweet.text === userTweet) {
        const errorTag = document.querySelector(".absMassage");
        errorTag.classList.remove("hidden");
        errorTag.textContent = message;
        answer = 1;
      } else {
        answer = 0;
      }
      return answer;
    });
    console.log("[answer]", answer);
    return answer;
  }

  toEditTweet(e) {
    if (e.target.classList.contains("cancelModification")) {
      window.location.hash = "main";
    }
    if (
      e.target.classList.contains("saveModifiedItem") &&
      this.findNode(".modifyItemInput")._foundNode.value
    ) {
      let answer = [];
      let userTweet = this.findNode(".modifyItemInput")._foundNode.value;
      if (this.storedTweets.length > 0) {
        answer = this.validateTweet(
          userTweet,
          "Error! You can't tweet about that"
        );
      }
      if (answer.includes(1)) {
        return;
      } else {
        const id = this.editTweet.id;
        const tweet = this.storedTweets.filter(function (tw) {
          return tw.id === +id;
        });
        tweet[0].text = userTweet;
        localStorage.setItem("tweetString", JSON.stringify(this.storedTweets));
        window.location.hash = "main";
      }
    }
  }
}
