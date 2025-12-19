import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../components/ParticlesBackground";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  // ------------------ INPUT HANDLER ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow only numbers in budget
    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ------------------ VALIDATION ------------------
  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Fill this field";
      }
    });

    if (formData.service !== "other" && !formData.budget.trim()) {
      newErrors.budget = "Fill this field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          service: formData.service,
          budget: formData.budget,
          idea: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  // ------------------ UI ------------------
  return (
    <section
      id="contact"
      className="w-full min-h-[100svh] relative bg-black overflow-hidden text-white
                 py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-16"
    >
      {typeof window !== "undefined" && window.innerWidth > 768 && (
        <ParticlesBackground />
      )}

      {/* ---------- LEFT : IMAGE ---------- */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src={Astra}
          alt="Contact Illustration"
          className="w-72 md:w-96 rounded-2xl shadow-lg object-cover"
          style={{ willChange: "transform" }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* ---------- RIGHT : FORM ---------- */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 bg-white/5 p-8 rounded-2xl
                   shadow-lg border border-white/10"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Let’s work together
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* NAME */}
          <Input
            label="Your Name"
            name="name"
            value={formData.name}
            error={errors.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            label="Your Email"
            name="email"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
          />

          {/* SERVICE */}
          <div className="flex flex-col">
            <label className="mb-1">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.service ? "border-red-500" : "border-gray-500"
              } text-white`}
            >
              <option value="" disabled className="text-black">
                Something in mind?
              </option>
              <option value="web" className="text-black">
                Web Development
              </option>
              <option value="mobile" className="text-black">
                Mobile Application
              </option>
              <option value="other" className="text-black">
                Others
              </option>
            </select>
            {errors.service && (
              <p className="text-red-500 text-xs mt-1">{errors.service}</p>
            )}
          </div>

          {/* BUDGET */}
          {formData.service && formData.service !== "other" && (
            <Input
              label="Budget"
              name="budget"
              value={formData.budget}
              error={errors.budget}
              onChange={handleChange}
            />
          )}

          {/* IDEA */}
          <div className="flex flex-col">
            <label className="mb-1">
              Explain Your Idea <span className="text-red-500">*</span>
            </label>
            <textarea
              name="idea"
              rows={5}
              value={formData.idea}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.idea ? "border-red-500" : "border-gray-500"
              } text-white`}
            />
            {errors.idea && (
              <p className="text-red-500 text-xs mt-1">{errors.idea}</p>
            )}
          </div>

          {/* STATUS */}
          {status && (
            <p
              className={`text-sm ${
                status === "success"
                  ? "text-green-400"
                  : status === "error"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Message sent successfully!"
                : "Something went wrong"}
            </p>
          )}

          {/* BUTTON */}
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                       text-white px-5 py-2 rounded-md"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

// ------------------ INPUT COMPONENT ------------------
function Input({ label, name, type = "text", value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`p-3 rounded-md bg-white/10 border ${
          error ? "border-red-500" : "border-gray-500"
        } text-white`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
