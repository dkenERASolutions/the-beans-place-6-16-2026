// ============================================================
// STORIESPAGE.JSX — Our Story & Origins (Modern Landing Page)
// ============================================================
// A dedicated page showcasing coffee origin stories, farmer
// profiles, and the journey from farm to cup.
//
// DESIGN NOTES:
// - One continuous warm gradient runs the full page: every
//   section shares its boundary colour with its neighbour, so
//   there are no hard lines between sections.
// - The hero is genuinely dark (image + overlay sit BEHIND the
//   content, never behind a bright section background), so the
//   white headline always has contrast.
// - Partner cards are compact (4-up on desktop) and interactive
//   — click one to expand the full story.
// ============================================================

import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Coffee, Quote, ChevronDown } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/ui/ScrollReveal";
import Button from "../components/ui/Button";

const storyData = [
    {
        id: 1,
        name: "María Santos",
        role: "Coffee Farmer",
        location: "Huila, Colombia",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
        story: "For 30 years, my family has cultivated coffee on our mountain farm. Working directly with The Beans Place means our beans reach coffee lovers who truly understand their value.",
        specialty: "Geisha Varietal"
    },
    {
        id: 2,
        name: "James Chen",
        role: "Master Roaster",
        location: "Portland, Oregon",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop",
        story: "Every batch tells a story. I roast each origin to highlight its unique characteristics—never over-roasting, always respecting the farmer's hard work.",
        specialty: "Single-Origin Profiles"
    },
    {
        id: 3,
        name: "Amara Okonkwo",
        role: "Supply Chain Manager",
        location: "Addis Ababa, Ethiopia",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop",
        story: "I ensure every bean from our Ethiopian farms meets the highest standards. Fair trade isn't just a label—it's how we do business.",
        specialty: "Direct Trade Relations"
    },
    {
        id: 4,
        name: "Lucas Ferreira",
        role: "Coffee Sommelier",
        location: "São Paulo, Brazil",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop",
        story: "I curate our coffee experiences, pairing origins with preparation methods. Our Brazil Fazenda collection is a celebration of tropical terroir.",
        specialty: "Tasting Notes Expertise"
    }
];

const stats = [
    { label: "Farmers Partnered", value: "150+" },
    { label: "Countries Sourced", value: "12" },
    { label: "Annual Harvest (lbs)", value: "500K" },
    { label: "Customer Rating", value: "4.9★" }
];

const journey = [
    { step: "1", title: "Source", desc: "Direct relationships with farmers" },
    { step: "2", title: "Quality Check", desc: "Rigorous testing & grading" },
    { step: "3", title: "Roast", desc: "Small-batch roasting to order" },
    { step: "4", title: "Deliver", desc: "Fresh roasted to your door" }
];

// ── Interactive partner card ──────────────────────────────────
function PartnerCard({ person }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.article
            onClick={() => setOpen((v) => !v)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(30,23,20,0.12)] ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(30,23,20,0.22)]">
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--amber-light)]/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--brown-900)] shadow-sm">
                    {person.specialty}
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold leading-tight drop-shadow">{person.name}</h3>
                    <p className="text-xs font-semibold text-[var(--amber-light)]">{person.role}</p>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4">
                <p
                    className="mb-3 flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "var(--brown-600)" }}>
                    <MapPin size={13} className="text-[var(--amber-dark)]" />
                    {person.location}
                </p>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden">
                            <p
                                className="mb-3 text-sm italic leading-relaxed"
                                style={{ color: "var(--brown-800)" }}>
                                <Quote
                                    size={14}
                                    className="mb-1 inline text-[var(--amber-dark)]"
                                />{" "}
                                {person.story}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    type="button"
                    className="mt-auto inline-flex items-center gap-1 self-start text-sm font-semibold text-[var(--amber-dark)] transition-colors hover:text-[var(--amber)]">
                    {open ? "Show less" : "Read story"}
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={16} />
                    </motion.span>
                </button>
            </div>
        </motion.article>
    );
}

