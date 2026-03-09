const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

const leftArrow = document.querySelector(".gallery-arrow.left");
const rightArrow = document.querySelector(".gallery-arrow.right");

const heroImage = document.querySelector(".hero-image");
const zoomPreview = document.querySelector(".zoom-preview");
const zoomLens = document.querySelector(".zoom-lens");

let currentIndex = 0;

/* ---------------------------
   UPDATE MAIN IMAGE
--------------------------- */

function updateImage() {

  const newSrc = thumbs[currentIndex].querySelector("img").src;

  mainImage.src = newSrc;

  zoomPreview.style.backgroundImage = `url(${newSrc})`;

  document.querySelector(".thumb.active")?.classList.remove("active");

  thumbs[currentIndex].classList.add("active");

  thumbs[currentIndex].scrollIntoView({
    behavior:"smooth",
    inline:"center",
    block:"nearest"
 });

}


/* ---------------------------
   THUMB CLICK
--------------------------- */

thumbs.forEach((thumb, index) => {

  thumb.addEventListener("click", () => {

    currentIndex = index;

    updateImage();

  });

});


/* ---------------------------
   RIGHT ARROW
--------------------------- */

rightArrow.addEventListener("click", () => {

  currentIndex++;

  if (currentIndex >= thumbs.length) {
    currentIndex = 0;
  }

  updateImage();

});


/* ---------------------------
   LEFT ARROW
--------------------------- */

leftArrow.addEventListener("click", () => {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = thumbs.length - 1;
  }

  updateImage();

});


/* ---------------------------
   ZOOM EFFECT
--------------------------- */

heroImage.addEventListener("mousemove", (e) => {

  const rect = heroImage.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  /* Show preview */
  zoomPreview.style.display = "block";

  zoomPreview.style.backgroundImage = `url(${mainImage.src})`;

  zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;


  /* Move lens */

  zoomLens.style.display = "flex";

  const lensWidth = zoomLens.offsetWidth / 2;
  const lensHeight = zoomLens.offsetHeight / 2;

  zoomLens.style.left = `${x - lensWidth}px`;
  zoomLens.style.top = `${y - lensHeight}px`;

});


/* ---------------------------
   HIDE ZOOM WHEN LEAVE
--------------------------- */

heroImage.addEventListener("mouseleave", () => {

  zoomPreview.style.display = "none";
  zoomLens.style.display = "none";

});



// Faq section

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    /* close all */
    faqItems.forEach((faq) => faq.classList.remove("active"));

    /* reopen clicked one */
    if(!isActive){
      item.classList.add("active");
    }

  });

});