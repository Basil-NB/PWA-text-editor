const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt from appearing
  event.preventDefault();
  
  // Store the event for later use
  deferredPrompt = event;
  
  // Show the install button
  butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the installation prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }
    
    // Reset the deferred prompt
    deferredPrompt = null;
    
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});
