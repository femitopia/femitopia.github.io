document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form data
            const formData = new FormData(contactForm);
            const formProps = Object.fromEntries(formData);
            
            // Set reply_to email
            formProps.reply_to = formProps.email;
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formProps)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Redirect to thank you page
                    window.location.href = 'thank-you.html';
                }, function(error) {
                    console.error('FAILED...', error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }
});
