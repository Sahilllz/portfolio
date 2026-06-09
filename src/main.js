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
  TrendingUp,
  Instagram,
  Eye,
  RotateCcw,
  BarChart2,
  Activity,
  ChevronDown,
  Keyboard,
  X,
  Clock
} from 'lucide'

gsap.registerPlugin(ScrollTrigger)

let heroTl;

// Simulated/actual preloader count logic
const setupPreloader = () => {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-progress');
    const percentText = document.getElementById('preloader-percent');
    
    if (!preloader || !progressBar || !percentText) return;
    
    let progress = 0;
    const intervalTime = 12;
    
    const updateProgress = () => {
        progress += Math.floor(Math.random() * 4) + 1;
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = `100%`;
            percentText.innerText = `100%`;
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Play hero entrance after preloader finishes
                if (heroTl) heroTl.play();
            }, 400);
        } else {
            progressBar.style.width = `${progress}%`;
            percentText.innerText = `${progress}%`;
            setTimeout(updateProgress, intervalTime);
        }
    };
    
    updateProgress();
}

// Scroll progress bar indicator
const setupScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progressPercentage = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    });
}

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
            TrendingUp,
            Instagram,
            Eye,
            RotateCcw,
            BarChart2,
            Activity,
            ChevronDown,
            Keyboard,
            X,
            Clock
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

    const spotlight = document.getElementById('cursor-spotlight');

    // Show cursor elements only after mouse enters the window
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        if (spotlight) spotlight.style.opacity = '1';
    }, { once: true });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Center dot instantly follows client position
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;

        if (spotlight) {
            gsap.to(spotlight, {
                left: mouseX,
                top: mouseY,
                duration: 0.8,
                ease: 'power2.out'
            });
        }
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
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .explore-card, .channel-item, .skill-tag, .premium-badge');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        target.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

// Spotlight Interaction Tracking (Local radial lighting + 3D depth tilt)
const setupSpotlights = () => {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // relative X
            const y = e.clientY - rect.top;  // relative Y
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Card Tilt Math
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // max 10 degrees tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease';
    });
}

// Subtle count-up counters for Hero Section
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        
        const valObj = { val: 0 };
        gsap.to(valObj, {
            val: target,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
                counter.innerText = `${Math.floor(valObj.val)}+`;
            }
        });
    });
}

