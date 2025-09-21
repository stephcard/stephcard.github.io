
Fancybox.bind("[data-fancybox]", {
 mainClass: 'fancybox-white',
  Thumbs: false,
    Toolbar: {
        display: {
            left: ["infobar"],
            right: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "close"
            ]
        }
    }
});



// Progress bar
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector(".progress-bar").style.width = scrolled + "%";
};

// Menu
// 
// const openBtn = document.getElementById('button--open-menu');
// const closeBtn = document.getElementById('button--close-menu');

const menu = document.getElementById('menu--primary');
const menuToggleButton = document.getElementById('button--toggle-menu');

// Add click handlers
menuToggleButton.addEventListener('click', (e) => {
    menu.classList.toggle('open');
});

// closeBtn.addEventListener('click', (e) => {
//     menu.classList.remove('open');
// });

// Process tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.button--tab');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to selected button and content
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        selectedButton.classList.add('active');
        selectedContent.classList.add('active');
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
});