// Modular page loader
function loadBaseTemplate() {
    // Only run if window.pageContent is defined
    if (!window.pageContent) return;
    fetch('base.html')
        .then(response => response.text())
        .then(baseHtml => {
            // Create a temporary DOM to parse base.html
            const parser = new DOMParser();
            const doc = parser.parseFromString(baseHtml, 'text/html');
            // Inject page-specific content
            const pageContentDiv = doc.getElementById('page-content');
            if (pageContentDiv) {
                pageContentDiv.innerHTML = window.pageContent;
            }
            // Replace current body with base.html's body
            document.body.innerHTML = doc.body.innerHTML;
            // Re-attach menu toggle functionality
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                });
            }
            // Prevent re-running loader by checking a flag
            if (!window._baseLoaded) {
                window._baseLoaded = true;
            }
        });
}
// Run loader on DOMContentLoaded
if (!window._baseLoaded) {
    window.addEventListener('DOMContentLoaded', loadBaseTemplate);
}
