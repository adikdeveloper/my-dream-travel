"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft, Star, MapPin, Clock,
  CheckCircle2, XCircle, CalendarDays,
  PlaneTakeoff, BedDouble, Coffee,
  ShieldCheck, UserCheck, Wallet, Ticket
} from "lucide-react";
import { allTours } from "../../../data";
import { useTranslations } from "next-intl";

export default function TourDetailsPage() {
  const t = useTranslations('TourDetails');
  const tTours = useTranslations('Tours');
  const [showModal, setShowModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [phone, setPhone] = useState("+998-");

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

  const params = useParams();
  const tourId = parseInt(params.id as string);
  const tour = allTours.find(t => t.id === tourId);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans">
        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{t('notFound')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">{t('notFoundDesc')}</p>
          <Link href="/tours" className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold transition-all">
            <ChevronLeft className="w-5 h-5" /> {t('backToTours')}
          </Link>
        </div>
      </div>
    );
  }

  const tourCategoryKey = tour.category.toLowerCase() === 'osiyo' ? 'asia' : tour.category.toLowerCase() === 'yevropa' ? 'europe' : tour.category.toLowerCase() === 'orollar' ? 'islands' : tour.category.toLowerCase() === 'amerika' ? 'america' : 'asia';
  const categoryTranslated = tTours(`categories.${tourCategoryKey}`);

  // Translated details for the tour
  const details = {
    overview: t('dummyData.overviewTemplate', { tourName: tour.name, category: categoryTranslated }),
    included: t.raw('dummyData.included') as string[],
    notIncluded: t.raw('dummyData.notIncluded') as string[],
    hotels: [
      {
        name: t('dummyData.hotel1.name'),
        stars: 5,
        image: "https://images.unsplash.com/photo-1542314831-c6a4d2759827?q=80&w=1920&auto=format&fit=crop",
        description: t('dummyData.hotel1.desc')
      },
      {
        name: t('dummyData.hotel2.name'),
        stars: 4,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&auto=format&fit=crop",
        description: t('dummyData.hotel2.desc')
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-sky-500/30 pb-24">
      {/* Dynamic Floating Header */}
      <div className="fixed top-0 inset-x-0 z-50 p-4 md:p-6 flex items-center justify-between pointer-events-none">
        <Link href="/tours" className="pointer-events-auto bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group">
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[65vh] md:h-[75vh] w-full bg-slate-900 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          sizes="100vw"
          className="object-cover object-center scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite_alternate]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-950 translate-y-1" />

        <div className="absolute bottom-0 inset-x-0 z-10 pb-16 pt-32">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-sky-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                  {categoryTranslated}
                </span>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-semibold border border-white/20">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{tour.rating} {t('rating')}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
                {tour.name} <span className="text-sky-400 inline-block rotate-[-2deg] scale-110 ml-2">{t('titleSuffix')}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-200 font-medium text-lg">
                <div className="flex items-center gap-2 drop-shadow-md bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Clock className="w-5 h-5 text-sky-400" />
                  {parseInt(tour.days)} {t('days')} ({(parseInt(tour.days) || 2) - 1} {t('nights')})
                </div>
                <div className="flex items-center gap-2 drop-shadow-md bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  {t('departure')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-8 py-4 -mt-4 z-20 relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Left Column (Details) */}
          <div className="lg:w-2/3 space-y-12">

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-sky-500 rounded-full inline-block"></span>
                {t('about')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                {details.overview}
              </p>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { icon: PlaneTakeoff, t: t('highlights.flight') },
                { icon: BedDouble, t: t('highlights.hotel') },
                { icon: Coffee, t: t('highlights.breakfast') },
                { icon: ShieldCheck, t: t('highlights.insurance') },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 hover:border-sky-500/30 transition-all duration-300">
                  <div className="w-14 h-14 bg-sky-50 dark:bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 rotate-3 transform transition-transform group-hover:rotate-6">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.t}</span>
                </div>
              ))}
            </motion.div>

            {/* Included / Not Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Included */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full -z-10" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 p-2.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  {t('included')}
                </h3>
                <ul className="space-y-5">
                  {details.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-8 border border-slate-200 dark:border-slate-800/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full -z-10" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <div className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-2.5 rounded-xl shadow-sm">
                    <XCircle className="w-6 h-6" />
                  </div>
                  {t('notIncluded')}
                </h3>
                <ul className="space-y-5">
                  {details.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-500 dark:text-slate-400 font-medium">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Hotels */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-sky-500 rounded-full inline-block"></span>
                {t('hotels')}
              </h2>
              <div className="space-y-6">
                {details.hotels.map((hotel, i) => (
                  <div key={i} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 border border-slate-100 dark:border-slate-800 transition-all duration-500 flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 h-60 relative overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        sizes="(min-width: 1024px) 27vw, (min-width: 640px) 40vw, 100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:hidden" />
                      <div className="absolute bottom-4 left-4 sm:hidden flex items-center gap-1">
                        {[...Array(hotel.stars)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <div className="p-6 md:p-8 sm:w-3/5 flex flex-col justify-center">
                      <div className="hidden sm:flex items-center gap-1 mb-3">
                        {[...Array(hotel.stars)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{hotel.name}</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{hotel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-28 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-sky-500/5 border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-sky-400 to-indigo-500" />

              <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <span className="block text-slate-500 dark:text-slate-400 font-semibold mb-3 uppercase tracking-wider text-sm">{t('sidebar.priceLabel')}</span>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{tour.price}</span>
                  <span className="text-slate-500 dark:text-slate-400 mb-2 font-medium">{t('sidebar.perPerson')}</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-5 h-5 text-sky-500" />
                    <span className="font-medium">{t('sidebar.dates')}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">{t('sidebar.every5Days')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-sky-500" />
                    <span className="font-medium">{t('sidebar.status')}</span>
                  </div>
                  <span className="font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20 px-3 py-1 rounded-full text-xs uppercase tracking-wider">{t('sidebar.available')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-sky-500" />
                    <span className="font-medium">{t('sidebar.prepayment')}</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">30%</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full relative group overflow-hidden bg-sky-500 text-white font-bold py-5 rounded-2xl shadow-lg shadow-sky-500/30 transition-all text-lg flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all opacity-0 group-hover:opacity-100" />
                <Ticket className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">{t('sidebar.book')}</span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 py-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> {t('sidebar.refund')}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <XCircle className="w-6 h-6" />
            </button>

            {bookingStatus === "idle" && (
              <form onSubmit={(e) => { e.preventDefault(); setBookingStatus("loading"); setTimeout(() => setBookingStatus("success"), 2000); }}>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('booking.title')}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">{t('booking.subtitle')}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('booking.nameLabel')}</label>
                    <input required type="text" placeholder={t('booking.namePlaceholder')} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('booking.phoneLabel')}</label>
                    <input required type="tel" value={phone} onChange={handlePhoneChange} placeholder="+998-90-123-45-67" maxLength={17} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                  </div>
                </div>

                <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2">
                  <Ticket className="w-5 h-5" />
                  {t('booking.submit')}
                </button>
              </form>
            )}

            {bookingStatus === "loading" && (
              <div className="text-center py-10">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('booking.loading')}</h3>
                <p className="text-slate-500 dark:text-slate-400">{t('booking.processing')}</p>
              </div>
            )}

            {bookingStatus === "success" && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('booking.successTitle')}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">{t('booking.successSubtitle')}</p>
                <button onClick={() => { setShowModal(false); setBookingStatus("idle"); }} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 px-8 rounded-full transition-all">
                  {t('booking.close')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
