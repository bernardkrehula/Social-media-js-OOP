import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";
import { friendListImages } from "./script.js";
import { posts } from "./script.js";

//Doradi comment classu.Sta svaki comment ima?
//Napravi klassu like.Sta svaki like ima?
//
export class Post {
    constructor(writenContent, time, likes){
        this.id = crypto.randomUUID();
        this.time = time;
        this.writenContent = writenContent;
        this.likes = likes;
        this.postComments = [];
        this.commentBtn = true;
    }
    pushCommentInArray(comment){
        this.postComments.push(comment);
    }
}
export class Comment {
    constructor(content){
        this.content = content;
    }
    displayComment(comment, comments){
        const html = `
        <div class="comment">
            <img src="IMG_8725.JPG">
            <div class="comment-name">
                <h1>Bernard Krehula</h1>
                <input disabled value="${comment.content}">
            </div>
        </div>
        `;
    comments.insertAdjacentHTML('beforeend', html);
    }
    iterateThroughComments() {
       this.postComments.forEach(comment => this.displayComment(comment));
    }
}

class User {
    constructor(){
        this.posts = [];
        this.user = {};
        this.friends = [];
        this.foundFriends = null;
        this.activePost = null;
    }
    pushFriendsInArray(){
        friends.forEach(friend => this.friends.push(friend));
    }
    iterateThroughFriendsArray(){
        this.friends.forEach(friend => this.displayFriends(friend));
    }
    displayFriends(friend){
    const html = `
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
        const html = `
        <li class="post" id="${post.id}">
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
                    <form class="addComment">
                            <img src="IMG_8725.JPG">
                            <input placeholder="Write a comment">
                            <button class="addComment" type="submit">Add comment</button>
                    </form>
                    <div class="comments"></div>
                </li>
        `
        posts.insertAdjacentHTML('beforeend', html);
    }
    findPostById(id){
        return this.posts.find(post => post.id === id);
    }
    setAcitvePost(post){
        this.activePost = post;
    }
    getActivePost(){
        return this.activePost;
    }
}
export const manageUser = new User();
manageUser.pushFriendsInArray();
manageUser.iterateThroughFriendsArray();
