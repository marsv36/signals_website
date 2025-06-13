// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
  }
  
  // Form submission with AJAX
  const leadForm = document.querySelector('.lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(leadForm);
      const url = leadForm.getAttribute('action');
      
      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success';
          successMessage.textContent = 'Děkujeme za Vaši zprávu! Brzy se Vám ozveme.';
          
          leadForm.innerHTML = '';
          leadForm.appendChild(successMessage);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }
  
  // Initialize cookie consent
  if (window.cookieconsent) {
    window.cookieconsent.initialise({
      palette: {
        popup: { background: "#fff" },
        button: { background: "#ff6600", text: "#fff" }
      },
      content: {
        message: "Tento web používá soubory cookie k analýze návštěvnosti.",
        dismiss: "Rozumím",
        link: "Více"
      },
      onInitialise: function (status) {
        if (status === window.cookieconsent.status.allow) {
          if (typeof gtag === 'function') {
            gtag('consent', 'update', { 'analytics_storage': 'granted' });
          }
        }
      }
    });
  }
}); 