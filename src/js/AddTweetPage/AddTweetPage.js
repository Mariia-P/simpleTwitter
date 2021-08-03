import { Component } from '../core/Component'
import { Button } from '../Button/Button'
import { Header } from '../Header/Header'
import { TextArea } from '../TextArea/TextArea'


export class AddTweetPage extends Component {
    constructor({storedTweets, className}) {
        super({
            className: className,

              })
              this.storedTweets= storedTweets;
              this.addListeners({ click: this.addTweet.bind(this) });

              this.findNode('.add_content-wrapper')
              .append( new Header({text: 'Add Tweet'}))
              .append(new TextArea({text: ''}))
              .findNode('.modifyItemInput')
              .after(new Component({ className: 'button-wrapper' }))
              .findNode('.button-wrapper')
              .append(new Button({ className: 'cancelModification', text: 'Cancel' }))
              .append(
                new Button({ className: 'saveModifiedItem', text: 'Save Change' })
              );
        };
        validateTweet(userTweet, message){
            let answer = [];
            answer=  this.storedTweets.map(function (tweet) {
              if (tweet.text === userTweet) {
                const errorTag = document.querySelector('.absMassage');
                errorTag.classList.remove('hidden');
                errorTag.textContent = message;
                answer = 1;
              } else {
                answer = 0;
              }
              return answer;
            });
            console.log('[answer]', answer);
            return answer;
          }

        addTweet(e) {
            if (e.target.classList.contains('cancelModification')) {
                window.location.hash = 'main';
              }
              if (e.target.classList.contains('saveModifiedItem') && this.findNode('.modifyItemInput')._foundNode.value ) {
                 let answer = [];
                 let userTweet = this.findNode('.modifyItemInput')._foundNode.value;
                 if (this.storedTweets.length > 0) {
                   answer = this.validateTweet(userTweet, "Error! You can't tweet about that");
                 }
                 if (answer.includes(1)) {
                   return;
                 } else {
                   let id = Math.random() * (1000 - 1) + 1;
                     let tweet = {
                       id: id,
                       text: userTweet,
                       like: false
                     };
                    
                     this.storedTweets.push(tweet);
                     localStorage.setItem('tweetString', JSON.stringify(this.storedTweets));
                   window.location.hash = 'main';
                   
                 }
               }   
        }

        

        

    }
    