// Ambient background drifting animation for blobs
const animateBackgroundBlobs = () => {
    gsap.to('.blob-1', {
        x: '+=60',
        y: '+=40',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.blob-2', {
        x: '-=80',
        y: '+=50',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.blob-3', {
        x: '+=50',
        y: '-=60',
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// GSAP Scroll Animations
const setupAnimations = () => {
    // Start background blob drifting
    animateBackgroundBlobs();

    // Hero Section Entrance Timeline (Restored to target original elements)
    heroTl = gsap.timeline({ paused: true });
    
    heroTl.from('.hero-content h3', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power4.out',
        onStart: animateCounters
    })
    .from('.hero-content h2', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power4.out' 
    }, '-=0.8')
    .from('.hero-content p', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power4.out' 
    }, '-=0.8')
    .from('.btn-group', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power4.out' 
    }, '-=0.8')
    .from('.hero-image-container', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 1.5, 
        ease: 'expo.out' 
    }, '-=1');

    // Section Content Entrance Reveal trigger loops
    gsap.utils.toArray('section').forEach(section => {
        if (section.id === 'home') return; // Skip hero since it's already animated on load
        
        const header = section.querySelector('.section-header, .section-header-left');
        const contents = section.querySelectorAll('.about-grid-premium, .skills-grid-premium, .case-study-item, .exploring-bento-grid, .luxury-contact-card, .philosophy-card');
        
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

// Project diagnostics toggles and tab navigation
const setupDiagnostics = () => {
    const triggers = document.querySelectorAll('.project-diagnostics-btn');
    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const panel = document.getElementById(targetId);
            if (!panel) return;
            
            const isExpanded = panel.classList.contains('expanded');
            
            // Close all diagnostics panels first for clean accordion effect
            document.querySelectorAll('.diagnostics-panel').forEach(p => {
                p.classList.remove('expanded');
                const triggerBtn = document.querySelector(`[data-target="${p.id}"]`);
                if (triggerBtn) triggerBtn.classList.remove('expanded');
            });
            
            if (!isExpanded) {
                panel.classList.add('expanded');
                btn.classList.add('expanded');
                
                // Animate progress fills if in the metrics tab
                const activePane = panel.querySelector('.diag-tab-pane.active');
                if (activePane && activePane.id.includes('metrics')) {
                    const progressFills = activePane.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const targetWidth = fill.style.width || '100%';
                        gsap.fromTo(fill, { width: 0 }, { width: targetWidth, duration: 1, ease: 'power2.out' });
                    });
                }
            }
        });
    });

    const tabBtns = document.querySelectorAll('.diag-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            const nav = btn.parentElement;
            const content = nav.nextElementSibling;
            
            nav.querySelectorAll('.diag-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            content.querySelectorAll('.diag-tab-pane').forEach(p => p.classList.remove('active'));
            const targetPane = content.querySelector(`#${tabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
                
                if (tabId.includes('metrics')) {
                    const progressFills = targetPane.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const targetWidth = fill.style.width || '100%';
                        gsap.fromTo(fill, { width: 0 }, { width: targetWidth, duration: 1, ease: 'power2.out' });
                    });
                }
            }
        });
    });
}

// TypeLabs Interactive typing test engine
const setupTypingDemo = () => {
    const sandboxWrapper = document.getElementById('typing-sandbox-wrapper');
    const textDisplay = document.getElementById('typing-text-display');
    const typingInput = document.getElementById('typing-input');
    const wpmText = document.getElementById('telemetry-wpm');
    const accuracyText = document.getElementById('telemetry-accuracy');
    const latencyText = document.getElementById('telemetry-latency');
    const resultsPanel = document.getElementById('typing-results-panel');
    const heatmapGrid = document.getElementById('latency-heatmap');
    const resetBtn = document.getElementById('btn-reset-typing');

    if (!sandboxWrapper || !textDisplay || !typingInput) return;

    const sampleTexts = [
        "The art of software building is the pursuit of leverage. We write code once to run it a million times, automating intelligence.",
        "High-performance user interfaces require strict state isolation and hardware-accelerated rendering loops for absolute fluid motion.",
        "Building digital systems means balancing speed and architecture. Ship fast, gather real feedback, and refactor with precision."
    ];

    let currentText = sampleTexts[0];
    let startTime = null;
    let keyTimes = [];
    let latencies = [];
    let errors = 0;
    let isComplete = false;

    const initDemo = () => {
        currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        textDisplay.innerHTML = '';
        
        for (let i = 0; i < currentText.length; i++) {
            const charSpan = document.createElement('span');
            charSpan.innerText = currentText[i];
            textDisplay.appendChild(charSpan);
        }
        
        if (textDisplay.firstChild) textDisplay.firstChild.className = 'current';

        typingInput.value = '';
        startTime = null;
        keyTimes = [];
        latencies = [];
        errors = 0;
        isComplete = false;

        wpmText.innerText = '0';
        accuracyText.innerText = '100%';
        latencyText.innerText = '--ms';
        resultsPanel.classList.remove('active');
        heatmapGrid.innerHTML = '';
    };

    sandboxWrapper.addEventListener('click', () => {
        typingInput.focus();
        sandboxWrapper.classList.add('focused');
    });

    typingInput.addEventListener('blur', () => {
        sandboxWrapper.classList.remove('focused');
    });

    typingInput.addEventListener('input', () => {
        if (isComplete) return;

        const typedText = typingInput.value;
        const textSpans = textDisplay.querySelectorAll('span');
        const typedLen = typedText.length;
        
        if (!startTime && typedLen > 0) {
            startTime = Date.now();
            keyTimes.push(startTime);
        }

        if (typedLen > 0) {
            const now = Date.now();
            const prevTime = keyTimes[keyTimes.length - 1];
            const diff = now - prevTime;
            keyTimes.push(now);
            
            if (typedLen >= latencies.length) {
                latencies.push(diff);
            }
        }

        errors = 0;
        for (let i = 0; i < textSpans.length; i++) {
            const span = textSpans[i];
            span.className = '';

            if (i < typedLen) {
                if (typedText[i] === currentText[i]) {
                    span.classList.add('correct');
                } else {
                    span.classList.add('incorrect');
                    errors++;
                }
            } else if (i === typedLen) {
                span.classList.add('current');
            }
        }

        if (startTime) {
            const elapsedMin = (Date.now() - startTime) / 60000;
            const wpm = elapsedMin > 0 ? Math.round((typedLen / 5) / elapsedMin) : 0;
            const accuracy = typedLen > 0 ? Math.round(((typedLen - errors) / typedLen) * 100) : 100;
            const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;

            wpmText.innerText = wpm;
            accuracyText.innerText = `${accuracy}%`;
            latencyText.innerText = `${avgLatency}ms`;
        }

        if (typedLen >= currentText.length) {
            isComplete = true;
            showDiagnosticsReport();
        }
    });

    const showDiagnosticsReport = () => {
        resultsPanel.classList.add('active');
        heatmapGrid.innerHTML = '';
        latencies.forEach((lat, index) => {
            if (index >= currentText.length) return;
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            let color = 'rgba(0, 242, 255, 0.15)';
            if (lat > 150) {
                color = 'rgba(112, 0, 255, 0.8)';
            } else if (lat > 80) {
                color = 'rgba(112, 0, 255, 0.35)';
            } else if (lat > 40) {
                color = 'rgba(0, 242, 255, 0.45)';
            }
            
            cell.style.backgroundColor = color;
            cell.title = `Char: '${currentText[index]}' | Latency: ${lat}ms`;
            cell.innerText = currentText[index] === ' ' ? '␣' : currentText[index];
            heatmapGrid.appendChild(cell);
        });

        const cells = heatmapGrid.querySelectorAll('.heatmap-cell');
        gsap.from(cells, {
            opacity: 0,
            scale: 0.5,
            duration: 0.6,
            stagger: 0.012,
            ease: 'back.out(1.5)'
        });
    };

    resetBtn.addEventListener('click', () => {
        initDemo();
    });

    initDemo();
};


// Floating Q&A AI Assistant chatbot engine
const setupAIAssistant = () => {
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const chatPanel = document.getElementById('ai-chat-panel');
    const botIcon = document.getElementById('ai-toggle-icon-bot');
    const closeIcon = document.getElementById('ai-toggle-icon-close');
    const chatBody = document.getElementById('chat-body');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    if (!toggleBtn || !chatPanel || !chatBody) return;

    toggleBtn.addEventListener('click', () => {
        const isActive = chatPanel.classList.contains('active');
        if (isActive) {
            chatPanel.classList.remove('active');
            botIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            chatPanel.classList.add('active');
            botIcon.style.display = 'none';
            closeIcon.style.display = 'block';
            setTimeout(() => chatInput.focus(), 300);
        }
    });

    const qaPairs = [
        {
            keywords: ['stack', 'tech', 'skills', 'languages', 'technologies', 'frameworks'],
            response: "Sahil's primary stack is **React, Node.js, JavaScript, and HTML/CSS** for front-end, and **Python / C++** for systems and automation. He also utilizes tools like Figma, Git/GitHub, and VS Code, and builds advanced custom AI pipelines."
        },
        {
            keywords: ['available', 'hire', 'contract', 'freelance', 'job', 'work', 'booking'],
            response: "Sahil is currently **available** for select software engineering roles and Q3 2026 contract work. His typical response time is under 12 hours!"
        },
        {
            keywords: ['typelabs', 'typing', 'diagnostics', 'telemetry'],
            response: "TypeLabs is a high-fidelity typing engine designed with strict state isolation and hardware-accelerated GSAP visuals. It records keystroke latency with millisecond-accuracy and displays diagnostic heatmaps. You can test it live in the Showcase section above!"
        },
        {
            keywords: ['gitcommitter', 'cli', 'hook', 'git'],
            response: "GitCommitter is a lightweight Node.js terminal app that automates Conventional Commit formatting. It integrates directly into local workspace git-hooks, parsing diffs and accelerating repository commit loops by roughly 40%."
        },
        {
            keywords: ['contact', 'email', 'linkedin', 'github', 'message', 'reach'],
            response: "You can email Sahil directly at **sahilsingone09@gmail.com**, connect on LinkedIn at **linkedin.com/in/sahil-singone**, or review his builds on GitHub at **github.com/Sahilllz**."
        },
        {
            keywords: ['who', 'about', 'sahil', 'philosophy'],
            response: "Sahil is a serious product builder and developer who focuses on turning complex business ideas into high-performance software, automated workflows, and robust AI integrations. He values velocity, system leverage, and clean UX."
        }
    ];

    const generateResponse = (userMsg) => {
        const msg = userMsg.toLowerCase().trim();
        for (const pair of qaPairs) {
            if (pair.keywords.some(keyword => msg.includes(keyword))) {
                return pair.response;
            }
        }
        return "I'm not fully sure about that detail. You can ask about Sahil's **tech stack**, **availability**, **TypeLabs project**, or **how to contact him**!";
    };

    const appendMessage = (sender, text) => {
        const msgBubble = document.createElement('div');
        msgBubble.className = `chat-message ${sender}`;
        msgBubble.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleBotResponse = (userMsg) => {
        const indicator = document.createElement('div');
        indicator.className = 'chat-message bot typing-indicator-bubble';
        indicator.innerHTML = '<p style="color: var(--text-dim); font-style: italic;">thinking...</p>';
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            indicator.remove();
            const reply = generateResponse(userMsg);
            appendMessage('bot', reply);
        }, 800 + Math.random() * 600);
    };

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            appendMessage('user', query);
            handleBotResponse(query);
        });
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        appendMessage('user', msg);
        chatInput.value = '';

        handleBotResponse(msg);
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
    setupPreloader();
    setupScrollProgress();
    setupNavbar();
    setupCursor();
    setupSpotlights();
    setupAnimations();
    setupDiagnostics();
    setupTypingDemo();
    setupAIAssistant();
    setupForm();
});