export default function StoriesPage() {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 400], [0, 120]);
    const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

    return (
        // One solid background colour for the whole page — no gradients,
        // no per-section blends. Every section below is transparent and
        // simply sits on this espresso tone.
        <div className="min-h-screen" style={{ background: "var(--espresso)" }}>
            {/* BACK BUTTON */}
            <motion.button
                onClick={() => navigate("/")}
                className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full bg-[var(--brown-900)]/70 px-4 py-2 text-sm font-semibold text-[var(--cream)] shadow-lg ring-1 ring-white/15 backdrop-blur-md transition hover:bg-[var(--brown-800)]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}>
                <ArrowLeft size={18} className="text-[var(--amber-light)]" />
                Back
            </motion.button>

            {/* ════════════ HERO ════════════ */}
            <section className="relative flex h-screen items-center justify-center overflow-hidden">
                {/* Parallax background image — sits behind content, with a
                    dark overlay so the white headline always reads clearly.
                    The bottom of the overlay fades to --espresso, the exact
                    colour the next section starts on (seamless handoff). */}
                <motion.div className="absolute inset-0" style={{ y: heroY }}>
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1447933601403-0c6688e1566e?w=1400&h=900&fit=crop')",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(30,23,20,0.45) 0%, rgba(30,23,20,0.38) 35%, rgba(28,22,20,0.70) 62%, rgba(26,23,21,0.94) 84%, var(--espresso) 100%)"
                        }}
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 mx-auto max-w-3xl px-5 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 inline-block rounded-full border border-[var(--amber)]/30 bg-[var(--amber)]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--amber-light)] backdrop-blur-sm">
                        ✦ From Farm to Cup
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
                        style={{ fontFamily: "var(--font-heading)" }}>
                        The Stories <br /> Behind Your Coffee
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="mx-auto mb-8 max-w-xl text-base text-white/85 sm:text-lg md:text-xl">
                        Meet the farmers, roasters, and coffee enthusiasts who make every cup
                        extraordinary.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Button
                            variant="accent"
                            size="lg"
                            onClick={() =>
                                document
                                    .getElementById("partners")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }>
                            Explore Stories
                        </Button>
                        <Button variant="ghost" size="lg">
                            Watch Video
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-white/80">
                    <p className="mb-2 text-xs uppercase tracking-widest">Scroll</p>
                    <div className="mx-auto flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/60">
                        <motion.div
                            className="mt-2 h-2 w-1 rounded-full bg-white/80"
                            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* ════════════ STATS ════════════ */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-10 backdrop-blur-sm md:grid-cols-4 md:gap-10">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}>
                                <div
                                    className="mb-1 text-3xl font-bold md:text-4xl"
                                    style={{ color: "var(--amber-light)" }}>
                                    {stat.value}
                                </div>
                                <p
                                    className="text-xs font-medium uppercase tracking-wide md:text-sm"
                                    style={{ color: "var(--cream)" }}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════ PARTNERS ════════════ */}
            <section id="partners" className="scroll-mt-20 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <p className="mb-3 text-center text-sm font-bold uppercase tracking-widest text-[var(--amber-light)]">
                            The People
                        </p>
                        <h2
                            className="mb-4 text-center text-3xl font-bold md:text-5xl"
                            style={{ color: "var(--cream)", fontFamily: "var(--font-heading)" }}>
                            Meet Our Partners
                        </h2>
                        <p
                            className="mx-auto mb-12 max-w-2xl text-center text-base md:text-lg"
                            style={{ color: "var(--taupe)" }}>
                            From farm to your cup — these are the people who make The Beans Place
                            possible. Tap a card to read their story.
                        </p>
                    </ScrollReveal>

                    <StaggerContainer>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {storyData.map((person) => (
                                <StaggerItem key={person.id}>
                                    <PartnerCard person={person} />
                                </StaggerItem>
                            ))}
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            {/* ════════════ JOURNEY ════════════ */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <ScrollReveal>
                        <h2
                            className="mb-12 text-center text-3xl font-bold md:text-5xl"
                            style={{ color: "var(--cream)", fontFamily: "var(--font-heading)" }}>
                            Our Journey
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
                        {journey.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative text-center">
                                <div
                                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold shadow-lg"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, var(--amber-light), var(--amber))",
                                        color: "var(--brown-900)"
                                    }}>
                                    {item.step}
                                </div>
                                <h3
                                    className="mb-1.5 text-lg font-bold"
                                    style={{ color: "var(--cream)" }}>
                                    {item.title}
                                </h3>
                                <p
                                    className="mx-auto max-w-[14rem] text-sm"
                                    style={{ color: "var(--taupe)" }}>
                                    {item.desc}
                                </p>
                                {idx < journey.length - 1 && (
                                    <div className="absolute -right-3 top-7 hidden h-px w-6 bg-[var(--amber)]/40 md:block" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════ CTA ════════════ */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <ScrollReveal>
                        <h2
                            className="mb-4 text-3xl font-bold md:text-5xl"
                            style={{ color: "var(--cream)", fontFamily: "var(--font-heading)" }}>
                            Ready for Your Best Cup Yet?
                        </h2>
                        <p
                            className="mx-auto mb-8 max-w-xl text-base md:text-lg"
                            style={{ color: "var(--taupe)" }}>
                            Shop our curated single-origin coffees and experience the taste of direct
                            trade.
                        </p>
                        <div className="flex flex-col justify-center gap-3 sm:flex-row">
                            <Button variant="accent" size="lg">
                                <Coffee size={18} /> Shop Coffee
                            </Button>
                            <Button variant="ghost" size="lg" onClick={() => navigate("/")}>
                                Back to Home
                            </Button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
