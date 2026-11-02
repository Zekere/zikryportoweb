import '../globals.css';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {AppProviders} from '@/components/providers/app-providers';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = {
  title: 'Zikry Dwi Maulana | Full Stack Developer',
  description: 'Portofolio pengembangan web, mobile, dan desain grafis.'
};
export function generateStaticParams(){return routing.locales.map((locale)=>({locale}));}
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}) {
  const {locale} = await params;
  if(!hasLocale(routing.locales,locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return <html lang={locale} suppressHydrationWarning><body><NextIntlClientProvider messages={messages}><AppProviders>{children}</AppProviders></NextIntlClientProvider></body></html>;
}
