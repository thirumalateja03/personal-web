import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Brain,
  Globe,
  Terminal,
  Database,
  Cloud,
  Server,
  Cpu,
} from "lucide-react";

const InteractiveBackground = () => {
  const [particles, setParticles] = useState([]);
  // eslint-disable-next-line
  const [_mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate random particle
  const createParticle = useCallback((x, y, isClick = false) => {
    const speed = isClick ? 3 : 1;
    return {
      id: Math.random(),
      x,
      y,
      size: Math.random() * (isClick ? 20 : 8) + 4,
      velocity: {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
      },
      opacity: 1,
      color: isClick
        ? `hsla(${Math.random() * 60 + 190}, 100%, 70%, 0.3)`
        : "rgba(56, 189, 248, 0.2)",
      createdAt: Date.now(),
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.8) {
        // Only create particles sometimes for performance
        setParticles((prev) => [...prev, createParticle(e.clientX, e.clientY)]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createParticle]);

  // Handle clicks
  const handleClick = useCallback(
    (e) => {
      const newParticles = Array.from({ length: 10 }, () =>
        createParticle(e.clientX, e.clientY, true)
      );
      setParticles((prev) => [...prev, ...newParticles]);
    },
    [createParticle]
  );

  // Update particle positions and remove old ones
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            opacity: Math.max(0, 1 - (Date.now() - particle.createdAt) / 2000),
          }))
          .filter(
            (particle) =>
              particle.opacity > 0 &&
              particle.x > 0 &&
              particle.x < window.innerWidth &&
              particle.y > 0 &&
              particle.y < window.innerHeight
          )
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" onClick={handleClick}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            left: particle.x,
            top: particle.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

const ParticlePortfolio = () => {
  // eslint-disable-next-line
  const [_isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [activeSection, setActiveSection] = useState("home");
  // eslint-disable-next-line
  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  // eslint-disable-next-line
  const [_activeSkill, setActiveSkill] = useState(null);

  const skills = {
    frontend: ["React", "Angular", "JavaScript", "HTML/CSS"],
    backend: ["Node.js", "Python", "Java", "MySQL"],
    ai: ["Machine Learning", "Deep Learning", "Prompt Engineering", "CodeT5"],
  };

  const projects = {
    "Alzheimer's Detection Using CNN with ResNet": [
      "Developed a CNN model using ResNet for MRI data",
      "Trained on ADNI dataset with 98% accuracy",
      "Optimized preprocessing for reliable early detection",
    ],
    "Restaurant Management System": [
      "Designed MEAN stack app for order management",
      "Features: QR-based orders, real-time tracking, admin panel",
      "Reduced workload by 60%, improved accuracy and delivery",
    ],
  };

  const experience = [
    {
      company:
        "Jamsetji Tata Society for Innovation and Entrepreneurship (JITSIE)",
      role: "DevOps",
      period: "2023 - 2026",
      highlights: [
        "Developed JITSIE's website to enhance digital presence",
        "Designed an intuitive UI using Figma",
        "Built a responsive site with dynamic content features",
        "Improved online engagement and accessibility",
      ],
    },
  ];

  const handleNavigation = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrolled / maxScroll);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden">
      {/* Interactive background elements */}
      <InteractiveBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-sky-500"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold text-sky-400"
            >
              .Dev
            </motion.div>
            <div className="flex gap-8">
              {["Home", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  className="text-sky-100 hover:text-sky-400 transition-colors"
                  onClick={() => handleNavigation(item.toLowerCase())}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative" id="home">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 px-6"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
                Tirumala Teja
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-sky-200"
            >
              AI Engineer & Full Stack Developer
            </motion.div>

            {/* Animated Tech Stack Icons */}
            <motion.div className="flex justify-center gap-8 py-8">
              {[Terminal, Brain, Globe, Database, Cloud].map((Icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-4 bg-sky-950/30 rounded-xl backdrop-blur-sm"
                >
                  <Icon className="w-8 h-8 text-sky-400" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="min-h-screen py-20 px-6" id="skills">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-sky-950/30 rounded-xl backdrop-blur-sm border border-sky-500/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-sky-400 capitalize">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {skillList.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2"
                      >
                        <Cpu className="w-4 h-4 text-sky-400" />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section className="min-h-screen py-20 px-6 bg-black/20" id="experience">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 bg-sky-950/30 rounded-xl backdrop-blur-sm border border-sky-500/10"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-sky-400">
                        {exp.company}
                      </h3>
                      <p className="text-sky-200">{exp.role}</p>
                    </div>
                    <span className="text-sky-300/70">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Server className="w-4 h-4 text-sky-400" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="min-h-screen py-20 px-6" id="projects">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(projects).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-sky-950/30 rounded-xl backdrop-blur-sm border border-sky-500/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-sky-400 capitalize">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {skillList.map((skill) => (
                      <motion.div
                        key={skill}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-left"
                      >
                        <Cpu className="w-4 h-4 text-sky-400" />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6" id="contact">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-7xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-12">Let's Connect</h2>
            <motion.div
              className="flex justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {[
                { Icon: Github, label: "GitHub", link: 'https://github.com/thirumalateja03' },
                { Icon: Linkedin, label: "LinkedIn", link: 'https://www.linkedin.com/in/reddy-tirumala-teja-25a934252/' },
                { Icon: Mail, label: "Email", link: 'mailto:thirumalateja03@gmail.com'},
              ].map(({ Icon, label, link }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-sky-950/30 rounded-xl backdrop-blur-sm border border-sky-500/10 text-sky-400 hover:text-sky-300"
                  href={link}
                >
                  <Icon className="w-8 h-8" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .bg-grid {
          background-image: linear-gradient(
              to right,
              rgba(56, 189, 248, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(56, 189, 248, 0.1) 1px,
              transparent 1px
            );
          background-size: 4rem 4rem;
        }
      `}</style>
    </div>
  );
};

export default ParticlePortfolio;
