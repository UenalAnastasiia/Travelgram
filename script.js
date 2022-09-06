loadFromLocalStorage();


function loadStories() {
    document.getElementById('stories-box').innerHTML = '';

    for (i = 0; i < storiesImg.length; i++) {

        document.getElementById('stories-box').innerHTML += /*html*/ `
          <div class="storie-element">
                <a class="cursor effect" href=""><img src="${storiesImg[i]}"></a>
                <span class="cursor effect">${storiesName[i]}</span>
            </div>  
        `;
    }
}


function loadFollowerProfile() {
    document.getElementById('follower-profile').innerHTML = '';

    for (i = 0; i < followerProfilesImg.length; i++) {

        document.getElementById('follower-profile').innerHTML += /*html*/ `
        <div class="follower-box">
            <div class="follower-profile-name-img">
                <a class="cursor effect" href=""><img src="${followerProfilesImg[i]}"></a>
                <span class="cursor effect">${followerProfilesName[i]}</span>
            </div> 
            <span class="follower-elm effect cursor">Folgen</span> 
        </div>
        `;
    }
}


function loadContent() {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let newCommentArea = i;
        let comment = 100 + i;

        content.innerHTML += /*html*/ generatePostHTML(post, newCommentArea, comment, i);

        showNewComment(i, newCommentArea);
    }
}


function generatePostHTML(post, newCommentArea, comment, i) {
    return /*html*/ `
    <div class="content-post">
        <div class="profile">
            <div class="profile-box">
                <img class="profile-img effect cursor" src="${post['profile-image']}">
                <div>
                <span class="post-name effect cursor">${post['name']}</span> <br>
                <span class="post-location">${post['location']}</span>
                </div>
            </div>
            <div>
                <a href=""><img class="point-img effect cursor" src="img/point.svg"></a>
            </div>
        </div>
        <img class="post-image" src="${post['image']}">
        <div class="post-icons">
            <div class="like-box-icons">
                <img onclick="changeHeartColor()" id="heart-img" class="effect cursor" src="img/heart.svg">
                <img class="effect cursor" src="img/icon-plane.png">
                <img class="effect cursor" src="img/message.svg">
            </div>
            <img onclick="changeSaveColor()" id="save-img" class="effect cursor save-icon" src="img/save-white.png">
        </div>
        <span class="like-amount">Gefällt ${post['like']} Mal</span>
        <div class="post-name-description">
            <span class="effect cursor"> <b> ${post['name']} </b> </span>
            <span>${post['description']}</span>
        </div>
        <div class="comment-box">
                <span class="cursor effect"> <b> ${post['comment-profile1']} </b> </span>
                <span>${post['comment1']}</span> <br>
                <span class="cursor effect"> <b> ${post['comment-profile2']} </b> </span>
                <span>${post['comment2']}</span>
        </div>
        <div id="${newCommentArea}"> </div> 
        <span class="post-time">${post['time']}</span>
        <div class="new-comment-box">
            <img src="img/palm.png">
            <input id="${comment}" type="text" placeholder="Kommentieren...">
            <span class="effect cursor" onclick="addNewComment('${i}', '${comment}')" >Posten</span>
        </div>
    </div>
    `;
}


function addNewComment(i, comment) {
    let text = document.getElementById(comment).value;

    if (text.length == "") {
        alert('Bitte Kommentar schreiben!');
    } else {
        posts[i]['newComments'].push(text);
        saveInLocalStorage();
        loadContent();
    }
}


function showNewComment(postsNumber, newCommentArea, comment) {
    newCommentArea = document.getElementById(newCommentArea);

    newCommentArea.innerHTML = '';
    for (let i = 0; i < posts[postsNumber]['newComments'].length; i++) {
        newCommentArea.innerHTML += `
        <div class="comment-text">
            <span> <b>nastya_uenal</b> ${posts[postsNumber]['newComments'][i]}</span>
        </div>
    `;
    }
}

/*
function changeHeartColor() {
    document.getElementById('heart-img').src = "img/red-heart.png";
}


function changeSaveColor() {
    document.getElementById('save-img').src = "img/save-black.png";
} */


function saveInLocalStorage() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);
}


function loadFromLocalStorage() {
    let postsAsText = localStorage.getItem('posts');
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


function noFunction() {
    alert('Die Funktion ist leider nicht verfügbar...');
}