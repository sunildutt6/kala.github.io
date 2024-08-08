import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formState,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccessMessage("Your message has been sent successfully!");
        setFormState({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setErrorMessage("Failed to send your message. Please try again later.");
      });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
