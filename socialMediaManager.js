import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";
import { friendListImages } from "./script.js";
import { posts } from "./script.js";
import { commentsPost } from "./commentsList.js";
import { postLikes } from "./postLikes.js";
import { postContent } from "./postContent.js";

//Dodati display likes i komentara vec postojecih
//Napraviti na nacin da se svaki put kreira post i onda u njega stavljam komentare i lajkove a ne da ih dohvacam querrySelectorom

//Lista featura: 
//-Da se dodaje novi post
//-Da se komentarise
//-Da se edituje post
//-Da se edituje komentar
//-Da se lajkuje post
//-Da se lajkuje komentar
//-Da se obrise post (samo svoj)
//-Da se obrise komentar (samo svoj)
//Bonus - da se edituje komentar
export class Post {
    constructor(writenContent, time){
        this.id = crypto.randomUUID();
        this.time = time;
        this.writenContent = writenContent;
        this.likes = [];
        this.postComments = [];
        this.commentSection = posts.querySelector('form');
    }
    pushCommentInArray(comment){
        this.postComments.push(comment);
    }
    pushLikeInArray(like){
        this.likes.push(like);
    }
    findPost(){
        return 
    }
    createDefaultComments(){
        console.log('radi')
    }
    createPostComments(){
        commentsPost.forEach((comments, index) => console.log(index) )
        // commentsFirstPost.forEach(comment => this.pushFirstPostCommentsInArray(new Comment(comment.content, comment.userName, comment.userLastName, comment.userImg)));
    }
    pushPostCommentsInArray(){
        commentsPost.forEach(comments => this.postComments.push(comments));
    }
    addComments(commentsArray) {
    commentsArray.forEach(commentData => {
        const comment = new Comment(
            commentData.content,
            commentData.userName,
            commentData.userLastName,
            commentData.userImg
        );
        this.postComments.push(comment);
    });
}
}

export class Likes {
    constructor(name, lastName){
        this.id = crypto.randomUUID();
        this.name = name;
        this.lastName = lastName;
    }
    displayLikes(like, likeSection){
        const html = `
        <h4>${like.name}${like.lastName}</h4>
        `;
        likeSection.insertAdjacentHTML('afterbegin', html);
    }
    //<h4>Kilibarda Petrovska, Hiroshi Tanaka and 2 others likes this post</h4>
}
export class Comment {
    constructor(content, userName, userLastName, userImg){
        this.content = content;
        this.userName = userName;
        this.userLastName = userLastName;
        this.userImg = userImg;
    }
    displayComment(comment, comments){
        const html = `
        <div class="comment">
            <img src="${comment.userImg}">
            <div class="comment-name">
                <h1>${comment.userName} ${comment.userLastName}</h1>
                <input disabled value="${comment.content}">
            </div>
        </div>
        `;
    comments.insertAdjacentHTML('beforeend', html);
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
                        <h5>4 comments</h5>
                    </div>
                    <div class="likeCommentBtns">
                         <button class="like">👍🏻Like</button>
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
    pushDefaultPostInArray(){   
        postContent.forEach(post => this.posts.push(new Post(post.writenContent, post.time, post.id)));
    }
    iterateThroughDefaultPost(){
        this.posts.forEach(post => this.displayPost(post));
    }
    getDefaultPosts(){
        return this.posts;
    }
}
export const manageUser = new User();
manageUser.pushFriendsInArray();
manageUser.iterateThroughFriendsArray();

manageUser.pushDefaultPostInArray();
manageUser.iterateThroughDefaultPost();

manageUser.pushPostInArray();
manageUser.getDefaultPosts().forEach((post, index) => {
    const commentsForThisPost = commentsPost[index];
    if (commentsForThisPost) {
        post.addComments(commentsForThisPost);
    }
});
manageUser.iterateThroughDefaultPost();