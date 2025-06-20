import { friends } from "./friendsList.js";
import { searchFriendsList } from "./script.js";
import { friendListImages } from "./script.js";
import { posts } from "./script.js";
import { data } from "./data.js";

//Stavi da iskoci pop modala kad editas post ('Are you sure?')
//Da se moze obrisat komentar samo svoj
//Da se moze lajkovat komentar
//Postavi da su neki komentari vec unaprijed lajkovani
//Da se moze edidat komentar samo svoj

export class Post {
    constructor(writenContent, time, postComments, likes){
        this.id = crypto.randomUUID();
        this.time = time;
        this.writenContent = writenContent;
        this.likes = likes;
        this.postComments = postComments;
    }
    setCommentsAndLikesToArray(){
        this.postComments = [];
        this.likes = [];
    }
    pushCommentInArray(comment){
        this.postComments.push(comment);
    }
    pushLikeInArray(like){
        this.likes.push(like);
    }
    displayDefaultComments(){
        const post = document.getElementById(`${this.id}`);
        let commentsHtml = post.querySelector('.comments');
        this.postComments.forEach(comment =>  { 
            if(comment){
                comment.displayComment(comment, commentsHtml)
            }
        }
        ) 
    }
    displayShowCommentsBtn(){
        const post = document.getElementById(`${this.id}`);
        let showComment = post.querySelector('.showComment');
        if (this.postComments.length > 0) {
        const commentInstance = new Comment("", "", "", "");
        commentInstance.displayDefaultCommnetsNumber(this.postComments.length, showComment);
        }
    } 

    displayDefaultLikes(){
        const post = document.getElementById(`${this.id}`);
        let postLikes = post.querySelector('.showComment');
        this.likes.forEach(like => like.displayLikes(like, postLikes));
    }
    deleteMyComments(id){
        this.postComments.find(comment => comment.id == id);
    }
    findComment(id){
        return this.postComments.find(comment => comment.id == id);
    }
    editActiveComment(id, content){
        this.findComment(id).writenContent = content;
    }
    editComment(id, comments){
        const foundComment = this.findComment(id);

        if(foundComment.isUserComment){
            const comment = comments.querySelector(`.comment[id="${id}"]`);
            comment.innerHTML = ` 
            <img src="${foundComment.userImg}">
            <div class="comment-name">
                <h1>${foundComment.userName} ${foundComment.userLastName}</h1>
                <input value="${foundComment.content}">
            </div>
            <svg class='commentDot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>
            <div class="dots-contentComments" id='${foundComment.id}' style="display: none;">
                <button class="editComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                <button class="deleteComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
            </div>
            <button class='comment-saveBtn' type='submit'>Save</button>
        `;
        }
    }

