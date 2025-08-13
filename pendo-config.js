// Pendo Configuration and Analytics
// Simple implementation for visitor tracking and metadata collection

// Generate unique visitor ID
const visitorId = localStorage.getItem('pendo-visitor-id') || 'visitor-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('pendo-visitor-id', visitorId);

// Track session metadata
const sessionData = {
    visitor: {
        id: visitorId,
        userType: localStorage.getItem('returning-user') ? 'returning' : 'new',
        sessionStart: new Date().toISOString(),
        currentPage: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        deviceType: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        platform: navigator.platform,
        language: navigator.language || 'en-US',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    },
    account: {
        id: 'news-website-account',
        planType: 'free',
        industry: 'news-media',
        websiteType: 'news',
        subscriptionStatus: 'free',
        memberSince: localStorage.getItem('pendo-first-visit') || new Date().toISOString()
    }
};

// Initialize Pendo with metadata when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Pendo to load, then initialize
    const checkPendo = setInterval(() => {
        if (typeof pendo !== 'undefined') {
            clearInterval(checkPendo);
            
            // Initialize Pendo with session data
            pendo.initialize(sessionData);
            
            // Track initial page load
            pendo.track('page_load', {
                page: window.location.pathname,
                title: document.title,
                timestamp: Date.now()
            });
        }
    }, 100);
});

// Mark as returning user for next visit
localStorage.setItem('returning-user', 'true');

// Set first visit timestamp if not already set
if (!localStorage.getItem('pendo-first-visit')) {
    localStorage.setItem('pendo-first-visit', new Date().toISOString());
}

// Track article clicks
document.addEventListener('click', function(event) {
    if (typeof pendo === 'undefined') return;
    
    // Article link clicks
    if (event.target.closest('.article-card')) {
        const article = event.target.closest('.article-card');
        const title = article.querySelector('h2').textContent;
        const category = article.querySelector('.category').textContent;
        
        pendo.track('article_clicked', {
            article_title: title,
            article_category: category,
            click_location: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }
    
    // Category navigation clicks
    if (event.target.closest('.nav a')) {
        const categoryName = event.target.textContent;
        
        pendo.track('category_clicked', {
            category_name: categoryName,
            source_page: window.location.pathname,
            timestamp: new Date().toISOString()
        });
    }
});

// Track search activity
document.addEventListener('submit', function(e) {
    if (typeof pendo === 'undefined') return;
    
    const searchForm = e.target.closest('.search-bar');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[type="text"]');
        if (searchInput && searchInput.value.trim()) {
            pendo.track('search_performed', {
                query: searchInput.value.trim(),
                timestamp: Date.now()
            });
        }
    }
});

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
    if (typeof pendo === 'undefined') return;
    
    if (document.hidden) {
        pendo.track('session_paused', {
            timestamp: Date.now()
        });
    } else {
        pendo.track('session_resumed', {
            timestamp: Date.now()
        });
    }
});

// Track before page unload
window.addEventListener('beforeunload', function() {
    if (typeof pendo === 'undefined') return;
    
    pendo.track('session_ended', {
        timestamp: Date.now()
    });
});
