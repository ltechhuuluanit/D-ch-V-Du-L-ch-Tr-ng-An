// ===== DỊCH VỤ DU LỊCH TRƯỜNG AN - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  // Fallback: hide preloader after 3 seconds regardless
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3000);

  // ===== PARTICLES =====
  const particlesContainer = document.getElementById('particles');
  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.width = (Math.random() * 4 + 1) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');
  const backTop = document.getElementById('back-top');

  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Header
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top
    if (scrollY > 500) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
    
    // Active nav link
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll);

  // Back to top click
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Add stagger delay to siblings
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = parent.querySelectorAll('.reveal, .reveal-left, .reveal-right');
          siblings.forEach((sibling, index) => {
            sibling.style.transitionDelay = (index * 0.1) + 's';
          });
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.count, .stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (!target) return;
      
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + '+';
        }
      }, 16);
    });

    countersAnimated = true;
  }

  const counterSection = document.getElementById('counter-section');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  }

  // Also observe hero stats
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = heroStats.querySelectorAll('.stat-number');
          statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;
            
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current) + '+';
              }
            }, 16);
          });
        }
      });
    }, { threshold: 0.3 });

    heroObserver.observe(heroStats);
  }

  // ===== FLEET GALLERY TABS =====
  const fleetTabs = document.querySelectorAll('.fleet-tab');
  const fleetItems = document.querySelectorAll('.fleet-item');

  fleetTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      fleetTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      fleetItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  let currentImageIndex = 0;
  let galleryImages = [];

  // Collect all gallery images
  function updateGalleryImages() {
    galleryImages = [];
    fleetItems.forEach(item => {
      if (item.style.display !== 'none') {
        galleryImages.push(item.querySelector('img').src);
      }
    });
  }

  fleetItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      updateGalleryImages();
      const imgSrc = item.querySelector('img').src;
      currentImageIndex = galleryImages.indexOf(imgSrc);
      lightboxImg.src = imgSrc;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex];
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentImageIndex];
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentImageIndex];
    }
  });

  // ===== TESTIMONIAL SLIDER =====
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;
  const totalTestimonials = document.querySelectorAll('.testimonial-card').length;

  function goToTestimonial(index) {
    currentTestimonial = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimonial(index));
  });

  // Auto-play testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    goToTestimonial(currentTestimonial);
  }, 5000);

  // Touch support for testimonials
  let touchStartX = 0;
  let touchEndX = 0;
  
  const slider = document.getElementById('testimonial-slider');
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      } else {
        // Swipe right
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
      }
      goToTestimonial(currentTestimonial);
    }
  }

  // ===== TYPING EFFECT (Hero Badge) =====
  // Optional: adds a subtle typing effect to the hero title

  // ===== PARALLAX EFFECT =====
  const heroBg = document.querySelector('.hero-bg img');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const scrolled = window.scrollY;
      if (heroBg) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0002}) translateY(${scrolled * 0.3}px)`;
      }
    }
  });

  // ===== SERVICE CARDS HOVER EFFECT =====
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.background = 'linear-gradient(180deg, rgba(26,35,50,1) 0%, rgba(26,82,118,0.15) 100%)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.background = '';
    });
  });

  // ===== LAZY LOAD IMAGES =====
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== ACCESSIBILITY - Focus management =====
  document.querySelectorAll('.fleet-item, .service-card, .why-card, .pricing-card').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        el.click();
      }
    });
  });

  // ===== GOOGLE MAPS ENHANCEMENT =====
  // Apply better styling to the map on load
  const mapIframe = document.querySelector('.contact-map iframe');
  if (mapIframe) {
    mapIframe.addEventListener('load', () => {
      mapIframe.style.filter = 'brightness(0.8) contrast(1.1) saturate(0.9)';
    });
  }

  // ===== SERVICE CONTACT TOGGLE =====
  const contactToggles = document.querySelectorAll('.btn-contact-toggle');
  
  contactToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = toggle.closest('.service-contact-wrapper');
      
      // Close all others first
      document.querySelectorAll('.service-contact-wrapper').forEach(w => {
        if (w !== wrapper) w.classList.remove('active');
      });
      
      wrapper.classList.toggle('active');
    });
  });
  
  // Close when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.service-contact-wrapper').forEach(w => {
      w.classList.remove('active');
    });
  });

  // ===== PERFORMANCE - Throttle scroll events =====
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== PROMO POPUP =====
  const promoPopup = document.getElementById('promo-popup');
  const promoClose = document.getElementById('promo-close');
  
  if (promoPopup && promoClose) {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('promoPopupShown');
    
    if (!popupShown) {
      setTimeout(() => {
        promoPopup.classList.add('active');
        sessionStorage.setItem('promoPopupShown', 'true');
      }, 5000); // Show after 5 seconds
    }
    
    promoClose.addEventListener('click', () => {
      promoPopup.classList.remove('active');
    });
    
    promoPopup.addEventListener('click', (e) => {
      if (e.target === promoPopup) {
        promoPopup.classList.remove('active');
      }
    });
  }

  console.log('🚗 Dịch Vụ Du Lịch Trường An - Website loaded successfully!');
  console.log('📞 Hotline: 0838 385 045 | 0563 852 884');
});
