import { manageUser } from "./socialMediaManager.js";
import { Post } from "./socialMediaManager.js";
import { Comment } from "./socialMediaManager.js"
import { Likes } from "./socialMediaManager.js";

const searchBar = document.querySelector('.findFriendsBar input');
export const searchFriendsList = document.querySelector('.searchFriends');
export const friendListImages = document.querySelector('.friend-images');
const addPostBtn = document.querySelector('.addPost button');
const addPostInput = document.querySelector('.addPost input');
export const posts = document.querySelector('.posts');
export const feed = document.querySelector('.feed');

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

posts.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const postId = e.target.closest('li').id;
    const post = e.target.closest('li');
    const comments = post.querySelector('.comments');
    let commentInput = form.querySelector('input').value;

    manageUser.setAcitvePost(manageUser.findPostById(postId));
    const activePost = manageUser.getActivePost();
    const comment = new Comment(commentInput, 'Bernard', 'Krehula', 'IMG_8725.JPG');
    activePost.pushCommentInArray(comment);
    comment.displayComment(comment, comments);
})

posts.addEventListener('click', (e) => {
    const commentBtn = e.target.closest('h5');
    const post = e.target.closest('li');
    const comments = post.querySelector('.comments');
    const btn = e.target.closest('button');
    const postId = e.target.closest('li').id;
    const dots = post.querySelector('.dot');
    const dostContent = post.querySelector('.dots-content');

    manageUser.setAcitvePost(manageUser.findPostById(postId));
    const activePost = manageUser.getActivePost();
    if(btn){
        if(btn.className === 'like'){
                const likes = new Likes('Bernard', 'Krehula');
                activePost.pushLikeInArray(likes);
            }
    }
   
    if(commentBtn){
        if(comments.style.display === 'none'){
            comments.style.display = 'block'
        }
        else{
            comments.style.display = 'none';
        }
    }
    if(dots){
        console.log(dostContent)
        if(dostContent.style.display === 'none'){
            dostContent.style.display = 'block';
        }
        else {
            dostContent.style.display = 'none'
        }
    }
    if(btn){
        if(btn.className == 'edit'){
        console.log('radi')

        }
        if(btn.className == 'delete'){
        }
    }
})