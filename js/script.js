// Function to apply GSAP horizontal scroll when the display width is over 800px
function applyHorizontalScroll() {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".container",
            pin: true,
            scrub: 1,
            //snap: 1 / (sections.length - 1),
            end: () => "+=" + (sections.length - 1) * window.innerWidth,
        },
    });
}

// Check the window width and apply the effect if it's over 800px
if (window.innerWidth > 800) {
    applyHorizontalScroll();
}

// Lenis initialization (always active)
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// Array of titles to rotate
const titles = ["Thank You For Visiting", "Check Out My Projects", "Contact Me Today", "Hi I'm Eryk Sobczak"];
    
let index = 0; // Start from the first title

// Function to change the title
function changeTitle() {
  document.title = titles[index];
  index = (index + 1) % titles.length; // Loop through the array
}

// Change the title every 3 seconds (3000 milliseconds)
setInterval(changeTitle, 3000);


// scrollto
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    }
  
    /**
     * Scroll to an element with smooth scroll
     */
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop;
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth' // Enable smooth scrolling
      });
    }
  
    /**
     * Add smooth scroll on <a> with custom class
     */
    const contactClassLinks = select('.tocontact', true); // Select all links with class 'custom-class'
    contactClassLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        scrollto('#section1'); // Scroll to the element with id 'section1'
      });
    });

    const backClassLinks = select('.totop', true); // Select all links with class 'custom-class'
    backClassLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        scrollto('#section0'); // Scroll to the element with id 'section1'
      });
    });
  
  })();
  
  
