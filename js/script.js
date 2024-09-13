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
const titles = ["Welcome to My Website", "Check Out My Projects", "Stay Tuned for More!", "Contact Me Today"];
    
let index = 0; // Start from the first title

// Function to change the title
function changeTitle() {
  document.title = titles[index];
  index = (index + 1) % titles.length; // Loop through the array
}

// Change the title every 3 seconds (3000 milliseconds)
setInterval(changeTitle, 3000);
