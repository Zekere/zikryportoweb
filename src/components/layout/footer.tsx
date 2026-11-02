'use client';
import {useTranslations} from 'next-intl';import {ArrowUp} from 'lucide-react';
export function Footer(){const t=useTranslations('footer');const contact=useTranslations('contact');return <footer className="footer"><div className="container footer-inner"><a href="#home" className="brand">Z<span>.</span></a><p>© {new Date().getFullYear()} · {t('crafted')}</p><a className="back-top" href="#home" aria-label={contact('back')}><ArrowUp size={18}/></a></div></footer>}
