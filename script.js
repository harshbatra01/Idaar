// ===== IDAAR - Interactive JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCountAnimations();
    initWorkflowNavigation();
    initSmoothScrolling();
    initIntersectionObserver();
    initNavbarScroll();
});

// ===== Counter Animations =====
function initCountAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Observe counters for viewport entry
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== Workflow Navigation =====
function initWorkflowNavigation() {
    const steps = document.querySelectorAll('.workflow-step');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    const playBtn = document.getElementById('playWorkflow');
    const currentStepEl = document.getElementById('currentStep');
    const totalStepsEl = document.getElementById('totalSteps');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    let isPlaying = false;
    let playInterval;

    if (totalStepsEl) {
        totalStepsEl.textContent = totalSteps;
    }

    const updateStep = (step) => {
        currentStep = step;
        
        steps.forEach((s, index) => {
            if (index < step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        if (currentStepEl) {
            currentStepEl.textContent = currentStep;
        }

        // Scroll active step into view
        const activeStep = steps[step - 1];
        if (activeStep) {
            activeStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const goToNextStep = () => {
        if (currentStep < totalSteps) {
            updateStep(currentStep + 1);
        } else {
            updateStep(1);
        }
    };

    const goToPrevStep = () => {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            clearInterval(playInterval);
            isPlaying = false;
            if (playBtn) {
                playBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                `;
            }
        } else {
            isPlaying = true;
            if (playBtn) {
                playBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                `;
            }
            playInterval = setInterval(() => {
                goToNextStep();
            }, 2000);
        }
    };

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', goToPrevStep);
    if (nextBtn) nextBtn.addEventListener('click', goToNextStep);
    if (playBtn) playBtn.addEventListener('click', togglePlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToNextStep();
        if (e.key === 'ArrowLeft') goToPrevStep();
        if (e.key === ' ') {
            e.preventDefault();
            togglePlay();
        }
    });

    // Initialize first step
    updateStep(1);
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hero buttons
    const exploreBtn = document.getElementById('exploreWorkflow');
    const archBtn = document.getElementById('viewArchitecture');
    const launchBtn = document.getElementById('launchDemo');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (archBtn) {
        archBtn.addEventListener('click', () => {
            document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ===== Intersection Observer for Animations =====
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .arch-layer, .dash-stat-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== Navbar Scroll Effect =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ===== Approval Demo Interactions =====
document.querySelectorAll('.approve-btn, .reject-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.approval-card-preview');
        const isApprove = this.classList.contains('approve-btn');
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Show feedback
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            animation: fadeInUp 0.3s ease;
            z-index: 10;
        `;
        
        if (isApprove) {
            feedback.textContent = '✓ Approved!';
            feedback.style.background = 'rgba(16, 185, 129, 0.9)';
            feedback.style.color = 'white';
        } else {
            feedback.textContent = '✗ Rejected';
            feedback.style.background = 'rgba(239, 68, 68, 0.9)';
            feedback.style.color = 'white';
        }

        if (card) {
            card.style.position = 'relative';
            card.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 1500);
        }
    });
});

// ===== Activity Item Hover Effects =====
document.querySelectorAll('.activity-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ===== Bar Chart Animation Enhancement =====
document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', function() {
        const span = this.querySelector('span');
        if (span) {
            span.style.transform = 'translateX(-50%) scale(1.2)';
            span.style.color = 'white';
        }
    });
    
    bar.addEventListener('mouseleave', function() {
        const span = this.querySelector('span');
        if (span) {
            span.style.transform = 'translateX(-50%) scale(1)';
            span.style.color = '';
        }
    });
});

// ===== Floating Shape Parallax Effect =====
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Tech Stack Tooltips =====
const techDescriptions = {
    'Power Automate': 'Cloud-based workflow automation platform for creating approval flows',
    'Power Apps': 'Low-code platform for building custom business applications',
    'SharePoint': 'Collaboration platform for document management and lists',
    'MS Teams': 'Communication hub with chat, meetings, and integrations',
    'Azure AD': 'Identity and access management for enterprise security',
    'Dataverse': 'Scalable data platform for storing business data'
};

document.querySelectorAll('.tech-item').forEach(item => {
    const techName = item.querySelector('span').textContent;
    const description = techDescriptions[techName];
    
    if (description) {
        item.setAttribute('title', description);
        
        item.addEventListener('mouseenter', function() {
            // Create custom tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = description;
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                padding: 8px 12px;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                font-size: 12px;
                border-radius: 6px;
                white-space: nowrap;
                z-index: 100;
                margin-bottom: 8px;
                pointer-events: none;
                opacity: 0;
                animation: tooltipFadeIn 0.2s ease forwards;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tech-tooltip');
            if (tooltip) tooltip.remove();
        });
    }
});

// ===== Add CSS for tooltip animation =====
const style = document.createElement('style');
style.textContent = `
    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Workflow Card Click Effect =====
document.querySelectorAll('.workflow-card').forEach(card => {
    card.addEventListener('click', function() {
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out forwards;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== Console Easter Egg =====
console.log(`
%c 🚀 IDAAR - Faculty Management System
%c Built with ❤️ using Power Automate

%c Features:
  ⚡ Multi-step approval workflows
  🔄 Role-based routing
  📧 Automated notifications
  📊 Real-time analytics

%c Technologies:
  • Microsoft Power Automate
  • Power Apps
  • SharePoint Online
  • Microsoft Teams
  • Azure AD
  • Dataverse
`, 
'font-size: 20px; font-weight: bold; color: #6366f1;',
'font-size: 14px; color: #8b5cf6;',
'font-size: 12px; color: #a1a1aa;',
'font-size: 12px; color: #a1a1aa;'
);
