import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";

class FriendsList {
    constructor(){
        this.friendListImages = document.querySelector('.friend-images');
        this.foundFriends = null;
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
    filterFriends(value){
        return this.foundFriends = friends.filter(friend => friend.firstName.toLocaleLowerCase().match(value) || friend.lastName.toLocaleLowerCase().match(value));
    }
    displayFilteredFriends(friend){
        let html = `
         <li class="friend">
                <img src="${friend.img}">
                <h3>${friend.firstName + friend.lastName}</h3>
        </li>
        `
        searchFriendsList.insertAdjacentHTML('beforeend', html);
    }
    iterateThroughFindFriends(){
        searchFriendsList.innerHTML = '';
        this.foundFriends.forEach(friend => this.displayFilteredFriends(friend))
    }

}
export const manageFriendList = new FriendsList();
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