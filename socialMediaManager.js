import { friends } from "./friendsList.js";
class FriendsList {
    constructor(){
        this.friendListImages = document.querySelector('.friend-images');
    }
    iterateThroughArray(){
        friends.forEach(friend => this.displayFriends(friend));
    }
    displayFriends(friend){
    let html = `
    <li>
        <img src="${friend.img}">
        <h3>${friend.firstName} ${friend.lastName}</h3>
    </li>
    `
    this.friendListImages.insertAdjacentHTML('beforeend', html);
    }

}
const manageFriendList = new FriendsList();
manageFriendList.iterateThroughArray();

class PostCommentsAndLikes{
    constructor(){
        this.commentsAndLikes = [];
    }
}


class UserPost{
    constructor(){
        this.userPost = {};
    }
}

class PostsManager{
    constructor(){
        this.posts = [];
        this.activePost = null;
    }   
}