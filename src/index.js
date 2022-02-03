const moreAboutMeBtn = document.getElementById("about-me-more-btn");
const moreAboutMeInfo = document.querySelector(".about-me-more-info");
let aboutMeShown = true;

function createMoreAboutMe() {
  return `
        <p>Some of my other interests are investing, stocks, cryptocurrency, and boxing. I've had experience competing as an amateur boxer since my teenage years. Although I do not compete anymore I now bring the same mental determination and humbleness that boxing demanded of me into the world of Software Engineering.</p>
        <img class="about-me-more-img"  src="./images/boxing.jpg" alt="Boxing" />
    `;
}

function setMoreAboutMe(e) {
  if (aboutMeShown) {
    moreAboutMeInfo.innerHTML = createMoreAboutMe();
    aboutMeShown = true;
  } else {
    moreAboutMeInfo.innerHTML = "";
    aboutMeShown = false;
  }

  // set aboutMeShown to be opposite of current state
  aboutMeShown = !aboutMeShown;
}

moreAboutMeBtn.addEventListener("mouseover", setMoreAboutMe);

// grab .blogs from the dom
const blogsList = document.querySelector(".blogs-list");
const rssFeedUrl =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jay-cruz";

async function fetchBlogs() {
  const request = await fetch(rssFeedUrl);
  const json = request.json();

  return json;
}

function render(blogs) {
  return blogs
    .map((blog) => {
      return `
        <div class="blog">
          <a class="blog-link" href=${blog.link}>
            <img class="blog-img" src=${blog.thumbnail} alt="Blog" />
          </a>
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-date">
          Published: ${blog.pubDate.substring(0, blog.pubDate.indexOf(" "))}
          </p>
        </div>
      `;
    })
    .join("");
}

function column1(blogs) {
  return render(blogs);
}

function column2(blogs) {
  return render(blogs);
}

// fetch medium blogs rss feed
fetchBlogs().then((data) => {
  const { items: blogs } = data;

  function getBlogs() {
    return `
      <div class="blogs-column">
        ${column1(blogs.slice(0, 5))}
      </div>
      <div class="blogs-column">
        ${column2(blogs.slice(5, blogs.length))}
      </div>
    `;
  }

  // render each blog to the page
  blogsList.innerHTML = getBlogs();
});

// render the blogs
