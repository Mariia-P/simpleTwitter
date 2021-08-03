import { Component } from '../core/Component'
import { Tweet } from '../Tweet/Tweet'


export class LikedPage extends Component {
    constructor({storedTweets, editTweet, gs}) {
        super({
            className: 'list',
            html: `<ul class="list-items"></ul>`
               
            
        });
        this.gs = gs;
        this.storedTweets= storedTweets;
        this.editTweet= editTweet;
        this.filteredTweets = storedTweets.filter(tweet=>  tweet.like===true);
       

        this.addListeners({ click: this.handleClick.bind(this) });
        this.findNode('.list-items')
        .append(this.filteredTweets.map(tweet=> new Tweet({attrs:{'data-id':tweet.id}, text:tweet.text, like:tweet.like})));
       
    }

    removeTweet(e){
      
        let removeLi = e.target.closest('li');
          let removeId = removeLi.getAttribute('data-id');
          removeLi.remove();
          this.storedTweets.forEach(function (tweet, idx, array) {
            if (tweet.id === +removeId) {
              array.splice(idx, 1);
            }
          });
          localStorage.setItem('tweetString', JSON.stringify(this.storedTweets));
          this.gs.setState({storedTweets: JSON.parse(localStorage.getItem("tweetString"))});

        }
    
        likeTweet(e){
          console.log('[smth str]' );
            let likedLi = e.target.closest('li');
            let likedId = likedLi.getAttribute('data-id');
            const testArray = JSON.parse(localStorage.getItem("tweetString"));
            
            testArray.forEach(function (tweet) {
                if (tweet.id === +likedId) {
                 if(tweet.like===true){
                    tweet.like=false;
                  
                 } 
                }
              });
              likedLi.remove();
              localStorage.setItem('tweetString', JSON.stringify(testArray));
              this.gs.setState({storedTweets: JSON.parse(localStorage.getItem("tweetString"))});
              
        }

    handleClick(e){
        if (e.target.classList.contains('remove')) {
          this.removeTweet(e);
          }

          if (e.target.classList.contains('like')) {
            console.log('[smth str]' );
          this.likeTweet(e);
          }

          if (e.target.classList.contains('text')) {
            let editLi = e.target.closest('li');
            let editedId = editLi.getAttribute('data-id');
            this.editTweet.id=editedId;
            this.editTweet.text=e.target.textContent;
            this.chekedLikeTweet();
            window.location.hash = 'edit';
          } 
    }
}