import './style.css'
import { createIcons, Code, Layout, Shield, Github, Linkedin, Cpu, Globe, Zap, GitBranch, Layers } from 'lucide'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Initialize Icons
createIcons({
    icons: {
        Code,
        Layout,
        Shield,
        Github,
        Linkedin,
        Cpu,
        Globe,
        Zap,
        GitBranch,
        Layers
    }
})

// Custom Icons for highlights and skills
const setupIcons = () => {
    const iconFocus = document.getElementById('icon-focus')
    if (iconFocus) iconFocus.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>'
    
    const iconInterest = document.getElementById('icon-interest')
    if (iconInterest) iconInterest.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>'

    const iconStrength = document.getElementById('icon-strength')
    if (iconStrength) iconStrength.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>'

    const skillIcons = {
        'icon-js': '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M3 3h18v18H3V3zm16.525 13.83c-.072-.387-.403-.635-.909-.635-.351 0-.605.193-.605.463 0 .21.144.331.455.451l.542.21c.903.351 1.258.802 1.258 1.554 0 1.056-.81 1.743-2.115 1.743-1.256 0-1.954-.537-2.148-1.425h1.101c.125.463.483.743 1.033.743.435 0 .802-.218.802-.634 0-.306-.21-.468-.693-.677l-.548-.234c-.814-.347-1.169-.766-1.169-1.507 0-1.008.774-1.685 1.935-1.685 1.153 0 1.806.516 1.992 1.418h-1.081zm-4.305 4.17h-1.129v-5.22h1.129v5.22zm-1.129-6.387c0-.363.29-.653.653-.653.363 0 .653.29.653.653 0 .363-.29.653-.653.653-.363 0-.653-.29-.653-.653z"/></svg>',
        'icon-react': '<svg viewBox="-11.5 -10.23174 23 20.46348" width="40" height="40"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>',
        'icon-html': '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
        'icon-css': '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>', // Simplified CSS icon
        'icon-git': '<svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0l-1.447 1.447L12.7 5.1a2.25 2.25 0 0 1 3.2 3.2l3.2 3.2a2.25 2.25 0 0 1 0 3.2l-3.2 3.2a2.25 2.25 0 1 1-3.2-3.2l-3.2-3.2a2.25 2.25 0 1 1-3.2-3.2L1.454 9.452a1.5 1.5 0 0 0 0 2.122l10.479 10.479a1.5 1.5 0 0 0 2.122 0l10.49-10.49a1.5 1.5 0 0 0 0-2.121z"/></svg>'
    }

    for (const [id, svg] of Object.entries(skillIcons)) {
        const el = document.getElementById(id)
        if (el) el.innerHTML = svg
    }
}

// Custom Cursor
const setupCursor = () => {
    const dot = document.querySelector('.cursor-dot')
    const outline = document.querySelector('.cursor-outline')

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX
        const posY = e.clientY

        gsap.to(dot, { x: posX, y: posY, duration: 0.1 })
        gsap.to(outline, { x: posX - 16, y: posY - 16, duration: 0.3 })
    })

    document.querySelectorAll('a, button, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(outline, { scale: 1.5, borderColor: '#00f2ff', duration: 0.3 })
            gsap.to(dot, { scale: 0.5, duration: 0.3 })
        })
        el.addEventListener('mouseleave', () => {
            gsap.to(outline, { scale: 1, borderColor: '#00f2ff', duration: 0.3 })
            gsap.to(dot, { scale: 1, duration: 0.3 })
        })
    })
}

// Animations
const setupAnimations = () => {
    // Hero Entrance Timeline
    const tl = gsap.timeline()
    
    tl.to('.hero-content .profile-container', { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' })
      .to('.hero-content h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .to('.hero-content h1', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.hero-content p', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.cta-group', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.scroll-indicator', { opacity: 1, duration: 1 }, '-=0.4')

    // Reveal sections on scroll
    gsap.utils.toArray('section:not(.hero)').forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
    })

    // Hero content floating effect
    gsap.to('.hero-content', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    })

    // Background glow movement
    gsap.to('.glow-1', {
        x: '20%',
        y: '10%',
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })

    gsap.to('.glow-2', {
        x: '-20%',
        y: '-10%',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    })
}

// Smooth Scrolling
const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                })
            }
        })
    })
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    setupIcons()
    setupCursor()
    setupAnimations()
    setupSmoothScroll()
})
