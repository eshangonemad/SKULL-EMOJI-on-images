const GHOST_SVGS = [
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 20,50 C 20,30 40,15 50,15 C 60,15 80,30 80,50 L 80,85 C 80,85 75,80 70,85 C 65,90 60,85 55,90 C 50,95 45,90 40,85 C 35,80 30,85 20,85 Z" 
            fill="white" stroke="none"/>
      <circle cx="40" cy="40" r="5" fill="black"/>
      <circle cx="60" cy="40" r="5" fill="black"/>
    </svg>`,
    
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 25,50 C 25,25 40,20 50,20 C 60,20 75,25 75,50 L 75,80 L 65,70 L 55,80 L 45,70 L 35,80 L 25,70 Z" 
            fill="white" stroke="none"/>
      <circle cx="40" cy="45" r="4" fill="black"/>
      <circle cx="60" cy="45" r="4" fill="black"/>
      <path d="M 40,60 C 45,65 55,65 60,60" fill="none" stroke="black" stroke-width="2"/>
    </svg>`,
    
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30,45 C 30,25 40,15 50,15 C 60,15 70,25 70,45 L 70,75 C 70,80 65,85 60,80 C 55,75 45,75 40,80 C 35,85 30,80 30,75 Z" 
            fill="white" stroke="none"/>
      <path d="M 40,40 L 45,45 L 40,50" fill="none" stroke="black" stroke-width="2"/>
      <path d="M 60,40 L 55,45 L 60,50" fill="none" stroke="black" stroke-width="2"/>
    </svg>`
  ];
  
  const SKULL_EMOJI = '💀';
  const GHOST_CHANCE = 0.7; 
  
  function createGhostOverlay() {
    const ghostSvg = GHOST_SVGS[Math.floor(Math.random() * GHOST_SVGS.length)];
    const ghostDiv = document.createElement('div');
    ghostDiv.className = 'spooky-overlay';
    ghostDiv.innerHTML = ghostSvg;
    return ghostDiv;
  }
  
  function createSkullOverlay() {
    const skullDiv = document.createElement('div');
    skullDiv.className = 'spooky-overlay';
    skullDiv.style.fontSize = '48px';
    skullDiv.textContent = SKULL_EMOJI;
    return skullDiv;
  }
  
  function addSpookyOverlay() {
    const images = document.getElementsByTagName('img');
    
    for (let img of images) {
      if (img.parentElement.classList.contains('spooky-container')) continue;
      
      const container = document.createElement('div');
      container.className = 'spooky-container';
      
      const useGhost = Math.random() < GHOST_CHANCE;
      const overlay = useGhost ? createGhostOverlay() : createSkullOverlay();
      
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
      container.appendChild(overlay);
    }
  }
  
  addSpookyOverlay();
  
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.addedNodes.length) {
        addSpookyOverlay();
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });