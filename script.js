//Css: cover slika profilna slika user informacije, prijatelje izlistat i stilizovat, dodat input za dodvanje postova bez funckije
//Dodat funkcionalnst za pretrazivanje prijatelja
//Napravit postavku zadatka: kako organizovati klase?
//Koja polja trebaju imat te klase?
//Koji su mi objekti (instance klasa) potrebni?
//U kojim arrayevima treba da budu ti objekti tj ko upravlja tim objektima
//Gdje treba da se nalaze ovi arrayevi?
import { manageUser } from "./socialMediaManager.js";
import { Post } from "./socialMediaManager.js";

const friendsList = document.querySelector('.friends');
const searchBar = document.querySelector('.findFriendsBar input');
export const searchFriendsList = document.querySelector('.searchFriends');
export const friendListImages = document.querySelector('.friend-images');
const addPostBtn = document.querySelector('.addPost button');
const addPostInput = document.querySelector('.addPost input');
export const posts = document.querySelector('.posts');

searchBar.addEventListener('input', () => {
    manageUser.filterFriends(searchBar.value);
    manageUser.iterateThroughFindFriends();
})
addPostBtn.addEventListener('click', () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const getTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    const post = new Post(addPostInput.value, getTime);
    manageUser.pushPostInArray(post);
    manageUser.displayPost(post);
})

posts.addEventListener('click', (e) => {
    const addBtn = e.target.closest('button');
    const comment = e.target.closest('input').value;
    
    console.log
    if(addBtn.className === 'addComment'){
        console.log(comment)
    }
})