// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Newsletter signup functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing! You\'ll receive our latest news soon.', 'success');
                emailInput.value = '';
            }
        });
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = prompt('Enter search term:');
            if (searchTerm) {
                // Simulate search functionality
                showNotification(`Searching for: ${searchTerm}`, 'info');
            }
        });
    }
    
    // Subscribe button functionality
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            showNotification('Redirecting to subscription page...', 'info');
        });
    }
    
    // Navigation link interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show navigation notification
            const category = this.textContent;
            if (category !== 'Home') {
                showNotification(`Navigating to ${category} category...`, 'info');
            }
        });
    });
    
    // Article card interactions
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        const link = card.querySelector('.article-link');
        if (link) {
            link.addEventListener('click', function(e) {
                const headline = this.querySelector('.article-headline').textContent;
                showNotification(`Opening article: ${headline}`, 'info');
            });
        }
    });
    
    // Breaking news animation
    const breakingNews = document.querySelector('.breaking-news');
    if (breakingNews) {
        // Add pulsing animation to breaking news
        breakingNews.style.animation = 'pulse 2s infinite';
    }
    
    // Add CSS animation for pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background: #4caf50;
        }
        
        .notification.info {
            background: #2196f3;
        }
        
        .notification.error {
            background: #f44336;
        }
    `;
    document.head.appendChild(style);
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add header transition
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }
    
    // Article page specific functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList[1]; // twitter, facebook, linkedin
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl = '';
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                showNotification(`Sharing on ${platform}...`, 'info');
            }
        });
    });
    
    // Sidebar newsletter form
    const sidebarForm = document.querySelector('.sidebar-form');
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            }
        });
    }
    
    // Related articles interactions
    const relatedLinks = document.querySelectorAll('.related-link');
    relatedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const headline = this.querySelector('h4').textContent;
            showNotification(`Opening related article: ${headline}`, 'info');
        });
    });
    
    // Trending items interactions
    const trendingItems = document.querySelectorAll('.trending-item');
    trendingItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const text = this.querySelector('.trending-text').textContent;
            showNotification(`Opening trending article: ${text}`, 'info');
        });
    });
    
    // Initialize page with a welcome message
    setTimeout(() => {
        showNotification('Welcome to NewsHub! Stay informed with the latest breaking news.', 'success');
    }, 1000);
});
