//Css: cover slika profilna slika user informacije, prijatelje izlistat i stilizovat, dodat input za dodvanje postova bez funckije
//Dodat funkcionalnst za pretrazivanje prijatelja
//Napravit postavku zadatka: kako organizovati klase?
//Koja polja trebaju imat te klase?
//Koji su mi objekti (instance klasa) potrebni?
//U kojim arrayevima treba da budu ti objekti tj ko upravlja tim objektima
//Gdje treba da se nalaze ovi arrayevi?
import { friends } from "./friendsList.js";

const friendsList = document.querySelector('.friends');
const friendListImages = document.querySelector('.friend-images');

friends.forEach(friend => displayFriends(friend));

function displayFriends(friend){
    let html = `
    <li>
        <img src="${friend.img}">
        <h3>${friend.firstName} ${friend.lastName}</h3>
    </li>
    `

    friendListImages.insertAdjacentHTML('beforeend', html);
}
