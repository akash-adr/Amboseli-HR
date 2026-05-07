document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Blur
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottom = '1px solid var(--primary)';
      } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid var(--border-color)';
      }
    });
  }

  // Sticky Navbar
  const navbarEl = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbarEl.classList.add('sticky');
    } else {
      navbarEl.classList.remove('sticky');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Mobile Nav Actions Mover
  const navActions = document.querySelector('.nav-actions');
  const navbarContainer = document.querySelector('.navbar');
  
  function handleNavResponsive() {
    if (window.innerWidth <= 768) {
      if (navActions && navActions.parentElement !== navLinks) {
        navLinks.appendChild(navActions);
      }
    } else {
      if (navActions && navActions.parentElement === navLinks && mobileMenuBtn) {
        navbarContainer.insertBefore(navActions, mobileMenuBtn);
      }
    }
  }
  
  handleNavResponsive();
  window.addEventListener('resize', handleNavResponsive);

  // Global Search Logic
  const searchOverlayHTML = `
    <div class="search-overlay" id="search-overlay">
      <div class="search-overlay-content">
        <div class="search-header">
          <i class="fas fa-search search-icon-input"></i>
          <input type="text" id="global-search-input" placeholder="Search across Amboseli HR..." autocomplete="off">
          <i class="fas fa-times close-search" id="close-search"></i>
        </div>
        <div class="search-results" id="search-results"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', searchOverlayHTML);

  const searchIcons = document.querySelectorAll('.search-icon');
  const searchOverlay = document.getElementById('search-overlay');
  const closeSearch = document.getElementById('close-search');
  const searchInput = document.getElementById('global-search-input');
  const searchResultsContainer = document.getElementById('search-results');

  const searchableElements = Array.from(document.querySelectorAll('h1, h2, h3, .glass-card p, .process-card p'));
  const searchData = searchableElements.map((el, index) => {
    let parent = el.closest('section') || el.closest('.glass-card') || el;
    if (!parent.id) parent.id = 'search-target-' + index;
    return {
      id: parent.id,
      text: el.innerText || el.textContent,
      element: el
    };
  }).filter(item => item.text.trim().length > 0);

  searchIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('active');
      setTimeout(() => searchInput.focus(), 100);
    });
  });

  closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResultsContainer.innerHTML = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch.click();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResultsContainer.innerHTML = '';
    
    if (query.length < 2) return;
    
    const results = searchData.filter(item => item.text.toLowerCase().includes(query));
    
    if (results.length === 0) {
      searchResultsContainer.innerHTML = '<div style="text-align:center; color: #a0a0a0; padding: 20px;">No results found.</div>';
      return;
    }
    
    results.slice(0, 8).forEach((item) => {
      const regex = new RegExp(`(${query})`, 'gi');
      const highlightedText = item.text.replace(regex, '<mark>$1</mark>');
      
      let snippet = highlightedText;
      if (snippet.length > 150) snippet = snippet.substring(0, 150) + '...';

      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.innerHTML = `
        <div class="search-result-title">Result</div>
        <div class="search-result-excerpt">${snippet}</div>
      `;
      
      div.addEventListener('click', () => {
        closeSearch.click();
        const targetEl = document.getElementById(item.id);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.style.transition = 'all 0.5s';
          targetEl.style.boxShadow = '0 0 30px rgba(255, 138, 43, 0.8)';
          setTimeout(() => { targetEl.style.boxShadow = ''; }, 2000);
        }
      });
      
      searchResultsContainer.appendChild(div);
    });
  });

  // Handle Get Started and Services functionality dynamically
  document.querySelectorAll('.btn').forEach(link => {
    if(link.textContent.trim().includes('Get Started')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = window.location.pathname;
        if(path.includes('employers.html')) {
          const target = document.querySelector('#hiring-process');
          if(target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = 'employers.html#hiring-process';
        }
      });
    }
    
    if(link.textContent.trim().includes('Explore Services') || link.textContent.trim().includes('Our Services')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = window.location.pathname;
        if(path.includes('about.html')) {
          const target = document.querySelector('#services');
          if(target) target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = 'about.html#services';
        }
      });
    }
  });

});
