// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation item based on current page
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Handle sign up form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms').checked;
        
        // Simple validation
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        
        if (!terms) {
          alert('Please accept the terms and conditions');
          return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Sign up form submitted:', { email, password });
        
        // Redirect to home page
        window.location.href = 'index.html';
      });
    }
    
    // Handle sign in form submission
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
      signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const nickname = document.getElementById('nickname').value;
        const terms = document.getElementById('terms').checked;
        
        if (!terms) {
          alert('Please accept the terms and conditions');
          return;
        }
        
        // In a real app, you would send this data to a server
        console.log('Sign in form submitted:', { email, nickname });
        
        // Redirect to home page
        window.location.href = 'index.html';
      });
    }
    
    // Profile page interactions
    if (currentPage === 'profile.html') {
      // Edit profile button
      const editProfileBtn = document.getElementById('edit-profile-btn');
      if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
          alert('Edit profile functionality would open here');
        });
      }
      
      // Settings button
      const settingsBtn = document.getElementById('settings-btn');
      if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
          alert('Settings would open here');
        });
      }
      
      // Reward history button
      const rewardHistoryBtn = document.getElementById('reward-history-btn');
      if (rewardHistoryBtn) {
        rewardHistoryBtn.addEventListener('click', function() {
          alert('Reward history would show here');
        });
      }
      
      // Active recycles link
      const activeRecyclesLink = document.getElementById('active-recycles-link');
      if (activeRecyclesLink) {
        activeRecyclesLink.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Active recycles would show here');
        });
      }
      
      // Recycle history link
      const recycleHistoryLink = document.getElementById('recycle-history-link');
      if (recycleHistoryLink) {
        recycleHistoryLink.addEventListener('click', function(e) {
          e.preventDefault();
          alert('Recycle history would show here');
        });
      }
    }
    
    // Home page interactions
    if (currentPage === 'index.html' || currentPage === '') {
      // Recycle now button
      const recycleButton = document.querySelector('.recycle-button');
      if (recycleButton) {
        recycleButton.addEventListener('click', function() {
          alert('Recycling process would start here');
        });
      }
      
      // View buttons for merchandise
      const viewButtons = document.querySelectorAll('.view-button');
      viewButtons.forEach(button => {
        button.addEventListener('click', function() {
          alert('Merchandise details would show here');
        });
      });
    }
  });