    //Vidijeti kako napraviti apstrakciju za innerHtml
    //Moguce editovat samo sobstveni komentar (modal se zatvara klikom van njega)
    saveEditedComment(id, comments){
        const comment = comments.querySelector(`.comment[id="${id}"]`);
        const foundComment = this.findComment(id);
        comment.innerHTML = ` 
            <img src="${foundComment.userImg}">
            <div class="comment-name">
                <h1>${foundComment.userName} ${foundComment.userLastName}</h1>
                <input disabled value="${foundComment.writenContent}">
            </div>
            <svg class='commentDot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>
            <div class="dots-contentComments" id='${foundComment.id}' style="display: none;">
                <button class="editComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                <button class="deleteComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
            </div>
        `; 
    }
    //Selektirati preko posta 
    removeComment(id, comments){
        const comment = comments.querySelector(`#${id}`);
        this.postComments.filter(comment => comment.id != id);
        comments.removeChild(comment);
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
        <h4>${like.name} ${like.lastName}</h4>
        `;
        likeSection.insertAdjacentHTML('beforeend', html);
    }
}
export class Comment {
    constructor(content, userName, userLastName, userImg, isUserComment){
        this.id = crypto.randomUUID();
        this.content = content;
        this.userName = userName;
        this.userLastName = userLastName;
        this.userImg = userImg;
        this.isUserComment = isUserComment;
    }
    displayComment(comment, comments){
        const html = `
        <div class="comment" id="${comment.id}">
            <img src="${comment.userImg}">
            <div class="comment-name">
                <h1>${comment.userName} ${comment.userLastName}</h1>
                <input disabled value="${comment.content}">
            </div>
            <svg class='commentDot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>
            <div class="dots-contentComments" id='${comment.id}' style="display: none;">
                <button class="editComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                <button class="deleteComment"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
            </div>
            </div>
        `;
    comments.insertAdjacentHTML('afterbegin', html);
    }
    displayDefaultCommnetsNumber(commentCount, commentsHtml){
        const html = `<h5>${commentCount} comments</h5>`;
        
        commentsHtml.insertAdjacentHTML('beforeend', html);
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
                <h4>${friend.firstName} ${friend.lastName}</h4>
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
                        <svg class='dot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        <div class="dots-content" style="display: none;">
                            <button class="edit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                            <button class="delete"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
                        </div>
                        <div class='safeEditQuestion' style="display: none;">
                            <h4>Are you sure?</h4>
                            <button style='background-color: red;' class='editBtnNo'>No</button>
                            <button style='background-color: green;' class='editBtnYes'>Yes</button>
                        </div>
                    </div>
                    <h3>${post.writenContent}</h4>
                    <div class="showComment">
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
        posts.insertAdjacentHTML('afterbegin', html);
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
        data.forEach(post => this.posts.unshift(new Post(post.writenContent, post.time, post.postComments, post.likes)));
    }
    iterateThroughDefaultPost(){
        this.posts.forEach(post => this.displayPost(post));
    }
    getDefaultPosts(){
        return this.posts;
    }
    removePost(){
        this.posts = this.posts.filter(post => post.id != this.activePost.id);
    }
    removePostFromScreen(){
        const postElement = document.getElementById(this.activePost.id);
        posts.removeChild(postElement);
    }
    editPost(post){
        const postHtml = document.getElementById(`${post.id}`)
        const html = `
                    <div class="photo-name-date">
                        <img src="IMG_8725.JPG">
                        <div class="name-Date">
                            <h1>Bernard Krehula</h1>
                            <h2>${post.time}</h2>
                        </div>
                        <svg class='dot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        <div class="dots-content" style="display: none;">
                            <button class="edit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                            <button class="delete"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
                        </div>
                        <div class='safeEditQuestion' style="display: none;">
                            <h4>Are you sure?</h4>
                            <button style='background-color: red;' class='editBtnNo'>No</button>
                            <button style='background-color: green;' class='editBtnYes'>Yes</button>
                        </div>
                    </div>
                    <textarea class='post-value'>${post.writenContent}</textarea>
                    <button class='saveBtn' type='submit'>Save</button>
                    <div class="showComment">
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
        `
        postHtml.innerHTML = `${html}`;
        post.displayDefaultComments();
        post.displayDefaultLikes();
        post.displayShowCommentsBtn();
    }
    saveEditedPost(post){
        const postHtml = document.getElementById(`${post.id}`)
        const html = `
                    <div class="photo-name-date">
                        <img src="IMG_8725.JPG">
                        <div class="name-Date">
                            <h1>Bernard Krehula</h1>
                            <h2>${post.time}</h2>
                        </div>
                        <svg class='dot' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                        <div class="dots-content" style="display: none;">
                            <button class="edit"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg> Edit</button>
                            <button class="delete"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> Delete</button>
                        </div>
                        <div class='safeEditQuestion' style="display: none;">
                            <h4>Are you sure?</h4>
                            <button style='background-color: red;' class='editBtnNo'>No</button>
                            <button style='background-color: green;' class='editBtnYes'>Yes</button>
                        </div>
                    </div>
                    <h3>${post.writenContent}</h3>
                    <div class="showComment">
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
        `
        postHtml.innerHTML = `${html}`;
        post.displayDefaultComments();
        post.displayDefaultLikes();
        post.displayShowCommentsBtn();
    }
    editActivePostContent(content){
        this.getActivePost().writenContent = content;
    }
}
export const manageUser = new User();
manageUser.pushFriendsInArray();
manageUser.iterateThroughFriendsArray();

manageUser.pushDefaultPostInArray();
manageUser.iterateThroughDefaultPost();

manageUser.getDefaultPosts().forEach((post) => {
    post.postComments = post.postComments.map(commentData => {
        if(commentData){
                return new Comment(
                commentData.content,
                commentData.userName,
                commentData.userLastName,
                commentData.userImg
            )
        }
    }
    );
    post.likes = post.likes.map(likeData => {
            return new Likes(
                likeData.name,
                likeData.lastName
        )
    })
    post.displayDefaultComments();
    post.displayDefaultLikes();
    post.displayShowCommentsBtn();
    }
);
