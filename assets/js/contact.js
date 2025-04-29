document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.php-email-form');
  
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const formData = new FormData(form);
        const action = form.getAttribute('action');
  
        const loading = form.querySelector('.loading');
        const errorMessage = form.querySelector('.error-message');
        const sentMessage = form.querySelector('.sent-message');
  
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';
  
        fetch(action, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())  // Traite la réponse JSON
          .then(data => {
            loading.style.display = 'none';
            
            // Si success est true, afficher le message de succès
            if (data.success) {
              sentMessage.innerHTML = data.message;
              sentMessage.style.display = 'block';
              form.reset();  // Réinitialiser le formulaire après envoi
            } else {
              // Si success est false, afficher un message d'erreur
              errorMessage.innerHTML = data.message || "Erreur inconnue.";
              errorMessage.style.display = 'block';
            }
          })
          .catch(error => {
            loading.style.display = 'none';
            errorMessage.innerHTML = 'Erreur inattendue : ' + error;
            errorMessage.style.display = 'block';
          });
      });
    }
  });
  