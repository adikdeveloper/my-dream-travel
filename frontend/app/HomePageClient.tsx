"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Search, Plane, ShieldCheck, FileText, Globe, Star, ChevronRight, Menu, X, XCircle, CheckCircle2 } from "lucide-react";
import CountUp from "react-countup";
import { useRouter } from "../i18n/routing";
import { allTours } from "./data";
import { contactPhoneDisplay, contactPhoneHref, officeAddress } from "./site-config";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success">("idle");
  const [phone, setPhone] = useState("+998-");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("998")) val = val.slice(3);
    let res = "+998";
    if (val.length > 0) res += "-" + val.substring(0, 2);
    if (val.length > 2) res += "-" + val.substring(2, 5);
    if (val.length > 5) res += "-" + val.substring(5, 7);
    if (val.length > 7) res += "-" + val.substring(7, 9);
    setPhone(res);
  };

  const filteredDestinations = allTours.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      router.push("/tours");
      return;
    }
    const matchedTour = allTours.find(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (matchedTour) {
      router.push(`/tours/${matchedTour.id}`);
    } else {
      router.push("/tours");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Auto slider logic
    const sliderInterval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isEnd = scrollLeft + clientWidth >= scrollWidth - 20;

        if (isEnd) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const cardWidth = window.innerWidth < 768 ? window.innerWidth * 0.85 : 320;
          sliderRef.current.scrollBy({ left: Math.floor(cardWidth + 24), behavior: "smooth" });
        }
      }
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(sliderInterval);
    };
  }, []);

  const successStories = [
    { id: 1, name: "Azizbek R.", text: t('Testimonials.stories.1.text'), location: t('Testimonials.stories.1.location'), image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop" },
    { id: 2, name: "Nilufar T.", text: t('Testimonials.stories.2.text'), location: t('Testimonials.stories.2.location'), image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop" },
    { id: 3, name: "Sardor K.", text: t('Testimonials.stories.3.text'), location: t('Testimonials.stories.3.location'), image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Plane className={`w-8 h-8 ${isScrolled ? 'text-sky-400' : 'text-white'}`} />
            <span className="text-xl font-bold text-white">My Dream Travel</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 xl:gap-8">
            <a href="#asosiy" className="text-sm font-medium transition-colors hover:text-sky-400 text-white/90">{t('Navbar.home')}</a>
            <a href="#manzillar" className="text-sm font-medium transition-colors hover:text-sky-400 text-white/90">{t('Navbar.destinations')}</a>
            <a href="#xizmatlar" className="text-sm font-medium transition-colors hover:text-sky-400 text-white/90">{t('Navbar.services')}</a>
            <a href="#viza" className="text-sm font-medium transition-colors hover:text-sky-400 text-white/90">{t('Navbar.visa')}</a>
            <a href="#mijozlarimiz" className="text-sm font-medium transition-colors hover:text-sky-400 text-white/90">{t('Navbar.clients')}</a>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button onClick={() => setShowContactModal(true)} className="hidden md:block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-lg shadow-sky-500/30">
              {t('Navbar.contact')}
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            alt="Beautiful travel destination landscape"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 dark:to-slate-950"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 mt-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium mb-4">
              {t('Hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              {t('Hero.titleMain')} <br className="hidden md:block" /> {t('Hero.titleSub')}
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto font-light">
              {t('Hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-2xl flex flex-col md:flex-row gap-3 border border-white/10"
          >
            <div ref={searchRef} className="flex-1 relative flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              <MapPin className="text-sky-500 w-5 h-5 shrink-0" />
              <div className="flex flex-col text-left w-full">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manzil</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Qayerga bormoqchisiz?"
                  className="bg-transparent border-none outline-none text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 w-full focus:ring-0"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-20">
                  {filteredDestinations.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto py-2">
                      {filteredDestinations.map(dest => (
                        <li
                          key={dest.id}
                          onClick={() => {
                            setSearchQuery(dest.name);
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-3 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{dest.name}</p>
                            <p className="text-xs text-slate-500">{dest.category}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-500 text-center">Natija topilmadi</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-1 gap-3">
              <div className="w-1/2 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <Calendar className="text-sky-500 w-5 h-5 shrink-0" />
                <div className="flex flex-col text-left w-full overflow-hidden">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sana</span>
                  <input type="date" className="bg-transparent border-none outline-none text-sm font-semibold text-slate-900 dark:text-white text-slate-500 w-full focus:ring-0 [color-scheme:light] dark:[color-scheme:dark] cursor-pointer" />
                </div>
              </div>
              <div className="w-1/2 flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <Users className="text-sky-500 w-5 h-5 shrink-0" />
                <div className="flex flex-col text-left w-full">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mehmonlar</span>
                  <input type="text" placeholder="2 kishi" className="bg-transparent border-none outline-none text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 w-full focus:ring-0" />
                </div>
              </div>
            </div>

            <button onClick={handleSearch} className="bg-sky-500 hover:bg-sky-600 text-white p-3 md:px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-sky-500/30">
              <Search className="w-5 h-5" />
              <span className="md:hidden">Izlash</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100 dark:divide-slate-800">
            {[
              { label: t('Stats.visas'), val: 5400, suffix: "+" },
              { label: t('Stats.clients'), val: 12000, suffix: "+" },
              { label: t('Stats.partners'), val: 45, suffix: "+" },
              { label: t('Stats.experience'), val: 8, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  <CountUp end={stat.val} duration={2.5} enableScrollSpy />{stat.suffix}
                </div>
                <div className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="manzillar" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-sky-500 font-bold tracking-wider text-sm uppercase mb-3 block">{t('Destinations.badge')}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">{t('Destinations.title')}</h2>
            </div>
            <Link href="/tours" className="hidden md:flex items-center gap-2 text-sky-500 font-semibold hover:text-sky-600 transition-colors">
              {t('Destinations.viewAll')} <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {allTours.map((dest, i) => (
              <Link href={`/tours/${dest.id}`} key={dest.id} className="block shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[320px] snap-center">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer h-[450px]"
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, (min-width: 640px) 50vw, 85vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                  <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-1.5 text-white text-sm font-semibold border border-white/20">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {dest.rating}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{dest.name}</h3>
                    <div className="flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white/90 font-medium text-lg">{t('Destinations.from')} {dest.price}</span>
                      <button className="bg-sky-500 text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Services */}
      <section id="xizmatlar" className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sky-500 font-bold tracking-wider text-sm uppercase mb-3 block">{t('Services.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{t('Services.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl">{t('Services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: t('Services.visaTitle'), desc: t('Services.visaDesc') },
              { icon: Globe, title: t('Services.toursTitle'), desc: t('Services.toursDesc') },
              { icon: ShieldCheck, title: t('Services.safeTitle'), desc: t('Services.safeDesc') }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-800 text-sky-500 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Visa Approved */}
      <section id="mijozlarimiz" className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sky-400 font-bold tracking-wider text-sm uppercase mb-3 block">{t('Testimonials.badge')}</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t('Testimonials.title')}</h2>
            <p className="text-slate-400 text-lg md:text-xl">{t('Testimonials.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-white/10 relative hover:border-sky-500/50 transition-colors duration-300"
              >
                <div className="absolute top-10 right-10 text-sky-500/20">
                  <svg width="60" height="45" viewBox="0 0 45 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5V36H18V13.5H9C9 11.0147 11.0147 9 13.5 9V0ZM40.5 0C33.0442 0 27 6.04416 27 13.5V36H45V13.5H36C36 11.0147 38.0147 9 40.5 9V0Z" />
                  </svg>
                </div>
                <p className="text-xl leading-relaxed text-slate-300 mb-10 z-10 relative font-light">&ldquo;{story.text}&rdquo;</p>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-sky-500 p-1">
                    <div className="w-full h-full relative rounded-full overflow-hidden">
                      <Image src={story.image} alt={story.name} fill sizes="64px" className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{story.name}</h4>
                    <span className="text-sm font-medium text-sky-400">{story.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 pt-24 pb-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Plane className="w-8 h-8 text-sky-500" />
                <span className="text-2xl font-bold text-white tracking-tight">My Dream Travel</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">{t('Footer.about')}</p>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 hover:border-transparent transition-all duration-300 cursor-pointer">
                  F
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 hover:border-transparent transition-all duration-300 cursor-pointer">
                  I
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 hover:border-transparent transition-all duration-300 cursor-pointer">
                  T
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-xl">{t('Footer.company.title')}</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.company.about')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.company.services')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.company.blogs')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.company.contact')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-xl">{t('Footer.categories.title')}</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.categories.visa')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.categories.tours')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.categories.hotels')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-sky-400 hover:translate-x-1 inline-block transition-all duration-300">{t('Footer.categories.tickets')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-xl">{t('Footer.contact.title')}</h4>
              <ul className="space-y-5 text-slate-400">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-sky-500" />
                  </div>
                  <span className="mt-2">{officeAddress}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-sky-500" />
                  </div>
                  <span>{t('Footer.contact.workingHours')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-sky-500" />
                  </div>
                  <a href={contactPhoneHref} className="hover:text-sky-400 transition-colors">
                    {contactPhoneDisplay}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
            <p>&copy; {new Date().getFullYear()} My Dream Travel Consulting. {t('Footer.legal.copy')}</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-slate-300 transition-colors">{t('Footer.legal.privacy')}</a>
              <a href="#" className="hover:text-slate-300 transition-colors">{t('Footer.legal.terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowContactModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <XCircle className="w-6 h-6" />
            </button>

            {contactStatus === "idle" && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setContactStatus("loading");
                const form = e.target as HTMLFormElement;
                const nameVal = (form.elements.namedItem('fullname') as HTMLInputElement)?.value || '';
                try {
                  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                  const res = await fetch(`${apiUrl}/api/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nameVal, phone, source: 'website' }),
                  });
                  await res.json();
                } catch { /* server offline bo'lsa ham success ko'rsat */ }
                setContactStatus("success");
              }}>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('Contact.modalTitle')}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">{t('Contact.modalSubtitle')}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('Contact.nameLabel')}</label>
                    <input required name="fullname" type="text" placeholder={t('Contact.namePlaceholder')} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('Contact.phoneLabel')}</label>
                    <input required type="tel" value={phone} onChange={handlePhoneChange} placeholder="+998-90-123-45-67" maxLength={17} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center">
                  {t('Contact.submit')}
                </button>
              </form>
            )}

            {contactStatus === "loading" && (
              <div className="text-center py-10">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('Hero.search')}...</h3>
              </div>
            )}

            {contactStatus === "success" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('Contact.successTitle')}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">{t('Contact.successSubtitle')}</p>
                <button onClick={() => { setShowContactModal(false); setContactStatus("idle"); }} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-8 rounded-full transition-all">
                  {t('Contact.close')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
