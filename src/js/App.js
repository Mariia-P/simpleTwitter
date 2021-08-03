import { Component } from "./core/Component";
import { Header } from "./Header/Header";
import { Button } from "./Button/Button";
import { ListAllTweets } from "./ListAllTweets/ListAllTweets";
import { AddTweetPage } from "./AddTweetPage/AddTweetPage";
import { EditTweetPage } from "./EditTweetPage/EditTweetPage";
import { LikedPage } from "./LikedPage/LikedPage";

export class App extends Component {
  constructor({ gs }) {
    const { storedTweets, activePage, editTweet } = gs.getState();
    super({
      className: "app",
      html: '<div class="app__content content-wrapper"></div>',
    });

    this.gs = gs;
    gs.subscribe(this);
    this.storedTweets = storedTweets;
    this.editTweet = editTweet;
    this.addListeners({ click: this.changePage.bind(this) });

    this.createMainPage();
    window.location.hash = activePage;
    console.log("[this.gs]", this.gs);
  }

  _render(prevState, nextState) {
    console.log("[prevState]", prevState);
    console.log("[nextState]", nextState);

    const prewTweeets = prevState.storedTweets;
    const nextTweeets = nextState.storedTweets;
    console.log("[get prew]", this.gs.getLikeTweet(prewTweeets));
    console.log("[get next]", this.gs.getLikeTweet(nextTweeets));

    if (window.location.hash !== "#main") return;
    if (this.gs.getLikeTweet(prewTweeets) === this.gs.getLikeTweet(nextTweeets))
      return;

    if (this.gs.getLikeTweet(nextTweeets) === true) {
      this.findNode(".goToLiked").removeClass("hidden");
    } else {
      this.findNode(".goToLiked").addClass("hidden");
    }
  }

  changePage(e) {
    if (e.target.classList.contains("addTweet")) {
      window.location.hash = "add";
    }
    if (e.target.classList.contains("goToLiked")) {
      window.location.hash = "liked";
    }
  }

  createTweetPage() {
    const { storedTweets } = this.gs.getState();
    this.findNode(".app__content")
      .removeChild()
      .append(
        new AddTweetPage({
          storedTweets: storedTweets,
          className: "add_content-wrapper",
        })
      );
  }

  onBackClick() {
    window.location.hash = "main";
  }

  createLikedPage() {
    const { storedTweets, editTweet } = this.gs.getState();
    this.findNode(".app__content")
      .removeChild()
      .append([
        new Header({ text: "Liked Tweet" }),
        new Button({
          className: "mYback",
          text: "Back",
          onClick: this.onBackClick,
        }),
      ])
      .append(
        new LikedPage({
          storedTweets: storedTweets,
          editTweet: editTweet,
          gs: this.gs,
        })
      );
  }

  createEditPage() {
    this.findNode(".app__content")
      .removeChild()
      .append(
        new EditTweetPage({
          storedTweets: this.storedTweets,
          className: "add_content-wrapper",
          editTweet: this.editTweet,
          gs: this.gs,
        })
      );
  }

  createMainPage() {
    const { storedTweets, editTweet } = this.gs.getState();
    this.findNode(".app__content")
      .removeChild()
      .append([
        new Header({ text: "Simple Twitter" }),
        new Button({ className: "addTweet", text: "Add Tweet" }),
        new Button({
          className: `goToLiked ${
            this.gs.getLikeTweet(storedTweets) !== true ? "hidden" : ""
          }`,
          text: "Go to liked",
        }),
      ])
      .append(
        new ListAllTweets({
          storedTweets: storedTweets,
          editTweet: editTweet,
          gs: this.gs,
        })
      );
  }
}
