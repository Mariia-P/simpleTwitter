import { App } from "./App";
import { Component } from "./core/Component";
import { GlobalState, render } from "./core";

import "../scss/style.scss";

const ACTIVE_PAGE = "#main";
let tweets;

if (localStorage.getItem("tweetString") !== null) {
  tweets = JSON.parse(localStorage.getItem("tweetString"));
  const like = (el) => el.like === true;

} else {
  tweets = [];
}

localStorage.setItem("tweetString", JSON.stringify(tweets));

const gs = new GlobalState({
  initialState: {
    activePage: ACTIVE_PAGE,
    storedTweets: JSON.parse(localStorage.getItem("tweetString")),
    editTweet: {},
  },
});

const props = { gs };
const Twitter = new App(props);

render(Twitter, document.getElementById("root"));
render(
  new Component({ className: "hidden absMassage", text: "rr" }),
  document.getElementById("alertMessage")
);

const changePage = function () {
  if (window.location.hash === "#add") {
    Twitter.createTweetPage();
  }
  if (window.location.hash === "#main") {
    const errorTag = document.querySelector(".absMassage");
    if (!errorTag.classList.contains("hidden")) {
      errorTag.classList.add("hidden");
    }

    Twitter.createMainPage();
  }
  if (window.location.hash === "#edit") {
    Twitter.createEditPage();
  }
  if (window.location.hash === "#liked") {
    Twitter.createLikedPage();
  }
};

window.addEventListener("hashchange", changePage);
