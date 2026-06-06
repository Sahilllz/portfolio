import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  createIcons, 
  Monitor, 
  Cpu, 
  Code, 
  FileCode, 
  Database, 
  Globe, 
  GitBranch, 
  Figma, 
  Terminal,
  ExternalLink,
  ChevronRight,
  Mail,
  Linkedin,
  Github,
  Zap,
  Layers,
  Instagram,
  Search,
  PenTool,
  Network,
  Bot
} from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// Initialize Icons
const setupIcons = () => {
    createIcons({
        icons: {
            Monitor,
            Cpu,
            Code,
            FileCode,
            Database,
            Globe,
            GitBranch,
            Figma,
            Terminal,
            ExternalLink,
            ChevronRight,
            Mail,
            Linkedin,
            Github,
            Zap,
            Layers,
            Instagram,
            Search,
            PenTool,
            Network,
            Bot
        }
    });

    // Project Icons
    const icons = {
        'icon-external': '<i data-lucide="external-link" size="18"></i>',
        'icon-case': '<i data-lucide="chevron-right" size="18"></i>'
    };

    for (const [id, html] of Object.entries(icons)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
    
    // Refresh Lucide for dynamic elements
    createIcons();
}

// Navbar Scroll Effect
const setupNavbar = () => {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Background Cursor Effect
const setupBackgroundEffect = () => {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    });
}

// Animations
const setupAnimations = () => {
    // Hero Entrance
    const heroTl = gsap.timeline();
    heroTl.from('.hero-content h3', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' })
          .from('.hero-content h2', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' }, '-=0.8')
          .from('.hero-content p', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' }, '-=0.8')
          .from('.btn-group', { opacity: 0, y: 30, duration: 1, ease: 'power4.out' }, '-=0.8')
          .from('.hero-image-container', { opacity: 0, scale: 0.9, duration: 1.5, ease: 'expo.out' }, '-=1');

    // Section Reveals
    gsap.utils.toArray('section:not(.hero)').forEach(section => {
        gsap.from(section.querySelectorAll('.container > *'), {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// Initialize
window.addEventListener('load', () => {
    setupIcons();
    setupNavbar();
    setupBackgroundEffect();
    setupAnimations();
});
