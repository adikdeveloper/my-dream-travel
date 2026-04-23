"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/routing";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const handleLanguageChange = (newLocale: string) => {
        router.replace(
            // @ts-expect-error -- pathname might not match specifically
            { pathname, params },
            { locale: newLocale }
        );
    };

    const languages = [
        { code: "uz", name: "UZ" },
        { code: "ru", name: "RU" },
        { code: "en", name: "EN" },
    ];

    return (
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1">
            <Globe className="w-4 h-4 text-white/70" />
            <div className="flex gap-1">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`text-xs font-bold px-2 py-1 rounded-full transition-all ${locale === lang.code
                            ? "bg-sky-500 text-white"
                            : "text-white/60 hover:text-white"
                            }`}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
