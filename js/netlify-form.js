document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const form = document.querySelector('form[data-netlify="true"]');
    const successMessage = document.getElementById('form-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Get the form data
            const formData = new FormData(form);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Submit the form data to Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    // Reset form
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }
});
