// Header Scroll Script

let lastScroll = 0;
const header = document.querySelector(".header");
const threshold = window.innerHeight * 0.8;
const scrollDelta = 10; // ignore small scrolls

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Shadow
  if (currentScroll > threshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Ignore tiny scroll
  if (Math.abs(currentScroll - lastScroll) < scrollDelta) return;

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("hide"); // down
  } else {
    header.classList.remove("hide"); // up
  }

  lastScroll = currentScroll;
});

// Carousal and Zoom Script

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

  mainImage.style.opacity = 0;

  setTimeout(() => {
    mainImage.src = newSrc;
    mainImage.style.opacity = 1;
  }, 150);

  zoomPreview.style.backgroundImage = `url(${newSrc})`;

  document.querySelector(".thumb.active")?.classList.remove("active");
  thumbs[currentIndex].classList.add("active");

  thumbs[currentIndex].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
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

  // zoomPreview.style.backgroundImage = `url(${mainImage.src})`;

  zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;


  /* Move lens */

  zoomLens.style.display = "flex";

  const lensWidth = zoomLens.offsetWidth / 2;
const lensHeight = zoomLens.offsetHeight / 2;

let lensX = x - lensWidth;
let lensY = y - lensHeight;

// clamp inside image
lensX = Math.max(0, Math.min(lensX, rect.width - zoomLens.offsetWidth));
lensY = Math.max(0, Math.min(lensY, rect.height - zoomLens.offsetHeight));

zoomLens.style.left = `${lensX}px`;
zoomLens.style.top = `${lensY}px`;

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
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-answer").style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});


// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 300);
});


// application slider

const slider = document.querySelector('.applications-slider');
const prevBtn = document.querySelector('.app-prev');
const nextBtn = document.querySelector('.app-next');

const card = document.querySelector('.application-card');
const gap = 24;
const scrollAmount = card.offsetWidth + gap;

/* NEXT */
nextBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

/* PREV */
prevBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

/* BUTTON STATE */
function updateButtons() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  prevBtn.disabled = slider.scrollLeft <= 0;
  nextBtn.disabled = slider.scrollLeft >= maxScrollLeft - 1;
}

/* EVENTS */
slider.addEventListener('scroll', updateButtons);
window.addEventListener('load', updateButtons);
window.addEventListener('resize', updateButtons);



// process slider

const tabs = document.querySelectorAll(".process-tab");
const title = document.querySelector(".process-text h3");
const desc = document.querySelector(".process-text p");
const featuresList = document.querySelector(".process-features");
const image = document.querySelector(".process-image img");

const processPrevBtn = document.querySelector(".process-prev");
const processNextBtn = document.querySelector(".process-next");

/* ---------- DATA ---------- */
const processData = [
  {
    tab: "Raw Material",
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    features: [
      "PE100 grade material",
      "Optimal molecular weight distribution"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Extrusion",
    title: "Precision Extrusion Process",
    desc: "Advanced extrusion systems ensure uniform pipe thickness and consistent material flow.",
    features: [
      "Uniform wall thickness",
      "High-speed extrusion control"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Cooling",
    title: "Efficient Cooling System",
    desc: "Cooling tanks stabilize the pipe structure and ensure dimensional accuracy.",
    features: [
      "Rapid cooling",
      "Structural stability"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Sizing",
    title: "Accurate Sizing Technology",
    desc: "Precision sizing ensures exact diameter and roundness.",
    features: [
      "High accuracy",
      "Consistent geometry"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Quality Control",
    title: "Strict Quality Control",
    desc: "Each pipe is tested to meet global standards.",
    features: [
      "Continuous inspection",
      "Certified quality"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Marking",
    title: "Automated Marking System",
    desc: "Clear identification with batch and product details.",
    features: [
      "Durable marking",
      "Easy identification"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Cutting",
    title: "Precision Cutting",
    desc: "Accurate cutting ensures uniform pipe length.",
    features: [
      "Clean edges",
      "Exact measurement"
    ],
    image: "assets/images/product.jpg"
  },
  {
    tab: "Packaging",
    title: "Secure Packaging",
    desc: "Products are packed safely for transport.",
    features: [
      "Damage protection",
      "Efficient handling"
    ],
    image: "assets/images/product.jpg"
  }
];

/* ---------- STATE ---------- */
let processCurrentIndex = 0;

/* ---------- UPDATE FUNCTION ---------- */
function updateProcess(index) {
  const data = processData[index];

  // Update text
  title.textContent = data.title;
  desc.textContent = data.desc;

  // Update features
  featuresList.innerHTML = "";
  data.features.forEach(feature => {
    featuresList.innerHTML += `
      <li>
        <img src="assets/icons/check.png" class="feature-icon" alt="">
        <span>${feature}</span>
      </li>
    `;
  });

  // Update image
  image.src = data.image;

  // Update active tab
  tabs.forEach(tab => tab.classList.remove("active"));
  const activeTab = document.querySelector(`[data-tab="${data.tab}"]`);
  if (activeTab) activeTab.classList.add("active");

  // Disable buttons
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === processData.length - 1;
}

/* ---------- TAB CLICK ---------- */
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const tabName = tab.dataset.tab;

    const index = processData.findIndex(item => item.tab === tabName);

    if (index !== -1) {
      processCurrentIndex = index;
      updateProcess(processCurrentIndex);
    }
  });
});

/* ---------- ARROWS ---------- */
processPrevBtn.addEventListener("click", () => {
  if (processCurrentIndex > 0) {
    processCurrentIndex--;
    updateProcess(processCurrentIndex);
  }
});

processNextBtn.addEventListener("click", () => {
  if (processCurrentIndex < processData.length - 1) {
    processCurrentIndex++;
    updateProcess(processCurrentIndex);
  }
});

/* ---------- INIT ---------- */
updateProcess(0);