import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
import Input, { Textarea } from "./ui/Input";
import Button from "./ui/Button";

const contactChannels = [
    {
        name: "Visit Our Roastery",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
            </svg>
        ),
        gradient: "from-amber-700 to-amber-500",
        accentColor: "var(--amber)",
        detail: "Beans Place, Strasburg, CO 80136",
        action: "Get Directions",
        href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
    },
    {
        name: "Opening Hours",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        gradient: "from-yellow-700 to-yellow-500",
        accentColor: "#ca8a04",
        detail: "Mon–Fri: 7am–6pm  |  Sat–Sun: 8am–4pm",
        action: "Plan Your Visit",
        href: "#contact"
    },
    {
        name: "Email Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        ),
        gradient: "from-orange-700 to-orange-500",
        accentColor: "#c2410c",
        detail: "hello@thebeansplace.com",
        action: "Send Email",
        href: "mailto:hello@thebeansplace.com"
    },
    {
        name: "Call Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
            </svg>
        ),
        gradient: "from-stone-700 to-stone-500",
        accentColor: "#78716c",
        detail: "(303) 555-BEAN",
        action: "Call Now",
        href: "tel:+13035552326"
    }
];

/* ── Tilt card with mouse tracking ── */
function TiltCard({ children, className, href, target, rel }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
        stiffness: 200,
        damping: 20
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
        stiffness: 200,
        damping: 20
    });

    function handleMouse(e) {
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function handleLeave() {
        x.set(0);
        y.set(0);
    }

    const Tag = href ? motion.a : motion.div;

    return (
        <Tag
            ref={ref}
            href={href}
            target={target}
            rel={rel}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformPerspective: 600 }}
            className={className}>
            {children}
        </Tag>
    );
}

/* ── Contact form with animations ── */
function ContactFormInline() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        category: "general",
        preferredContact: "email",
        message: "",
        subscribe: false
    });
    const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'
    const [touched, setTouched] = useState({});

    const categories = [
        { value: "general", label: "General Inquiry" },
        { value: "orders", label: "Bulk Orders" },
        { value: "events", label: "Event Catering" },
        { value: "partnership", label: "Partnership" },
        { value: "feedback", label: "Feedback" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true, phone: true });

        if (!formData.name || !formData.email || !formData.message) return;

        setStatus("sending");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1200));
            setStatus("sent");
            setFormData({
                name: "",
                email: "",
                phone: "",
                category: "general",
                preferredContact: "email",
                message: "",
                subscribe: false
            });
            setTouched({});
            setTimeout(() => setStatus(null), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 4000);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="contact-form-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            {/* Form header */}
            <div className="mb-8">
                <h3 className="contact-form-title">Send a Message</h3>
                <p className="contact-form-subtitle">
                    We'd love to hear from you. Fill out the form and we'll respond within 24 hours.
                </p>
            </div>

            {/* Name and Email Row */}
            <div className="contact-form-grid">
                <Input
                    label="Your Name"
                    id="contact-name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !formData.name ? "Name is required" : undefined}
                />
                <Input
                    label="Email Address"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !formData.email ? "Email is required" : undefined}
                />
            </div>

            {/* Phone and Category Row */}
            <div className="contact-form-grid mt-4">
                <Input
                    label="Phone Number"
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="(303) 555-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && !formData.phone ? "Phone is required" : undefined}
                />
                <div className="contact-form-field">
                    <label htmlFor="contact-category" className="contact-form-label">
                        Inquiry Category
                    </label>
                    <select
                        id="contact-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="contact-form-select">
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="mt-4">
                <label className="contact-form-label">Preferred Contact Method</label>
                <div className="contact-form-radio-group">
                    {[
                        { value: "email", label: "Email" },
                        { value: "phone", label: "Phone" },
                        { value: "both", label: "Either" }
                    ].map((option) => (
                        <label key={option.value} className="contact-form-radio">
                            <input
                                type="radio"
                                name="preferredContact"
                                value={option.value}
                                checked={formData.preferredContact === option.value}
                                onChange={handleChange}
                                className="contact-form-radio-input"
                            />
                            <span className="contact-form-radio-label">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Message */}
            <div className="mt-4">
                <Textarea
                    label="Message"
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && !formData.message ? "Message is required" : undefined}
                />
            </div>

            {/* Newsletter Checkbox */}
            <div className="mt-4">
                <label className="contact-form-checkbox">
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="contact-form-checkbox-input"
                    />
                    <span className="contact-form-checkbox-label">
                        Subscribe to our newsletter for exclusive offers and updates
                    </span>
                </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="contact-form-submit w-full sm:w-auto"
                    disabled={status === "sending"}>
                    {status === "sending" ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Sending...
                        </span>
                    ) : status === "sent" ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Message Sent!
                        </span>
                    ) : (
                        "Send Message"
                    )}
                </Button>

                {status === "error" && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-red-400">
                        Something went wrong. Please try again.
                    </motion.span>
                )}
            </div>

            {/* Form Note */}
            <p className="text-xs text-gray-400 mt-4">
                We respect your privacy. Your information will only be used to respond to your
                inquiry.
            </p>
        </motion.form>
    );
}

