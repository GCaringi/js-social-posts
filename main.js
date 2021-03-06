const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


/*---------------
     FUNCTIONS
----------------*/


function initials(user){
    return user.split(" ")[0][0] + " " + user.split(" ")[1][0];
}

function italianDate(date){
    return date.split("-")[2] + "-" + date.split("-")[1] + "-" + date.split("-")[0];
}

function pubblishPost(post, homepage){
    const postEl = document.querySelector("#tpl-post").content.cloneNode(true);
    if (post.author.image === null){
        postEl.querySelector(".profile-pic").remove();

        const defaultPic = document.createElement("div");
        const defaultContent = document.createElement("span");
        
        defaultContent.innerHTML = initials(post.author.name);
        
        defaultPic.classList.add("profile-pic-default");
        defaultPic.append(defaultContent);

        postEl.querySelector(".post-meta__icon").append(defaultPic);
        
    }else{
        postEl.querySelector(".profile-pic").src = post.author.image;
        postEl.querySelector(".profile-pic").alt = post.author.name;
    }

    postEl.querySelector(".post-meta__author").innerHTML = post.author.name;
    postEl.querySelector(".post-meta__time").innerHTML = italianDate(post.created);
    postEl.querySelector(".post__text").innerHTML = post.content;
    postEl.querySelector(".post__image img").src = post.media;
    postEl.querySelector(".js-likes-counter").innerHTML = post.likes;
    postEl.querySelector(".js-likes-counter").id = `like-counter-${post.id-1}`;
    postEl.querySelector(".js-like-button").dataset.postid = post.id-1;
    homepage.append(postEl);
}

/*---------------
     MAIN
----------------*/
const postContainer = document.getElementById("container");

for (let i = 0; i < posts.length; i++){
    pubblishPost(posts[i], postContainer);
}

const allBtn = document.getElementsByClassName("js-like-button");
for (let i = 0; i < allBtn.length; i++){
    const likeBtn = allBtn[i];
    likeBtn.addEventListener("click", 
        function(){
            const id = likeBtn.getAttribute("data-postid");
            const counter = document.getElementById(`like-counter-${(posts[id].id-1)}`);
            if (likeBtn.classList.contains("like-button--liked")){
                counter.innerHTML = String(Number(counter.innerHTML) - 1);
                posts[id].likes -= 1;
                likeBtn.classList.remove("like-button--liked");
            }else{
                counter.innerHTML = String(Number(counter.innerHTML) + 1);
                likeBtn.classList.add("like-button--liked");
                posts[id].likes += 1;
            }
        }
    )
}