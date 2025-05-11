import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";
import { friendListImages } from "./script.js";

//Napravi klasu user to je glavna klasa
//Razmisli od cega se ta klasa sastoji tj koja polja na njoj treba da definiras
//Jedno polje je friends = []
//Od cega se friends sastoji
//Napraviti da se doda post

class User{
    constructor(){
        this.posts = [];
        this.user = {};
        this.postContent = [];
        this.postComments = [];
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

}
export const manageUser = new User();
manageUser.pushFriendsInArray();
manageUser.iterateThroughArray();
