// EmailJS configuration
// This will use EmailJS service to send form data to temple email addresses
function initializeEmailJS() {
  // Replace these with actual EmailJS public key
  emailjs.init("YOUR_PUBLIC_KEY");
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    initializeEmailJS();
  } else {
    console.error("EmailJS is not loaded. Make sure to include the EmailJS library.");
  }

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');
  const submitButton = document.getElementById('submitButton');

  // Error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Input fields
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Reset all error messages
  function resetErrors() {
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    subjectError.classList.add('hidden');
    messageError.classList.add('hidden');
    formError.classList.add('hidden');
  }

  // Validate form
  function validateForm() {
    let isValid = true;
    resetErrors();

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.classList.remove('hidden');
      isValid = false;
    }

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address';
      emailError.classList.remove('hidden');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.classList.remove('hidden');
      isValid = false;
    }

    // Validate subject
    if (!subjectInput.value.trim()) {
      subjectError.classList.remove('hidden');
      isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
      messageError.classList.remove('hidden');
      isValid = false;
    }

    if (!isValid) {
      formError.classList.remove('hidden');
    }

    return isValid;
  }

  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span>';

    // Prepare form data for submission
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim()
    };

    // EmailJS configuration for form submission
    // Update these parameters with actual EmailJS service, template and user IDs
    const serviceID = 'default_service';
    const templateID = 'template_contact_form';
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'hcoliverpooltemple@gmail.com, mandirhco@outlook.com' // Temple email addresses
    };

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, templateParams)
      .then(function() {
        // Show success message
        formSuccess.classList.remove('hidden');
        formError.classList.add('hidden');
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Send Message</span>';
      })
      .catch(function(error) {
        console.error('EmailJS error:', error);
        
        // Show error message
        formError.textContent = 'There was an error sending your message. Please try again or contact us directly via email.';
        formError.classList.remove('hidden');
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Send Message</span>';
      });
  });

  // Real-time validation on input
  nameInput.addEventListener('blur', function() {
    if (!nameInput.value.trim()) {
      nameError.classList.remove('hidden');
    } else {
      nameError.classList.add('hidden');
    }
  });

  emailInput.addEventListener('blur', function() {
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address';
      emailError.classList.remove('hidden');
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.classList.remove('hidden');
    } else {
      emailError.classList.add('hidden');
    }
  });

  subjectInput.addEventListener('blur', function() {
    if (!subjectInput.value.trim()) {
      subjectError.classList.remove('hidden');
    } else {
      subjectError.classList.add('hidden');
    }
  });

  messageInput.addEventListener('blur', function() {
    if (!messageInput.value.trim()) {
      messageError.classList.remove('hidden');
    } else {
      messageError.classList.add('hidden');
    }
  });
});
