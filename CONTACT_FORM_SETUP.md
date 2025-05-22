# Contact Form Setup Instructions

The contact form on the website uses EmailJS to send form submissions directly to the temple email addresses. To complete the setup, please follow these steps:

## Setup EmailJS Account

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an Email Service:
   - Go to "Email Services" tab
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your temple email account

3. Create an Email Template:
   - Go to "Email Templates" tab
   - Click "Create New Template"
   - Design your email template with the following variables:
     - `{{from_name}}` - Sender's name
     - `{{reply_to}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - The message content
     - `{{to_email}}` - Temple email addresses

4. Update the JavaScript Configuration:
   - Open the file `/js/contact-form.js`
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key (found in Account > API Keys)
   - Update the `serviceID` with your EmailJS service ID
   - Update the `templateID` with your email template ID

## Testing the Form

After completing the setup:
1. Fill out and submit the contact form on your website
2. Check that you receive the email at the temple email addresses
3. Verify the format of the received email matches your expectations

## Troubleshooting

If the form is not working:
1. Check the browser console for errors (Right-click > Inspect > Console)
2. Verify that your EmailJS account is active
3. Check that your email service connection is working
4. Verify the public key, service ID, and template ID are correct

For more help, contact your web developer or visit [EmailJS Documentation](https://www.emailjs.com/docs/).
