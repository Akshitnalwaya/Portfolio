document.addEventListener('DOMContentLoaded', () => {
    /* --- Preloader --- */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  
    /* --- Initialize AOS --- */
    AOS.init({
      duration: 800,
      once: true
    });
  
    /* --- Burger Menu Toggle --- */
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('toggle');
    });
  
    /* --- Smooth Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    /* --- Typed Text Effect --- */
    const typedElement = document.getElementById('typed');
    const typedTexts = ['Web Developer', 'Designer', 'Innovative Creator'];
    let typedIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBetweenWords = 2000;
  
    function type() {
      const currentText = typedTexts[typedIndex];
      if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          typedIndex = (typedIndex + 1) % typedTexts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, deletingSpeed);
        }
      } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(type, delayBetweenWords);
        } else {
          setTimeout(type, typingSpeed);
        }
      }
    }
    type();
  
    /* --- Portfolio Filtering --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; }, 100);
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  
    /* --- Portfolio Modal Functionality --- */
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
  
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').getAttribute('src');
        const title = item.querySelector('.portfolio-info h3').textContent;
        const desc = item.querySelector('.portfolio-info p').textContent;
        modalImg.setAttribute('src', imgSrc);
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.style.display = 'flex';
      });
    });
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    /* --- Counter Animation --- */
    const counters = document.querySelectorAll('.counter h3');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  
    /* --- Back to Top Button --- */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* --- ParticlesJS Configuration --- */
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": "#ffffff" },
        "shape": {
          "type": "circle",
          "stroke": { "width": 0, "color": "#000000" },
          "polygon": { "nb_sides": 5 }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": { "enable": true, "mode": "repulse" },
          "onclick": { "enable": true, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
          "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
          "repulse": { "distance": 100, "duration": 0.4 },
          "push": { "particles_nb": 4 },
          "remove": { "particles_nb": 2 }
        }
      },
      "retina_detect": true
    });
  });
  
// Form submission logic
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    };

    try {
      const response = await fetch("/api/submit", { // updated route
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.message || "Submitted!");
      contactForm.reset(); // clear form
    } catch (err) {
      alert("Error submitting the form. Please try again later.");
      console.error(err);
    }
  });
}
