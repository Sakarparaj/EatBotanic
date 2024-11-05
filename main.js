const navCloseEl = document.querySelector('.nav__close');
const navList = document.querySelector('.nav__list');
const navIconEl = document.querySelector('.nav__icon');
const navBgOverlayEl = document.querySelector('.nav__bgOverlay');


window.addEventListener('DOMContentLoaded', () =>{
  document.body.style.visibility = 'visible';
});

const navOpen = () => {
   navList.classList.add('show');
  navBgOverlayEl.classList.add('active');
  document.body.style= 'visibility: visible; height: 100vh; width:100vw; overflow:hidden;';
}

const navClose = () => {
  navList.classList.remove('show');
  navBgOverlayEl.classList.remove('active');
  document.body.style= 'visibility: visible; height: initial; width: 100%; overflow-x: hidden;';
}

navIconEl.addEventListener('click', navOpen);

navCloseEl.addEventListener('click', navClose);

navBgOverlayEl.addEventListener('click', navClose)

// AOS
// AOS.refreshHard();
AOS.init({
  offset: 200, // offset (in px) from the original trigger point
  delay: 100, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// const dishGridEl = Array.from(document.querySelectorAll('#dishGrid'));
// if (dishGridEl.length > 0){
//   // console.log(dishGridEl)
//   dishGridEl.forEach(item => {
//     item.setAttribute('data-aos', 'fade-up');
//   })
// }

/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
    Image slider
 */


var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000); // Change image every 3 seconds
}


/**
    MENU TAB
 */



function openMenu(evt, menuName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(menuName).style.display = "block";
    if (evt) {
        evt.currentTarget.classList.add("active");
    }
}

// Default to displaying the first tab when the page loads
document.addEventListener("DOMContentLoaded", function() {
    openMenu(null, 'Breakfast');
});




//GALLERY

const gallery = document.querySelector('.gallery');
        const modal = document.getElementById('imageModal');
        const modalImg = modal.querySelector('.modal-image');
        const closeBtn = modal.querySelector('.close');
        const fullscreenBtn = modal.querySelector('.fullscreen');
        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        let currentImageIndex = 0;
        const images = Array.from(document.querySelectorAll('.gallery-item img'));

        // Open modal
        gallery.addEventListener('click', (e) => {
            const clickedItem = e.target.closest('.gallery-item');
            if (clickedItem) {
                const img = clickedItem.querySelector('img');
                modal.style.display = 'block';
                modalImg.src = img.src;
                currentImageIndex = images.indexOf(img);
            }
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });

        // Fullscreen toggle
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                modal.requestFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-expand', 'fa-compress');
            } else {
                document.exitFullscreen();
                fullscreenBtn.querySelector('i').classList.replace('fa-compress', 'fa-expand');
            }
        });

        // Previous image
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentImageIndex].src;
        });

        // Next image
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            modalImg.src = images[currentImageIndex].src;
        });
  let slideshowInterval;
        let isSlideshow = false;
        let currentIndex = 0;

        const startSlideshow = () => {
            isSlideshow = true;
            slideshowInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                modalImg.src = images[currentIndex].src;
                slideShowProgress.textContent = `${currentIndex + 1}/${images.length}`;
                slideShowTimer.querySelector('.slideshow-timer-progress').style.width = '0%';
                void slideShowTimer.offsetWidth; // Trigger reflow to restart the animation
                slideShowTimer.querySelector('.slideshow-timer-progress').style.width = '100%';
            }, 5000);
            slideshowBtn.innerHTML = '<i class="fas fa-pause"></i>';
            slideshowBtn.dataset.tooltip = 'Pause Slideshow';
        };

        const pauseSlideshow = () => {
            isSlideshow = false;
            clearInterval(slideshowInterval);
            slideshowBtn.innerHTML = '<i class="fas fa-play"></i>';
            slideshowBtn.dataset.tooltip = 'Start Slideshow';
        };

        const slideshowBtn = document.createElement('button');
        slideshowBtn.classList.add('control-button', 'slideshow');
        slideshowBtn.dataset.tooltip = 'Start Slideshow';
        slideshowBtn.innerHTML = '<i class="fas fa-play"></i>';
        slideshowBtn.addEventListener('click', () => {
            if (isSlideshow) {
                pauseSlideshow();
            } else {
                startSlideshow();
            }
        });

        // Add the slideshow button to the control panel
        const controlPanel = modal.querySelector('.control-panel');
        controlPanel.insertBefore(slideshowBtn, prevBtn);

        // Create slideshow progress and timer elements
        const slideShowProgress = document.createElement('div');
        slideShowProgress.classList.add('slideshow-progress');

        const slideShowTimer = document.createElement('div');
        slideShowTimer.classList.add('slideshow-timer');
        const slideShowTimerProgress = document.createElement('div');
        slideShowTimerProgress.classList.add('slideshow-timer-progress');
        slideShowTimer.appendChild(slideShowTimerProgress);

        // Handle fullscreen change
        document.addEventListener('fullscreenchange', () => {
            const icon = fullscreenBtn.querySelector('i');
            const modalClass = modal.classList;
            if (document.fullscreenElement) {
                icon.classList.replace('fa-expand', 'fa-compress');
                modalClass.add('fullscreen');
                modal.appendChild(slideShowProgress);
                modal.appendChild(slideShowTimer);
            } else {
                icon.classList.replace('fa-compress', 'fa-expand');
                modalClass.remove('fullscreen');
                modal.removeChild(slideShowProgress);
                modal.removeChild(slideShowTimer);
                if (isSlideshow) {
                    pauseSlideshow();
                }
            }
        });

        // Handle other control button clicks
        const controlButtons = modal.querySelectorAll('.control-button:not(.slideshow)');
        controlButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (isSlideshow) {
                    pauseSlideshow();
                }
            });
        });