import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  createIcons, 
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  ExternalLink,
  Code,
  Server,
  Database,
  Cloud,
  Terminal,
  Bot,
  Layers,
  Zap,
  PenTool,
  Network,
  TrendingUp
} from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// Initialize Lucide Icons
const setupIcons = () => {
    createIcons({
        icons: {
            ArrowRight,
            Sparkles,
            Github,
            Linkedin,
            Mail,
            MessageCircle,
            ExternalLink,
            Code,
            Server,
            Database,
            Cloud,
            Terminal,
            Bot,
            Layers,
            Zap,
            PenTool,
            Network,
            TrendingUp
        }
    });
}

// Minimalist Floating Pill Navbar logic
const setupNavbar = () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Background Glass Depth addition
        if (currentScrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Custom Cursor (Precise dot + Smooth Ring Lerp)
const setupCursor = () => {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isMoving = false;

    // Show cursor elements only after mouse enters the window
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    }, { once: true });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Center dot instantly follows client position
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Spring/lerp logic for the ring
    const render = () => {
        if (isMoving) {
            const lerpFactor = 0.12; // Controls the elastic delay
            ringX += (mouseX - ringX) * lerpFactor;
            ringY += (mouseY - ringY) * lerpFactor;

            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
        }
        requestAnimationFrame(render);
    };
    render();

    // Hover state animations on interactive items
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .bento-card, .channel-item');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        target.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Spotlight Interaction Tracking (Local radial lighting)
const setupSpotlights = () => {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // relative X
            const y = e.clientY - rect.top;  // relative Y
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// GSAP Scroll Animations
const setupAnimations = () => {
    // Hero Section Entrance Timeline
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-tag', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'power3.out' 
    })
    .from('.hero-headline', { 
        opacity: 0, 
        y: 40, 
        duration: 1.2, 
        ease: 'power4.out' 
    }, '-=0.6')
    .from('.hero-subtext', { 
        opacity: 0, 
        y: 20, 
        duration: 1, 
        ease: 'power3.out' 
    }, '-=0.8')
    .from('.hero-ctas', { 
        opacity: 0, 
        y: 15, 
        duration: 0.8, 
        ease: 'power3.out' 
    }, '-=0.8')
    .from('.profile-card', { 
        opacity: 0, 
        scale: 0.96, 
        rotationX: 12,
        rotationY: -6,
        duration: 1.5, 
        ease: 'expo.out' 
    }, '-=0.8');

    // Section Content Entrance Reveal trigger loops
    gsap.utils.toArray('section').forEach(section => {
        if (section.id === 'home') return; // Skip hero since it's already animated on load
        
        const header = section.querySelector('.section-header');
        const contents = section.querySelectorAll('.journey-grid, .case-study-item, .skills-bento-grid, .exploring-bento-grid, .luxury-contact-card');
        
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        if (header) {
            timeline.from(header, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        if (contents.length > 0) {
            timeline.from(contents, {
                opacity: 0,
                y: 45,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5');
        }
    });
}

// Form Submission feedback
const setupForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Message Transmitted</span><i data-lucide="sparkles"></i>';
        submitBtn.style.background = 'rgba(0, 242, 255, 0.15)';
        submitBtn.style.color = 'var(--accent-cyan)';
        submitBtn.style.borderColor = 'var(--accent-cyan)';
        createIcons();

        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            createIcons();
        }, 3000);
    });
}

// Initialize everything on DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    setupIcons();
    setupNavbar();
    setupCursor();
    setupSpotlights();
    setupAnimations();
    setupForm();
});
