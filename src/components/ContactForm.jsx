// ============================================================
// CONTACTFORM.JSX — Simple Contact Form (Day 3)
// ============================================================
// A standalone contact form component with form validation.
// This is a simpler alternative to the ContactSection's
// inline form — used for learning form basics.
//
// WHAT YOU WILL LEARN:
// - useState for managing form data (object state)
// - Controlled inputs (value + onChange pattern)
// - Form submission with e.preventDefault()
// - Conditional rendering for validation messages
// - Dynamic className for error styling
// - Async functions and try/catch/finally
//
// CONCEPTS COVERED:
// - Object destructuring in event handlers
// - Spread operator for updating state: { ...prev, [name]: value }
// - Ternary expressions in className
// - Conditional rendering with && operator
//
// ============================================================

// STEP 1: Import useState from "react"

/* --- YOUR IMPORTS GO HERE --- */

// STEP 2: Create and export the ContactForm component
// export default function ContactForm() { ... }
//
// STEP 3: State variables (4 total)
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", message: ""
//   });
//
// STEP 4: Event handlers
//
//   handleChange — updates formData when user types
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     DISCUSSION: What does { ...prev, [name]: value } do?
//     It creates a copy of the previous state and updates
//     only the field that changed (computed property name).
//
//   handleSubmit — validates and "sends" the form
//     - Call e.preventDefault() to stop page reload
//     - Set submitted to true (shows validation errors)
//     - Check if all fields are filled
//     - Set loading to true, simulate sending, show success/error
//
//   sendEmail — simulates an API call
//     const sendEmail = async (data) => {
//       console.log("Email would be sent with:", data);
//       return new Promise((resolve) => setTimeout(resolve, 1000));
//     };
//
// STEP 5: Build the JSX
//   <form onSubmit={handleSubmit} className="...">
//     - <h2> title
//     - Message display (success or error)
//     - Input fields: firstName, lastName (2-column grid)
//     - Input field: email (full width, col-span-2)
//     - Textarea: message (full width, col-span-2)
//     - Submit button (disabled when loading)
//
//   Each input should be a CONTROLLED INPUT:
//     <input
//       type="text"
//       name="firstName"
//       value={formData.firstName}
//       onChange={handleChange}
//       className={`... ${submitted && !formData.firstName ? "border-red" : "border-normal"}`}
//     />
//
//   Show validation error below each input:
//     {submitted && !formData.firstName && (
//       <p className="text-red-700 text-sm">First name is required</p>
//     )}

/* --- YOUR COMPONENT CODE GOES HERE --- */
import { useState } from "react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setMessage("Please fill in all the fields");
            return;
        }

        setLoading(true);
        try {
            await sendEmail(formData);
            setMessage("Thank you! Your message has been sent!");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
            setSubmitted(false);
        } catch {
            setMessage("Error sending message. Please try again. ");
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (data) => {
        console.log("Email would be sent with: ", data);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="items-center bg-inherit shadow-xl border-2 border-(--brown-700) rounded-lg p-3 gap-2 mb-5 grid grid-cols-1 md:grid-cols-2 xl:mr-4">
            <h2 className="col-span-1 md:col-span-2 text-center text-2xl font-bold mb-4">
                Send us a message. We'd love to hear from you!
            </h2>

            {message && (
                <p
                    className={`col-span-1 md:col-span-2 text-center text-sm font-medium ${
                        message.includes("Error") ? "text-red-700" : "text-green-700"
                    }`}>
                    {message}
                </p>
            )}

            <label className="flex flex-col gap-1">
                <span className="text-lg font-medium pl-1">First Name</span>
                <input
                    type="text"
                    name="firstName"
                    id="footer-firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
                        submitted && !formData.firstName
                            ? "border-red-800 text-red-600"
                            : "border-(--taupe)"
                    }`}
                />
                {submitted && !formData.firstName && (
                    <p className="text-red-700 text-sm">First name is required</p>
                )}
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-lg font-medium pl-1">Last Name</span>
                <input
                    type="text"
                    name="lastName"
                    id="footer-lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
                        submitted && !formData.lastName
                            ? "border-red-800 text-red-600"
                            : "border-(--taupe)"
                    }`}
                />
                {submitted && !formData.lastName && (
                    <p className="text-red-700 text-sm">Last name is required</p>
                )}
            </label>

            <label className="flex flex-col gap-1 col-span-1 md:col-span-2">
                <span className="text-lg font-medium pl-1">Email</span>
                <input
                    type="email"
                    name="email"
                    id="footer-email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
                        submitted && !formData.email
                            ? "border-red-800 text-red-600"
                            : "border-(--taupe)"
                    }`}
                />
                {submitted && !formData.email && (
                    <p className="text-red-700 text-sm">Email is required</p>
                )}
            </label>

            <label className="flex flex-col gap-1 col-span-1 md:col-span-2">
                <span className="text-lg font-medium pl-1">Message</span>
                <textarea
                    name="message"
                    id="footer-message"
                    placeholder="Enter your message here."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
                        submitted && !formData.message
                            ? "border-red-800 text-red-600"
                            : "border-(--taupe)"
                    }`}
                />
                {submitted && !formData.message && (
                    <p className="text-red-700 text-sm">Please enter a message</p>
                )}
            </label>

            <button
                type="submit"
                disabled={loading}
                className="col-span-1 text-center md:col-span-2 bg-(--brown-700) text-white p-2 rounded-md hover:bg-(--brown-700)/80 disabled:opacity-50 transition-colors">
                {loading ? "Sending..." : "Submit Message"}
            </button>
        </form>
    );
}
