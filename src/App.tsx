/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send,
  CheckCircle2,
  Lock,
  Globe,
  Layers,
  Terminal,
  ArrowUpRight
} from "lucide-react";

// @ts-ignore
import novoxVideo from "./assets/novox_video.mp4";
// @ts-ignore
import novoxBg from "./assets/images/novox_bg_1781808182228.jpg";
// @ts-ignore
import secureCloudImg from "./assets/images/secure_cloud_thumbnail_1781812342306.jpg";
// @ts-ignore
import fintechPortalImg from "./assets/images/fintech_portal_thumbnail_1781812361935.jpg";
// @ts-ignore
import enterpriseAiImg from "./assets/images/enterprise_ai_thumbnail_1781812377773.jpg";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState("جاري فحص الاتصال المشفر...");
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedLink, setSelectedLink] = useState("الرئيسية");
  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    // Smooth responsive offsets for 3D premium feel
    const dx = (x - rect.width / 2) * 0.05;
    const dy = (y - rect.height / 2) * 0.05;
    setOffset({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    let currentProgress = 0;
    
    const statuses = [
      "جاري فحص الاتصال المشفر...",
      "بروتوكول الاتصال حماية عسكرية آمنة...",
      "تمكين قنوات تشفير البيانات السيادية...",
      "التحقق من حزم محرك بوابة NOVOX...",
      "تم تبادل المفاتيح بنجاح. بدء التشغيل..."
    ];
    
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
      setLoadingProgress(currentProgress);
      
      const statusIdx = Math.min(Math.floor((currentProgress / 100) * statuses.length), statuses.length - 1);
      setLoaderStatus(statuses[statusIdx]);
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay was prevented initially, waiting for user interaction:", error);
          // Fallback check on document interaction to boot player seamlessly
          const forcePlay = () => {
            video.play();
            document.removeEventListener("click", forcePlay);
            document.removeEventListener("touchstart", forcePlay);
          };
          document.addEventListener("click", forcePlay);
          document.addEventListener("touchstart", forcePlay);
        });
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
        setShowContactModal(false);
      }, 1800);
    }
  };

  // Helper list of links from the image (ordered left-to-right as visible in reference)
  const navLinks = [
    { label: "الرئيسية", id: "home" },
    { label: "عنَّا", id: "about" },
    { label: "خدماتنا", id: "services" },
    { label: "أعمالنا", id: "work" }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-white overflow-hidden flex flex-col justify-center items-center p-4 md:p-8">
      
      {/* Cinematic Luxury Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="portal-loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: "blur(8px)",
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 bg-[#020202] z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none"
          >
            {/* Top Bar Indicators */}
            <div className="flex justify-between items-center w-full font-mono text-[10px] sm:text-xs text-neutral-500 tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYSTEM STATUS: SECURING NETWORK</span>
              </div>
              <div className="hidden sm:block">
                <span>NOVOX © SOVEREIGN SYSTEM v2.6.0</span>
              </div>
            </div>

            {/* Core Center Elements */}
            <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              {/* Spinning / Pulsing Military Grade Crest Icon */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-neutral-900 bg-neutral-950/40 mb-8 overflow-hidden group shadow-[0_0_50px_rgba(255,255,255,0.02)]"
              >
                <div className="absolute inset-0 border border-t-white/20 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:3s]" />
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
              </motion.div>

              {/* Headings */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-outfit text-2xl sm:text-3xl font-black tracking-[0.25em] text-white uppercase"
              >
                NOVOX PORTAL
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-arabic text-base sm:text-lg font-bold text-neutral-400 mt-2 tracking-wide"
              >
                بوابة السيادة الرقمية الآمنة
              </motion.p>

              {/* Progress Container */}
              <div className="w-64 sm:w-80 mt-10 flex flex-col items-center">
                {/* Micro line */}
                <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-neutral-800 via-white to-neutral-800"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>

                {/* Counter & Status */}
                <div className="flex justify-between items-center w-full mt-3 text-[11px] sm:text-xs">
                  <span className="font-mono text-neutral-500 tracking-wider">
                    DECRYPTING...
                  </span>
                  <span className="font-mono text-white font-bold text-sm tracking-widest">
                    {String(loadingProgress).padStart(3, '0')}%
                  </span>
                </div>

                {/* Sub-status Text */}
                <motion.div 
                  key={loaderStatus}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-arabic text-xs text-neutral-400 mt-2 text-center"
                >
                  {loaderStatus}
                </motion.div>
              </div>
            </div>

            {/* Bottom Metadata Indicators */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest uppercase">
              <div>
                <span>AES_256_GCM // SHIELD_INTEGRITY_INDEX: 1.0</span>
              </div>
              <div className="flex items-center gap-3">
                <span>RIYADH, KINGDOM OF SAUDI ARABIA</span>
                <span className="w-1 h-1 bg-neutral-700 rounded-full" />
                <span className="text-neutral-500 font-arabic">المملكة العربية السعودية</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        16:9 ASPECT RATIO SCREEN EMBED / THEATRIC PREVIEW CONTAINER
        Fits the viewport dynamically, staying perfectly proportioned at 16:9 on desktop,
        and transitions to a beautifully fluid mobile scrollable card layout on smaller screens.
      */}
      <div 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        id="hero-canvas-16-9"
        className="w-full max-w-7xl md:aspect-[16/9] min-h-[90vh] md:min-h-0 relative bg-transparent rounded-2xl border border-neutral-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-14 lg:p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)] select-none group/canvas"
      >
        
        {/*
          BACKGROUND LOOPS AND CONTROLS
          Loads the user-specified background video directly from Google Drive stream, looping & muted.
          Optimized with full brightness for maximum visual brilliance with a subtle spatial parallax interaction.
        */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={novoxBg}
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ 
            objectPosition: "center",
            transform: `scale(1.08) translate(${offset.x * -0.3}px, ${offset.y * -0.3}px)`,
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        >
          <source src="/api/video" type="video/mp4" />
          <source src={novoxVideo} type="video/mp4" />
          <source src="https://drive.usercontent.google.com/download?id=1M7Y9lcxlZbmesy8U9cNFsn3IT8In0-xW&export=download" type="video/mp4" />
        </video>

        {/* 
          DYNAMIC MICRO-INTERACTION SPOTLIGHT GLOW
          Responsive laser glow layer that track pointer movement for high-end feel.
        */}
        <div 
          className="absolute pointer-events-none inset-0 z-[2] transition-opacity duration-500 opacity-0 group-hover/canvas:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01) 40%, transparent 70%)`
          }}
        />
        
        {/* 
          1. CONCENTRIC CIRCLE BACKGROUND PATTERN (SVG RADIATING FROM THE RIGHT EDGE)
          Extremely precise, infinite-resolution gray vector curves mimicking the reference perfectly.
          Features intelligent micro-friction parallax movement following the user's cursor.
        */}
        <div className="absolute right-0 top-0 bottom-0 h-full w-[60%] pointer-events-none z-1 overflow-hidden">
          <svg 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[240%] aspect-square translate-x-[20%] opacity-40 hover:opacity-60 transition-opacity duration-1000"
            viewBox="0 0 1000 1000" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Generates concentric circular line arcs matching the screenshot exactly */}
            {Array.from({ length: 14 }).map((_, index) => {
              const radius = 180 + index * 62;
              return (
                <circle 
                  key={index} 
                  cx={900 + offset.x * 1.2} 
                  cy={500 + offset.y * 1.2} 
                  r={radius} 
                  stroke="rgba(255, 255, 255, 0.08)" 
                  strokeWidth="1.25"
                  style={{
                    transition: isHovered ? "cx 0.15s ease-out, cy 0.15s ease-out" : "cx 0.8s cubic-bezier(0.25, 1, 0.5, 1), cy 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                  }}
                />
              );
            })}
          </svg>
        </div>

        {/* Ambient background aura on lower left corner */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-950/30 rounded-full blur-[100px] pointer-events-none z-1" />

        {/* 
          2. HEADER / TOP NAVIGATION BAR (Upper left: Arabic, Upper right: Menu Pill)
        */}
        <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left menu: Arabic categories matching exact text sequence in preview */}
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-10 justify-center w-full sm:w-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setSelectedLink(link.label)}
                className={`text-xs sm:text-sm md:text-base font-arabic font-medium tracking-wide transition-all duration-300 relative py-1 cursor-pointer select-none ${
                  selectedLink === link.label 
                    ? "text-white font-semibold transform scale-105" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
                {selectedLink === link.label && (
                  <motion.div 
                    layoutId="headerSelectedLine" 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right menu: Perfect replica of the [ Menu | .. ] Pill and dot controls */}
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
            <button 
              onClick={() => setShowContactModal(true)}
              className="flex items-center bg-[#1c1c1c]/90 hover:bg-[#282828] border border-neutral-800/80 rounded-full py-1.5 px-4 sm:py-2 sm:px-5 gap-3 sm:gap-4 backdrop-blur-md shadow-lg transition-all duration-300 cursor-pointer select-none group"
            >
              <span className="text-xs md:text-sm font-medium tracking-wide text-neutral-200 font-outfit transition-colors group-hover:text-white">Menu</span>
              <div className="w-[1px] h-3.5 bg-neutral-800" />
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-white transition-colors" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-white transition-colors" />
              </div>
            </button>
          </div>

        </header>

        {/* 
          3. MAIN HERO CONTENT AREA (Switches dynamically based on selectedLink)
        */}
        <main className="relative z-10 my-auto w-full flex flex-col justify-center items-start pt-6 pb-6 md:pt-4">
          <AnimatePresence mode="wait">
            {selectedLink === "الرئيسية" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-start"
              >
                {/* Brand Mega Text Heading - Bold, geometric, uppercase Outfit */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none text-white font-outfit select-none">
                    NOVO X
                  </h1>
                </motion.div>

                {/* Core Brand Subtitle Paragraph - elegant text density */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="mt-3 md:mt-6 text-neutral-400 text-[11px] sm:text-xs md:text-base leading-relaxed tracking-wide font-sans max-w-sm md:max-w-xl text-left select-text"
                >
                  We Innovate. We Secure. We Transform. Step into the future with our cutting-edge solutions.
                </motion.p>

                {/* Interactive Button row aligned horizontally with vertical separator */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="mt-6 md:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 md:gap-6 w-full xs:w-auto"
                >
                  {/* Elegant action pill [ اكتشف | .. ] */}
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="flex items-center justify-between xs:justify-start bg-[#1c1c1c]/90 hover:bg-[#282828] border border-neutral-800/80 rounded-full py-2.5 px-5 sm:py-3 sm:px-6 gap-4 backdrop-blur-md shadow-xl transition-all duration-300 cursor-pointer select-none group w-full xs:w-auto"
                  >
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-white font-arabic transition-all">اكتشف</span>
                    <div className="w-[1px] h-4 bg-neutral-800 hidden xs:block" />
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-110 transition-transform duration-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Subtle, beautiful vertical line divider */}
                  <div className="h-6 w-[1.5px] bg-neutral-800 hidden xs:block" />

                  {/* Perfect WhatsApp element layout */}
                  <a 
                    href="https://wa.me/966500000000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 group translate-y-[0px] cursor-pointer"
                  >
                    {/* WhatsApp green styled circular ring/emblem */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-neutral-800/80 flex items-center justify-center transition-all bg-[#0a0a0a] group-hover:bg-[#121212] group-hover:border-green-500/40">
                      <svg 
                        className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-[#25D366] transition-colors duration-300" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.714-1.458L0 24zm6.59-16.14c-.121-.269-.249-.275-.364-.28l-.309-.004c-.21 0-.553.079-.844.397-.291.317-1.11 1.084-1.11 2.644 0 1.56 1.134 3.071 1.293 3.284.159.213 2.23 3.402 5.4 4.773.754.327 1.343.522 1.803.668.758.241 1.448.207 1.993.125.608-.093 1.867-.763 2.13-1.462.264-.699.264-1.3.186-1.425-.079-.125-.291-.199-.608-.358-.317-.159-1.867-.921-2.157-1.027-.291-.106-.503-.159-.713.159-.21.317-.814 1.027-1.002 1.238-.186.213-.374.238-.691.079-.317-.159-1.341-.493-2.556-1.579-.945-.844-1.58-1.885-1.765-2.203-.186-.317-.02-.489.138-.646.143-.142.317-.37.476-.556.16-.185.21-.317.317-.529.106-.212.053-.397-.026-.556-.079-.159-.713-1.719-.977-2.353z" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-arabic font-medium text-neutral-300 group-hover:text-white transition-colors duration-300">
                      تواصل معنا عبر الواتساب
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            )}

            {selectedLink === "عنَّا" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                  <span className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest text-neutral-200 bg-neutral-950 border border-neutral-850 rounded-full font-mono uppercase">
                    Who We Are
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-arabic mt-3 leading-tight text-left">
                    نوفو إكس للحلول والأنظمة التقنية
                  </h2>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans max-w-xl text-left">
                    نحن رواد في تمكين التحول الرقمي الفائق وتصميم البنى التحتية السيبرانية وحلول الحوسبة السحابية السيادية الآمنة. نبتكر في تقديم الأنظمة الذكية المتكاملة التي تدفع الشركات والقطاعات الحيوية نحو المستقبل، بما يتوافق مع تطلعات رؤية السعودية 2030 وضمان السيادة الكاملة للبيانات.
                  </p>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans max-w-xl text-left">
                    With high-speed integrations, absolute network trust, and advanced digital strategy, NOVO X acts as the secure architectural backbone for next-generation intelligence.
                  </p>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="mt-6 flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-full py-2.5 px-5 transition-all font-arabic"
                  >
                    تحدث مع مستشارينا الماليين والتقنيين
                  </button>
                </div>

                <div className="lg:col-span-5 w-full">
                  {/* Using the offline original high-resolution background inside an elegant showcase card */}
                  <div className="relative border border-neutral-800 rounded-xl overflow-hidden aspect-video lg:aspect-square bg-neutral-950/40 p-4 flex flex-col justify-end group shadow-2xl">
                    <img 
                      src={novoxBg} 
                      alt="NOVO X High-End Office" 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-1" />
                    <div className="relative z-2">
                      <div className="text-[10px] font-bold tracking-widest text-neutral-300 uppercase font-mono text-left">Kingdom of Saudi Arabia</div>
                      <div className="text-xl font-bold text-white font-arabic mt-1.5 text-left">السيادة الرقمية المطلقة</div>
                      <div className="flex gap-4 mt-3 pt-3 border-t border-neutral-800/50">
                        <div className="text-left">
                          <div className="text-[10px] font-bold text-neutral-400 font-mono tracking-widest">SECURITY</div>
                          <div className="text-sm font-bold text-[#4ade80] font-mono mt-0.5">MILITARY-GRADE</div>
                        </div>
                        <div className="w-[1px] bg-neutral-800" />
                        <div className="text-left">
                          <div className="text-[10px] font-bold text-neutral-400 font-mono tracking-widest">ESTABLISHED</div>
                          <div className="text-sm font-bold text-white font-mono mt-0.5">2026</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedLink === "خدماتنا" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-start"
              >
                <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-end gap-3 mb-4">
                  <div className="text-left">
                    <span className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest text-neutral-200 bg-neutral-950 border border-neutral-850 rounded-full font-mono uppercase">
                      Expert Capabilities
                    </span>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white font-arabic mt-2">
                      خدماتنا المتخصصة والذكية
                    </h2>
                  </div>
                  <p className="text-neutral-400 text-xs text-left max-w-sm font-sans">
                    Tailored military-grade cyber strategies and seamless machine intelligence deployments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2">
                  <div className="bg-neutral-950/60 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group hover:shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-white group-hover:text-green-400 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-extrabold text-white font-arabic text-left">الأمن السيبراني السيادي</h3>
                      <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                        تأمين شامل وحماية استباقية لقواعد البيانات والاتصالات الحساسة ضد أي خروقات خارجية.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-950/60 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group hover:shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-white group-hover:text-blue-400 transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-extrabold text-white font-arabic text-left">السحابة الآمنة المشفرة</h3>
                      <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                        بناء بيئات هجينة وخاصة للاحتفاظ ببيانات العملاء داخل حدود جغرافية تحت حراسة مشددة.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-950/60 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group hover:shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-white group-hover:text-purple-400 transition-colors">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-extrabold text-white font-arabic text-left">الذكاء الاصطناعي للمنشآت</h3>
                      <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                        تطوير وتدريب النماذج اللغوية الكبيرة والتحليلات التنبؤية المعتمدة لرفع الكفاءة التشغيلية المباشرة.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-950/60 border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 group hover:shadow-xl">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-800 text-white group-hover:text-yellow-400 transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-extrabold text-white font-arabic text-left">هندسة وبناء النظم الفائقة</h3>
                      <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                        تحديث البرمجيات القديمة إلى منصات تطبيقية فائقة السرعة ومتوافقة مع المعايير الدولية.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {selectedLink === "أعمالنا" && (
              <motion.div
                key="work"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex flex-col items-start"
              >
                <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-end gap-3 mb-4">
                  <div className="text-left">
                    <span className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-widest text-neutral-200 bg-neutral-950 border border-neutral-850 rounded-full font-mono uppercase">
                      Showcase Portfolio
                    </span>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white font-arabic mt-2">
                      أهم المشروعات التي نفخر بها
                    </h2>
                  </div>
                  <p className="text-neutral-400 text-xs text-left max-w-sm font-sans">
                    Discover our real-life implementation results and stunning digital architectural maps.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-2">
                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-800 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                      <img 
                        src={secureCloudImg} 
                        alt="Secure Government Cloud" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950/80 border border-neutral-800 text-[10px] font-bold text-[#4ade80] px-2.5 py-1 rounded-full font-arabic">
                        بنية تحتية سيادية
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-white font-arabic text-left">سحابة الأمن السيبراني الحكومي</h4>
                        <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                          منصة سحابية مشفرة متعددة الطبقات لحماية الأنظمة الموزعة وتبادل البيانات الحكومية الآمنة.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-800 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                      <img 
                        src={fintechPortalImg} 
                        alt="Saudi Fintech Portal" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950/80 border border-neutral-800 text-[10px] font-bold text-[#fbbf24] px-2.5 py-1 rounded-full font-arabic">
                        تكنولوجيا مالية
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-white font-arabic text-left">بوابة المالية الرقمية السعودية</h4>
                        <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                          نظام دفع فائق للشركات يجمع الخدمات البنكية المفتوحة بما يتوافق مع ضوابط البنك المركزي السعودي SAMA.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-800 transition-all duration-300 hover:shadow-2xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                      <img 
                        src={enterpriseAiImg} 
                        alt="Enterprise AI" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950/80 border border-neutral-800 text-[10px] font-bold text-[#a78bfa] px-2.5 py-1 rounded-full font-arabic">
                        ذكاء اصطناعي سيبراني
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-white font-arabic text-left">منظومة الذكاء الاصطناعي للمؤسسات</h4>
                        <p className="text-[11px] text-neutral-400 font-sans mt-2 text-left leading-relaxed">
                          نماذج تعلم عميق مدمجة لتحليل المخاطر الأمنية وتوقع الثغرات قبل حدوثها بنسب دقة فائقة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* 
          4. FOOTER CREDENTIALS / Subtle brand line item 
        */}
        <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-500 tracking-wider font-outfit uppercase">
          <div className="flex gap-2 sm:gap-4">
            <span>© 2026 NOVO X</span>
            <span className="text-neutral-700 hidden sm:inline">|</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex gap-4 items-center">
            {/* Removed the Secure Portal text and other watermarks as requested by the user */}
          </div>
        </footer>

      </div>

      {/* 
        PRESERVATION OF THE INTERACTIVE DISCOVERY CONVERSATION FORM (MODAL)
      */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-md bg-neutral-950 rounded-2xl border border-neutral-900 p-6 overflow-hidden shadow-2xl z-25"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-outfit text-white pr-6">Let's Connect</h3>
              <p className="text-neutral-400 text-xs mt-1 font-outfit">Start secure discovery conversations with our expert engineers.</p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Business Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Requirement</label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help your business?"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm rounded-lg py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>Inquire Now</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
