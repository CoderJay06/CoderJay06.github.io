/* About Me Section */
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

/* Blogs Section */

// grab .blogs from the dom
const blogsList = document.querySelector(".blogs-list");
const rssFeedUrl =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jay-cruz";

async function fetchBlogs() {
  const request = await fetch(rssFeedUrl);
  const json = request.json();

  return json;
}

function render(blogs, thumbnails) {
  return blogs
    .map((blog, i) => {
      return `
        <div class="blog">
          <a class="blog-link" href=${blog.link}>
            <img class="blog-img" src=${thumbnails[i]} alt="Blog" />
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
  const column1Thumbnails = [
    "https://miro.medium.com/v2/resize:fit:875/0*zh8QjGDXCF925iMI",
    "https://miro.medium.com/v2/resize:fit:875/0*FWQqYc67jd3j2RDV",
    "https://miro.medium.com/v2/resize:fit:779/1*lvgQkkny9aA3RLSAWBSi5w.png",
    "https://miro.medium.com/v2/resize:fit:875/0*t9Z2pITR0Y-Xxlpj",
    "https://miro.medium.com/v2/resize:fit:875/0*8pLVCLaUJBFyWgS5",
  ];
  return render(blogs, column1Thumbnails);
}

function column2(blogs) {
  const column2Thumbnails = [
    "https://miro.medium.com/v2/resize:fit:875/0*NbP5G3dNo8yz76Gr",
    "https://miro.medium.com/v2/resize:fit:875/0*yGXiFy7nd1w4zy6i",
    "https://miro.medium.com/v2/resize:fit:875/0*7JeJaSICdQ0bMd7J",
    "https://miro.medium.com/v2/resize:fit:875/0*Q0H1rZNSlqhF9Fiy",
    "https://miro.medium.com/v2/resize:fit:875/1*kA5wc-ikiYKL0p-MlcWjkA.png",
  ];
  return render(blogs, column2Thumbnails);
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

/* Certs Section */
const slides = document.getElementsByClassName("carousel-item");
const nextButton = document.getElementById("carousel-button-next");
const prevButton = document.getElementById("carousel-button-prev");
const dots = document.getElementsByClassName("dot");
let position = 0;
const numberOfSlides = slides.length;

function hideAllSlides() {
  // remove all slides not currently being viewed
  for (const slide of slides) {
    slide.classList.remove("carousel-item-visible");
    slide.classList.add("carousel-item-hidden");
  }
}

const handleMoveToNextSlide = function (e) {
  hideAllSlides();

  // check if last slide has been reached
  if (position === numberOfSlides - 1) {
    position = 0; // go back to first slide
  } else {
    // move to next slide
    position++;
  }
  // make current slide visible
  slides[position].classList.add("carousel-item-visible");

  // update dot to represent current slide
  dots[position].classList.add("selected-dot");
  dots[position].checked = true;
};

const handleMoveToPrevSlide = function (e) {
  hideAllSlides();

  // check if we're on the first slide
  if (position === 0) {
    position = numberOfSlides - 1; // move to the last slide
  } else {
    // move back one
    position--;
  }
  // make current slide visible
  slides[position].classList.add("carousel-item-visible");

  // update dot to represent current slide
  dots[position].classList.add("selected-dot");
  dots[position].checked = true;
};

// listen for slide change events
nextButton.addEventListener("click", handleMoveToNextSlide);
prevButton.addEventListener("click", handleMoveToPrevSlide);
