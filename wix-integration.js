// Wix Integration Script for LatherGreen Customizer
// This script helps integrate the customizer seamlessly into Wix

(function() {
    // Configuration
    const config = {
        customizerUrl: 'https://your-app-name.vercel.app',
        containerId: 'lathergreen-customizer',
        fallbackUrl: 'https://lathergreen.com/customize'
    };

    // Create customizer container
    function createCustomizerContainer() {
        const container = document.createElement('div');
        container.id = config.containerId;
        container.style.cssText = `
            width: 100%;
            height: 800px;
            position: relative;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        `;
        return container;
    }

    // Create iframe with proper settings
    function createCustomizerIframe() {
        const iframe = document.createElement('iframe');
        iframe.src = config.customizerUrl;
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            position: absolute;
            top: 0;
            left: 0;
        `;
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allowfullscreen', 'true');
        
        // Handle loading errors
        iframe.onerror = function() {
            window.location.href = config.fallbackUrl;
        };
        
        return iframe;
    }

    // Initialize customizer
    function initCustomizer() {
        // Find where to insert the customizer
        const targetElement = document.querySelector('[data-lathergreen-customizer]') || 
                             document.querySelector('.lathergreen-customizer-container') ||
                             document.body;
        
        if (targetElement) {
            const container = createCustomizerContainer();
            const iframe = createCustomizerIframe();
            
            container.appendChild(iframe);
            targetElement.appendChild(container);
            
            // Send customizer ready event to Wix
            if (window.Wix) {
                window.Wix.Settings.refreshPublicData();
            }
        }
    }

    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomizer);
    } else {
        initCustomizer();
    }

    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        const container = document.getElementById(config.containerId);
        if (container && window.innerWidth < 768) {
            container.style.height = '600px';
        } else if (container) {
            container.style.height = '800px';
        }
    });

})();