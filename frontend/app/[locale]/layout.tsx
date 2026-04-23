import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Outfit } from "next/font/google";
import "../globals.css";
import {
    siteName,
    siteUrl,
} from "../site-config";
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return {
        title: {
            default: `${siteName} | Travel and Visa Assistance`,
            template: `%s | ${siteName}`,
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${outfit.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