export default function ContactSection() {
    const sectionRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        let frame = 0;
        let nextX = 0;
        let nextY = 0;

        const apply = () => {
            frame = 0;
            const glow = glowRef.current;
            if (glow) {
                glow.style.transform = `translate3d(${nextX - 192}px, ${nextY - 192}px, 0)`;
            }
        };

        const handleMouseMove = (e) => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                nextX = e.clientX;
                nextY = e.clientY;
                // Coalesce moves into a single paint per frame instead of
                // re-rendering React on every mousemove event.
                if (!frame) frame = requestAnimationFrame(apply);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div className="contact-section-wrap" ref={sectionRef}>
            {/* Background effects */}
            <div className="contact-bg-effects">
                <div className="contact-bg-orb contact-bg-orb--1" />
                <div className="contact-bg-orb contact-bg-orb--2" />
                <div className="contact-bg-orb contact-bg-orb--3" />
                <div className="contact-bg-grid" />
            </div>

            <div className="contact-inner">
                {/* Header */}
                <ScrollReveal animation="fadeUp" className="contact-header">
                    <motion.div
                        className="contact-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}>
                        <span>✦ Connect & Collaborate</span>
                    </motion.div>

                    <h1 className="h1-stack" style={{ color: "var(--cream)" }}>
                        GET IN
                        <span className="muted" style={{ color: "var(--amber)" }}>
                            TOUCH
                        </span>
                    </h1>

                    <p className="lead--light" style={{ maxWidth: "52ch", margin: "10px auto 0" }}>
                        Whether you're ordering beans, planning an event, or just want to say hello
                        — we'd love to hear from you.
                    </p>

                    <Separator className="mt-4 mb-2 mx-auto max-w-48" />
                </ScrollReveal>

                {/* Two-column: Form + Info Cards */}
                <div className="contact-layout">
                    {/* Left: Contact Form */}
                    <div className="contact-form-col">
                        <ContactFormInline />
                    </div>

                    {/* Right: Info Cards + Social */}
                    <div className="contact-info-col">
                        <StaggerContainer className="contact-info-cards" staggerDelay={0.1}>
                            {contactChannels.map((channel) => (
                                <StaggerItem key={channel.name} animation="fadeUp">
                                    <TiltCard
                                        href={channel.href}
                                        target={
                                            channel.href.startsWith("http") ? "_blank" : undefined
                                        }
                                        rel={
                                            channel.href.startsWith("http")
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="contact-card-link">
                                        <div className="contact-card">
                                            <div
                                                className="contact-card-accent"
                                                style={{ background: channel.accentColor }}
                                            />
                                            <div className="contact-card-content">
                                                <div
                                                    className={`contact-card-icon bg-gradient-to-br ${channel.gradient}`}>
                                                    {channel.icon}
                                                </div>
                                                <div className="contact-card-text">
                                                    <h3 className="contact-card-title">
                                                        {channel.name}
                                                    </h3>
                                                    <p className="contact-card-detail">
                                                        {channel.detail}
                                                    </p>
                                                </div>
                                                <div className="contact-card-arrow">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="contact-card-shimmer" />
                                        </div>
                                    </TiltCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Social Links Row */}
                        <ScrollReveal animation="fadeUp" delay={0.4} className="contact-social-row">
                            <span className="contact-social-label">Follow Us</span>
                            <div className="contact-social-icons">
                                {[
                                    {
                                        name: "Instagram",
                                        href: "https://instagram.com",
                                        icon: (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "Facebook",
                                        href: "https://facebook.com",
                                        icon: (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5">
                                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        name: "X / Twitter",
                                        href: "#",
                                        icon: (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-5 h-5">
                                                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                                            </svg>
                                        )
                                    }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="contact-social-link">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Mouse follow glow (desktop only) */}
            <div
                ref={glowRef}
                className="contact-mouse-glow"
                style={{ left: 0, top: 0, pointerEvents: "none", willChange: "transform" }}
            />
        </div>
    );
}
