import React, { useState } from 'react';
import './contactus.css'
function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic to send the form data to a backend server or email service
    console.log(formData);
    setSubmitted(true);
  };

 if (submitted) {
  alert("Thank you for contacting us!");
}


  return (
    <form onSubmit={handleSubmit} className='contact'>
      <div  style={{marginTop:'200px'}}  >
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button style={{marginBottom:'200px'}} type="submit">Submit</button>
    </form>
  );
}

export default ContactUs;
