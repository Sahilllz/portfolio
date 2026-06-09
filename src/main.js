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
    const suggestionsContainer = document.getElementById('chat-suggestions');

    if (!toggleBtn || !chatPanel || !chatBody) return;

    let currentContext = null;
    let sessionHistory = [];

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

    const suggestionsMap = {
        typelabs: [
            { label: "Technologies Used?", query: "What technologies were used in TypeLabs?" },
            { label: "Why did he build it?", query: "Why did Sahil build TypeLabs?" },
            { label: "Can I try it live?", query: "Can I run the TypeLabs sandbox?" },
            { label: "Show other projects", query: "Show me featured projects" }
        ],
        gitcommitter: [
            { label: "Technologies Used?", query: "What technologies were used in GitCommitter?" },
            { label: "Why did he build it?", query: "Why did Sahil build GitCommitter?" },
            { label: "How to run it?", query: "How can I run GitCommitter?" },
            { label: "Show other projects", query: "Show me featured projects" }
        ],
        skills: [
            { label: "Learning Focus", query: "What is Sahil currently learning?" },
            { label: "Capabilities", query: "What kind of software can Sahil build?" },
            { label: "TypeLabs Project", query: "Tell me about TypeLabs" },
            { label: "Contact Info", query: "How can I contact Sahil?" }
        ],
        learning: [
            { label: "Future Ambitions", query: "What are Sahil's future ambitions?" },
            { label: "Capabilities", query: "What kind of software can Sahil build?" },
            { label: "TypeLabs Project", query: "Tell me about TypeLabs" },
            { label: "Availability", query: "Is he available for hire?" }
        ],
        availability: [
            { label: "Contact Info", query: "How can I contact Sahil?" },
            { label: "Capabilities", query: "What kind of software can Sahil build?" },
            { label: "Featured Projects", query: "Show me featured projects" }
        ],
        contact: [
            { label: "Availability", query: "Is he available for select contracts?" },
            { label: "Featured Projects", query: "Show me featured projects" },
            { label: "Who is Sahil?", query: "Tell me about Sahil" }
        ],
        sahil: [
            { label: "TypeLabs Project", query: "Tell me about TypeLabs" },
            { label: "Tech Stack", query: "What technologies does Sahil use?" },
            { label: "Learning Focus", query: "What is Sahil currently learning?" },
            { label: "Contact Info", query: "How can I contact Sahil?" }
        ],
        default: [
            { label: "TypeLabs Project", query: "Tell me about TypeLabs" },
            { label: "Tech Stack", query: "What technologies does Sahil use?" },
            { label: "Learning Focus", query: "What is Sahil currently learning?" },
            { label: "Featured Projects", query: "Show me featured projects" },
            { label: "Capabilities", query: "What kind of software can Sahil build?" }
        ]
    };

    const renderSuggestions = (contextKey) => {
        if (!suggestionsContainer) return;
        const key = contextKey || 'default';
        const list = suggestionsMap[key] || suggestionsMap['default'];
        suggestionsContainer.innerHTML = '';
        list.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.setAttribute('data-query', item.query);
            btn.innerText = item.label;
            btn.addEventListener('click', () => {
                appendMessage('user', item.query);
                handleBotResponse(item.query);
            });
            suggestionsContainer.appendChild(btn);
        });
    };

    const generateResponse = (userMsg) => {
        const msg = userMsg.toLowerCase().trim();

        // 1. GREETINGS
        if (/\b(hi|hello|hey|hlw|yo|sup|greetings|howdy|hiya)\b/i.test(msg)) {
            if (/\bhi\b/i.test(msg)) {
                return "Hey! Welcome to Sahil's portfolio. Feel free to ask me about his projects, skills, experience, or what he's currently building.";
            }
            if (/\bhello\b/i.test(msg)) {
                return "Hello! I'm Sahil's AI assistant. What would you like to know?";
            }
            if (/\bhey\b/i.test(msg)) {
                return "Hey there! How can I help you today?";
            }
            if (/\bhlw\b/i.test(msg)) {
                return "Hello! Glad you're here. What would you like to explore?";
            }
            const greetingVariations = [
                "Hey there! How can I help you explore Sahil's work today?",
                "Hello! Welcome. What would you like to know about Sahil?",
                "Hey! Glad you're visiting. Ask me anything about Sahil's experience or projects!"
            ];
            return greetingVariations[Math.floor(Math.random() * greetingVariations.length)];
        }

        // 2. GOODBYES
        if (/\b(bye|goodbye|see you|see ya|cya|adios|farewell|exit|quit)\b/i.test(msg)) {
            const goodbyeVariations = [
                "Goodbye! Have a great day!",
                "See you! Let me know if you need anything else.",
                "Bye! Thanks for stopping by."
            ];
            return goodbyeVariations[Math.floor(Math.random() * goodbyeVariations.length)];
        }

        // 3. COMPLIMENTS
        if (/\b(nice|awesome|cool|great|amazing|love|like)\b/i.test(msg) && /\b(portfolio|site|website|design|work|page)\b/i.test(msg)) {
            const complimentVariations = [
                "Thank you! Sahil put a lot of effort into building it.",
                "Glad you like it! Feel free to explore the projects.",
                "Appreciate it. Let me know if you'd like to know more about any project."
            ];
            return complimentVariations[Math.floor(Math.random() * complimentVariations.length)];
        }

        // 4. THANKS
        if (/\b(thanks|thank you|thx|appreciate it|grateful|tanks)\b/i.test(msg)) {
            const thanksVariations = [
                "You're very welcome! Let me know if you have other questions.",
                "Happy to help! Feel free to ask anything else.",
                "Anytime! Always here to assist."
            ];
            return thanksVariations[Math.floor(Math.random() * thanksVariations.length)];
        }

        // 5. SMALL TALK
        if (/\bhow are you\b/i.test(msg) || /\bhow's it going\b/i.test(msg) || /\bhow are you doing\b/i.test(msg)) {
            return "I'm doing great and ready to help you explore Sahil's work. What would you like to know?";
        }
        if (/\bwhat's up\b/i.test(msg) || /\bwhats up\b/i.test(msg) || /\bwhat is up\b/i.test(msg)) {
            return "Not much, just helping visitors learn more about Sahil's projects and journey.";
        }
        if (/\bwho are you\b/i.test(msg) || /\bwhat are you\b/i.test(msg)) {
            return "I'm an AI assistant designed to answer questions about Sahil, his projects, skills, and interests.";
        }
        if (msg.includes('what do you do') || msg.includes('what is your role') || msg.includes('what are you for')) {
            return "I'm Sahil's conversational AI assistant. I can introduce you to Sahil, walk you through his projects (like TypeLabs or GitCommitter), detail his technical stack, explain what he's currently building, or help you contact him.";
        }

        // Update context if explicit keywords are present
        if (msg.includes('typelabs')) {
            currentContext = 'typelabs';
        } else if (msg.includes('gitcommitter')) {
            currentContext = 'gitcommitter';
        } else if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('message') || msg.includes('linkedin') || msg.includes('github')) {
            currentContext = 'contact';
        } else if (msg.includes('stack') || msg.includes('tech') || msg.includes('skill') || msg.includes('languages') || msg.includes('frameworks') || msg.includes('technologies')) {
            currentContext = 'skills';
        } else if (msg.includes('available') || msg.includes('hire') || msg.includes('contract') || msg.includes('job') || msg.includes('work')) {
            currentContext = 'availability';
        } else if (msg.includes('learning') || msg.includes('goals') || msg.includes('future') || msg.includes('study') || msg.includes('studying') || msg.includes('ambition')) {
            currentContext = 'learning';
        } else if (msg.includes('sahil') || msg.includes('about him') || msg.includes('who is')) {
            currentContext = 'sahil';
        }

        // 6. CONTEXT-AWARE FOLLOW-UP QUESTIONS
        // A. Technologies used
        if (/\b(technologies|tech|stack|languages|frameworks|tools|built with|developed with|use)\b/i.test(msg)) {
            if (currentContext === 'typelabs') {
                return "TypeLabs was built using **React, Vanilla JavaScript, CSS, and hardware-accelerated GSAP** for animations. It features strict state isolation to keep the typing sandbox run loop fully isolated and high-performance.";
            }
            if (currentContext === 'gitcommitter') {
                return "GitCommitter is a lightweight CLI tool written in **Node.js and JavaScript** that interacts with git hooks to parse diffs and format commits.";
            }
            if (currentContext === 'skills' || currentContext === 'sahil') {
                return "Sahil's primary stack is **React, Node.js, JavaScript, and HTML/CSS** for front-end, and **Python / C++** for systems and automation.";
            }
        }

        // B. Motivation / Purpose
        if (/\b(why|purpose|motivation|reason|what does it do|explain it)\b/i.test(msg)) {
            if (currentContext === 'typelabs') {
                return "Sahil built TypeLabs to construct a high-performance typing sandbox that measures typing telemetry latency (keystroke press/release offsets) at a millisecond level to identify typing bottlenecks.";
            }
            if (currentContext === 'gitcommitter') {
                return "Sahil built GitCommitter to streamline his own development workflow, automating Conventional Commit formatting directly in local git hooks to ensure clean commit histories.";
            }
            if (currentContext === 'sahil') {
                return "Sahil focuses on building performant software and automated AI systems that deliver tangible value—no fluff, just shipping code.";
            }
        }

        // C. Live link / Run it
        if (/\b(live|run|try|play|link|accessible|online|where is)\b/i.test(msg)) {
            if (currentContext === 'typelabs') {
                return "Yes! You can run the TypeLabs sandbox demo live right here on this portfolio! Scroll up to the featured showcase section and start typing to see your telemetry latency heatmap.";
            }
            if (currentContext === 'gitcommitter') {
                return "GitCommitter is a terminal CLI tool. You can find the codebase and integration instructions on Sahil's GitHub repository at **github.com/Sahilllz**!";
            }
        }

        // 7. SPECIFIC PORTFOLIO KNOWLEDGE MATCHES
        // A. General Intro
        if (/\b(who is sahil|about sahil|tell me about yourself|introduce yourself|who are you|introduce sahil)\b/i.test(msg)) {
            return "Sahil is a software engineer and product builder focusing on high-performance digital products, systems, and custom AI experiences. I can tell you about his projects, technical skills, current learning focus, and future ambitions.";
        }

        // B. Projects list
        if (/\b(projects|builds|what has he built|featured projects|portfolio projects)\b/i.test(msg)) {
            return "Sahil has built some cool projects! Two key ones are **TypeLabs** (a high-fidelity typing engine and sandbox) and **GitCommitter** (a Node.js CLI tool for git-hooks). Which one would you like to learn more about?";
        }

        // C. Specific TypeLabs
        if (msg.includes('typelabs')) {
            return "TypeLabs is a high-fidelity typing engine designed with strict state isolation and hardware-accelerated GSAP visuals. It records keystroke latency with millisecond-accuracy and displays diagnostic heatmaps. You can test it live in the Showcase section above!";
        }

        // D. Specific GitCommitter
        if (msg.includes('gitcommitter')) {
            return "GitCommitter is a lightweight Node.js terminal app that automates Conventional Commit formatting. It integrates directly into local workspace git-hooks, parsing diffs and accelerating repository commit loops by roughly 40%.";
        }

        // E. Skills & Stack
        if (/\b(skills|stack|tech|technologies|languages|frameworks|tools)\b/i.test(msg)) {
            return "Sahil's primary stack is **React, Node.js, JavaScript, and HTML/CSS** for front-end, and **Python / C++** for systems and automation. He also utilizes tools like Figma, Git/GitHub, and VS Code.";
        }

        // F. Experience
        if (/\b(experience|history|background|work history|how long)\b/i.test(msg)) {
            return "Sahil has over **4+ years of web development experience** building interactive front-ends, custom backends, and command line tools. He has shipped over 10+ projects.";
        }

        // G. Education
        if (/\b(education|college|degree|study|studied|school|university)\b/i.test(msg)) {
            return "Sahil is largely a self-driven engineer and an AI/ML aspirant. He focuses on hands-on construction, building real-world systems, and reading deep technical documentation rather than traditional credentials.";
        }

        // H. Contact Info
        if (/\b(contact|reach|email|linkedin|github|message|phone)\b/i.test(msg)) {
            return "You can email Sahil directly at **sahilsingone09@gmail.com**, connect on LinkedIn at **linkedin.com/in/sahil-singone**, or review his builds on GitHub at **github.com/Sahilllz**.";
        }

        // I. Availability
        if (/\b(available|availability|hire|contract|job|freelance)\b/i.test(msg)) {
            return "Sahil is currently **available** for select software engineering roles and Q3 2026 contract work. His response time is usually under 12 hours!";
        }

        // J. Learning focus
        if (/\b(learning|goals|study|studying|roadmap)\b/i.test(msg)) {
            return "Sahil is currently diving deep into **Advanced Agentic RAG Nodes (using LangGraph/LlamaIndex)**, multi-tenant SaaS architecture design, custom API loops, and scaling digital products.";
        }

        // K. Ambitions
        if (/\b(ambition|ambitions|future|goals|plans)\b/i.test(msg)) {
            return "Sahil's ambition is to build scalable SaaS products, construct cost-reducing multi-agent AI systems for businesses, and design immersive premium spatial user interfaces.";
        }

        // L. Capabilities
        if (/\b(kind of software|what can he build|capabilities|software can sahil build)\b/i.test(msg)) {
            return "Sahil builds high-performance web applications (like React-based interactive dashboards), command-line productivity tools, automated API logic loops (webhook integrations, back-office bots), and custom AI pipelines (like RAG agents).";
        }

        // 8. FALLBACK
        return "I'm not sure about that, but I can help with questions about Sahil's projects, skills, experience, and work.";
    };

    const appendMessage = (sender, text) => {
        const msgBubble = document.createElement('div');
        msgBubble.className = `chat-message ${sender}`;
        msgBubble.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgBubble);
        chatBody.scrollTop = chatBody.scrollHeight;

        // Remember in session history
        sessionHistory.push({ sender, text });
        if (sessionHistory.length > 10) sessionHistory.shift();
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
            // Render new suggestions based on detected context
            renderSuggestions(currentContext || 'default');
        }, 800 + Math.random() * 600);
    };

    // Render initial suggested questions on load
    renderSuggestions('default');

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
