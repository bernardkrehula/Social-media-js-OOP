//Css: cover slika profilna slika user informacije, prijatelje izlistat i stilizovat, dodat input za dodvanje postova bez funckije
//Dodat funkcionalnst za pretrazivanje prijatelja
//Napravit postavku zadatka: kako organizovati klase?
//Koja polja trebaju imat te klase?
//Koji su mi objekti (instance klasa) potrebni?
//U kojim arrayevima treba da budu ti objekti tj ko upravlja tim objektima
//Gdje treba da se nalaze ovi arrayevi?
import { manageFriendList } from "./socialMediaManager.js";


const friendsList = document.querySelector('.friends');
const searchBar = document.querySelector('.findFriendsBar input');
export const searchFriendsList = document.querySelector('.searchFriends');

searchBar.addEventListener('input', () => {
    manageFriendList.filterFriends(searchBar.value);
    manageFriendList.iterateThroughFindFriends();
})