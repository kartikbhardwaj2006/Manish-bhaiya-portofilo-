var typed = new Typed(".role", {
    strings: ["Full Stack Developer", "Front-End Developer", "Back-End Developer", "MERN Stack Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            const navRight = document.querySelector('nav .right');
            if (navRight && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                const menuIcon = document.getElementById('menu-icon');
                if (menuIcon) {
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                }
            }
        }
    });
});

const menuIcon = document.getElementById('menu-icon');
const navRight = document.querySelector('nav .right');

if (menuIcon && navRight) {
    menuIcon.addEventListener('click', () => {
        navRight.classList.toggle('active');
        
        if (navRight.classList.contains('active')) {
            menuIcon.classList.remove('bx-menu');
            menuIcon.classList.add('bx-x');
        } else {
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
        }
    });

    document.addEventListener('click', (e) => {
        if (!navRight.contains(e.target) && !menuIcon.contains(e.target)) {
            navRight.classList.remove('active');
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
        }
    });
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            this.classList.toggle('flipped');
        }
    });
});

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

const scrollTopBtn = document.getElementById('scrollTopBtn');
const footerIconTop = document.querySelector('.footer-iconTop a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        footerIconTop.classList.add('show');
    } else {
        footerIconTop.classList.remove('show');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skills-content .progress .bar span');
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    const parent = bar.closest('.progress');
                    const percentageSpan = parent.querySelector('h3 span');
                    if (percentageSpan) {
                        const percentage = percentageSpan.textContent.trim();
                        bar.style.width = percentage;
                        bar.classList.add('animate');
                    }
                }, index * 150);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        
        const formData = new FormData(contactForm);
        const formValues = {
            name: formData.get('') || contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="number"]').value,
            subject: contactForm.querySelectorAll('input[type="email"]')[1]?.value,
            message: contactForm.querySelector('textarea').value
        };
        
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message show success';
            
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }, 1500);
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#00ff00';
            } else {
                this.style.borderColor = '#ff4444';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                if (this.checkValidity()) {
                    this.style.borderColor = '#00ff00';
                }
            }
        });
    });
}

console.log("Portfolio Loaded Successfully!")
