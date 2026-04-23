"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, Star, ChevronLeft, Clock, MapPin, Filter } from "lucide-react";

import { allTours } from "../../data";
import { useTranslations } from "next-intl";

export default function ToursPage() {
  const t = useTranslations('Tours');
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = ["all", "europe", "asia", "islands", "america"];

  const filteredTours = activeCategory === "all"
    ? allTours
    : allTours.filter(tour => tour.category.toLowerCase() === t(`categories.${activeCategory}`).toLowerCase() || tour.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-24">
      {/* Simple Header */}
      <header className="bg-slate-900 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <Plane className="w-8 h-8 text-sky-500" />
            <span className="text-xl font-bold text-white hidden sm:block">My Dream Travel</span>
          </Link>
          <div className="text-white font-medium">{t('allTours')}</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{t('discoverTitle')}</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">{t('discoverSubtitle')}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-2 text-slate-500 dark:text-slate-400">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium">{t('filter')}:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-800 group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 text-slate-900 dark:text-white text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {tour.rating}
                </div>
                <div className="absolute top-4 left-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t(`categories.${tour.category.toLowerCase() === 'osiyo' ? 'asia' : tour.category.toLowerCase() === 'yevropa' ? 'europe' : tour.category.toLowerCase() === 'orollar' ? 'islands' : tour.category.toLowerCase() === 'amerika' ? 'america' : 'asia'}`)}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tour.name}</h3>

                <div className="flex items-center gap-4 mb-6 text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-500" /> {parseInt(tour.days)} {t('days')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-500" /> {t('viewTour')}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">{t('startingPrice')}</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{t('from')} {tour.price}</span>
                  </div>
                  <Link href={`/tours/${tour.id}`} className="bg-slate-100 hover:bg-sky-500 dark:bg-slate-800 dark:hover:bg-sky-500 text-slate-900 dark:text-white hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300">
                    {t('details')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t('noTours')}</p>
          </div>
        )}
      </main>
    </div>
  );
}
