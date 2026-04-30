import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Ashutosh is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer at PixelWorks",
    review:
      "Working with Ashutosh was an absolute pleasure. He brings design and code together like magic. Highly recommend him!",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    name: "Amy Jacobson",
    role: "Tech Manager at CodeEmpire",
    review:
      "From concept to execution, Ashutosh handled everything flawlessly. His work ethic and innovation are unmatched.",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    name: "Carry Smith",
    role: "CTO at Innovate Labs",
    review:
      "Ashutosh transformed our outdated platform into something modern and powerful. His skills are world-class.",
    image: "https://i.pravatar.cc/150?img=56",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-1 justify-center mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-amber-400 fill-amber-400"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Heading */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3 font-medium">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold">
          What People Say
        </h2>
        {/* Accent line */}
        <div className="mx-auto mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-white/0 via-white/60 to-white/0" />
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            // FIX: was `t.name + 1` (string concat with number) — now just t.name
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            // FIX: `once: true` stops re-triggering on scroll back up (prevents apparent double render)
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-2xl p-7 flex flex-col items-center text-center group cursor-default overflow-hidden"
          >
            {/* Top gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Large decorative quote mark */}
            <span className="absolute top-4 right-5 text-6xl text-white/[0.06] font-serif leading-none select-none">
              "
            </span>

            {/* Avatar */}
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-md scale-110" />
              <img
                src={t.image}
                alt={t.name}
                className="relative w-16 h-16 rounded-full border border-white/20 object-cover"
                loading="lazy"
              />
            </div>

            {/* Stars */}
            <StarRating count={t.rating} />

            {/* Review */}
            <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
              "{t.review}"
            </p>

            {/* Divider */}
            <div className="w-10 h-px bg-white/20 mb-4" />

            {/* Name & role */}
            <h3 className="text-base font-semibold text-white">{t.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
