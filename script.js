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
    if(addPostInput.value){
        const post = new Post(addPostInput.value, getTime);
        manageUser.pushPostInArray(post);
        manageUser.displayPost(post);
        post.setCommentsAndLikesToArray();
        addPostInput.value = '';
    }
})

posts.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const postId = e.target.closest('li').id;
    const post = e.target.closest('li');
    const comments = post.querySelector('.comments');
    const commentInputField = form.querySelector('input');
    let commentInput = commentInputField.value

    manageUser.setAcitvePost(manageUser.findPostById(postId));
    const activePost = manageUser.getActivePost();
    if(commentInput) {
        const comment = new Comment(commentInput, 'Bernard', 'Krehula', 'IMG_8725.JPG');   
        activePost.pushCommentInArray(comment);
        comment.displayComment(comment, comments);
        commentInputField.value = '';
    }
})

posts.addEventListener('click', (e) => {
    const commentBtn = e.target.closest('h5');
    const post = e.target.closest('li');
    const comments = post.querySelector('.comments');
    const btn = e.target.closest('button');
    const postId = e.target.closest('li').id;
    const dots = e.target.closest('svg');
    const dotsContent = post.querySelector('.dots-content');
    const editPostInput = post.querySelector('.post-value');
    const selectedComment = e.target.closest('div');
    const dotsMenu = selectedComment.querySelector('.dots-contentComments');

    manageUser.setAcitvePost(manageUser.findPostById(postId));
    const activePost = manageUser.getActivePost();
    if(btn){
        switch(btn.className){
            case 'like':
            const likes = new Likes('Bernard', 'Krehula');
            activePost.pushLikeInArray(likes);
            break;
        case 'edit':
            manageUser.editPost(manageUser.getActivePost());
            break;
        case 'delete':
            manageUser.removePost();
            manageUser.removePostFromScreen();
            break;
        case 'saveBtn':
            manageUser.editActivePostContent(editPostInput.value);
            manageUser.saveEditedPost(manageUser.getActivePost());
            break;
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
        if(dots.className.baseVal === 'dot'){
            e.stopPropagation();
            if(dotsContent.style.display === 'none'){
                dotsContent.style.display = 'block';
            }
            else {
                dotsContent.style.display = 'none';
            }
        }
        if(dots.className.baseVal === 'commentDot'){ 
            if(dotsMenu.style.display === 'none'){
                dotsMenu.style.display = 'block';
            }
            else {
                dotsMenu.style.display = 'none';
            }
        }
    }
})
document.addEventListener('click', (e) => {
    const dotsMenus = document.querySelectorAll('.dots-content');
    dotsMenus.forEach(menu => {
        if (!e.target.closest('.dot') && !e.target.closest('.dots-content')) {
            menu.style.display = 'none';
        }
    });
});
