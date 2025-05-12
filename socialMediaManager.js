import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";
import { friendListImages } from "./script.js";
import { posts } from "./script.js";

//Napravi klasu user to je glavna klasa
//Razmisli od cega se ta klasa sastoji tj koja polja na njoj treba da definiras
//Jedno polje je friends = []
//Od cega se friends sastoji
//Napraviti da se doda post
export class Post {
    constructor(writenContent, time, likes){
        this.id = crypto.randomUUID();
        this.time = time;
        this.writenContent = writenContent;
        this.likes = likes;
        this.postComments = [];
    }
}
class Comments {
    constructor(content){
        this.content = content;
    }
}
class User {
    constructor(){
        this.posts = [];
        this.user = {};
        this.friends = [];
        this.foundFriends = null;
    }
    pushFriendsInArray(){
        friends.forEach(friend => this.friends.push(friend));
    }
    iterateThroughArray(){
        this.friends.forEach(friend => this.displayFriends(friend));
    }
    displayFriends(friend){
    let html = `
    <li>
        <img src="${friend.img}">
        <h3>${friend.firstName} ${friend.lastName}</h3>
    </li>
    `
    friendListImages.insertAdjacentHTML('beforeend', html);
    }
    filterFriends(value){
        return this.foundFriends = this.friends.filter(friend => friend.firstName.toLocaleLowerCase().match(value) || friend.lastName.toLocaleLowerCase().match(value));
    }
    displayFilteredFriends(friend){
        let html = `
         <li class="friend">
                <img src="${friend.img}">
                <h3>${friend.firstName} ${friend.lastName}</h3>
        </li>
        `
        searchFriendsList.insertAdjacentHTML('beforeend', html);
    }
    iterateThroughFindFriends(){
        searchFriendsList.innerHTML = '';
        this.foundFriends.forEach(friend => this.displayFilteredFriends(friend))
    }
    pushPostInArray(post){
        this.posts.push(post);
    }
    displayPost(post){
        let html = `
        <div class="post" id="${post.id}">
                    <div class="photo-name-date">
                        <img src="IMG_8725.JPG">
                        <div class="name-Date">
                            <h1>Bernard Krehula</h1>
                            <h2>${post.time}</h2>
                        </div>
                    </div>
                    <h3>${post.writenContent}</h3>
                    <div class="showComment">
                        <h4>Kilibarda Petrovska, Hiroshi Tanaka and 2 others likes this post</h4>
                        <h5>4 comments</h5>
                    </div>
                    <div class="likeCommentBtns">
                         <button>👍🏻Like</button>
                        <button>💬Comments</button>
                    </div>
                    <div class="addComment">
                            <img src="IMG_8725.JPG">
                            <input placeholder="Write a comment">
                            <button class="addComment">Add comment</button>
                    </div>
                </div>
        `
        posts.insertAdjacentHTML('beforeend', html);
    }

}
export const manageUser = new User();
manageUser.pushFriendsInArray();
manageUser.iterateThroughArray();
