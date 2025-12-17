import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const projects = [
  {
    stack: "MERN",
    title: "Wander-Lust",
    description:
      "A full-stack travel discovery and booking platform where users can explore destinations, create trips, save itineraries, and share experiences.",
    features: [
      "JWT-based authentication",
      "Destination search & filters",
      "Responsive UI with Tailwind",
      "MongoDB-backed itinerary storage",
    ],
  },
  {
    stack: "MERN + Payment Gateway",
    title: "DigiPay",
    description:
      "A digital wallet & payment gateway enabling payments, transactions, expense tracking, and user-to-user transfers.",
    features: [
      "Real-time transaction history",
      "Secure OTP authentication",
      "U2U payments",
      "Admin monitoring dashboard",
    ],
  },
  {
    stack: "React + Node",
    title: "Dynamic Portfolio",
    description:
      "A fully dynamic developer portfolio that fetches projects, skills, and data from backend CMS or database.",
    features: [
      "Dynamic content via APIs",
      "Framer Motion animations",
      "Admin CMS to update portfolio",
      "Mobile-first UI",
    ],
  },
];

// ———————————————————————————————————————————
//                 PROJECT ITEM
// ———————————————————————————————————————————

function ProjectItem({ project, idx, start, end, scrollYProgress, layout }) {
  // Smooth fade + slide + scale
  const opacity = useTransform(scrollYProgress, [start + 0.05, end - 0.05], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.85, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [idx % 2 === 0 ? 60 : -60, 0]
  );

  // Hide element fully until visible (no ghost)
  const display = useTransform(opacity, (o) => (o === 0 ? "none" : "block"));

  const featuresText = project.features.join(" • ");

  // DESKTOP LAYOUT
  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0 pointer-events-none">
        {/* Timeline Dot */}
        <motion.div
          className="z-10 w-8 h-8 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.25)]"
          style={{ scale, opacity }}
        />

        {/* Connector Line */}
        <motion.div
          className={`absolute ${
            idx % 2 === 0 ? "-top-14" : "-bottom-14"
          } w-[3px] bg-white/40`}
          style={{ height: 60, opacity }}
        />

        {/* Main Card */}
        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-24" : "top-24"
          } bg-[#0d1117]/90 border border-gray-700/70 backdrop-blur-xl rounded-xl p-7 w-[360px] shadow-xl pointer-events-auto`}
          style={{ opacity, y, scale, display }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{project.stack}</p>

          <p className="text-sm text-gray-300">{project.description}</p>

          <p className="mt-3 text-xs text-gray-500">{featuresText}</p>
        </motion.article>
      </div>
    );
  }

  // MOBILE LAYOUT
  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.15)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="bg-[#0d1117]/90 border border-gray-700/70 backdrop-blur-xl rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity, scale, y, display }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{project.stack}</p>
        <p className="text-sm text-gray-300">{project.description}</p>
        <p className="mt-2 text-xs text-gray-500">{featuresText}</p>
      </motion.article>
    </div>
  );
}

// ———————————————————————————————————————————
//                 EXPERIENCE SECTION
// ———————————————————————————————————————————

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);
  const sceneRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const SCENE_HEIGHT = isMobile ? 180 * projects.length : 130 * projects.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () =>
      projects.map((_, i) => ({
        start: i / projects.length,
        end: (i + 1) / projects.length,
      })),
    []
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-5xl font-semibold mt-8 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {/* DESKTOP TIMELINE */}
            {!isMobile && (
              <div className="relative w-full max-w-7xl mx-auto">
                <div className="relative h-[6px] bg-white/20 rounded overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white/70"
                    style={{ width: lineSize }}
                  />
                </div>

                {/* Items */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 
                flex justify-between items-center gap-48">
                  {projects.map((p, i) => {
                    const { start, end } = thresholds[i];
                    return (
                      <ProjectItem
                        key={p.title}
                        project={p}
                        idx={i}
                        start={start}
                        end={end}
                        scrollYProgress={scrollYProgress}
                        layout="desktop"
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* MOBILE TIMELINE */}
            {isMobile && (
              <div className="relative w-full max-w-sm mx-auto mt-10">
                <div className="absolute left-[12px] top-0 bottom-0 w-[3px] bg-white/15" />

                <div className="flex flex-col gap-10">
                  {projects.map((p, i) => {
                    const { start, end } = thresholds[i];
                    return (
                      <ProjectItem
                        key={p.title}
                        project={p}
                        idx={i}
                        start={start}
                        end={end}
                        scrollYProgress={scrollYProgress}
                        layout="mobile"
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
