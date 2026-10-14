// Retro Blocks - Official Web Script
document.addEventListener('DOMContentLoaded', () => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIk_SoL53Oz-EHq-ZckgfveYORu-Dp8SgPSSy1lEwvZhFBXVcUSGxtUCLRVjLfgxU/exec';
  
  // Support Form Handling
  const contactForm = document.getElementById('contact-form');
  const submitButton = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (submitButton) submitButton.disabled = true;
      if (submitText) submitText.textContent = 'Enviando...';
      if (submitSpinner) submitSpinner.classList.remove('hidden');
      
      try {
        const formData = new FormData(contactForm);
        
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
        
        await new Promise(resolve => setTimeout(resolve, 600));
        
        showToast('Sua mensagem foi enviada com sucesso! Responderemos o mais breve possível.', 'success');
        contactForm.reset();
      } catch (error) {
        console.error('Submission error:', error);
        showToast('Não foi possível enviar agora. Tente novamente ou envie para mayconrochasilva@gmail.com.', 'error');
      } finally {
        if (submitButton) submitButton.disabled = false;
        if (submitText) submitText.textContent = 'Enviar Mensagem';
        if (submitSpinner) submitSpinner.classList.add('hidden');
      }
    });
  }

  // Showcase Gallery Carousel
  const track = document.getElementById('showcase-track');
  const prevBtn = document.getElementById('showcase-prev');
  const nextBtn = document.getElementById('showcase-next');

  if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Toast Function
  window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    
    toast.className = `flex items-center gap-3 px-5 py-4 rounded-2xl border shadow-2xl toast-enter ${
      isSuccess 
        ? 'bg-[#0f1d1d] border-teal-500/40 text-teal-200' 
        : 'bg-[#251010] border-red-500/40 text-red-200'
    }`;
    
    toast.innerHTML = `
      <div class="w-2 h-2 rounded-full ${isSuccess ? 'bg-teal-400' : 'bg-red-400'} animate-pulse"></div>
      <span class="text-sm font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };
});
