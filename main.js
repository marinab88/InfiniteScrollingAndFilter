// API Information
const url = 'https://jsonplaceholder.typicode.com/posts?';


const postsDisplay = document.getElementById('displayPosts');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// Function that gets Posts and return data
const getPosts = async () => {
  const urlToFetch = `${url}_limit=${limit}&_page=${page}`;
  
  try {  
    const response = await fetch(urlToFetch);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Function that show the posts
const showPosts = async () => {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </div>
        `

        postsDisplay.appendChild(postEl);
    });

    filterPosts();
}

// Function that helps us to filter posts by words
const filterPosts = () => {
    const term = filter.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    console.log(posts);
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// Function that show loader
const showLoading = async () => {
    loading.classList.add('show');
    page++;
    await showPosts();
    loading.classList.remove('show');
}

showPosts();

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight-1) {
        console.log('showing');
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);