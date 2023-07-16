'use client';
import { useEffect, useState } from 'react';
import classes from './Footer.module.css';
import { useSearchParams, useRouter } from 'next/navigation';

const otherWebsites = [
  {
    title: 'Shivam Sahil | Personal Portfolio',
    id: 0,
    href: 'https://shivam-sahil.vercel.app/',
  },
  {
    title: 'Shivam Sahil | Personal Portfolio old',
    id: 1,
    href: 'https://shivamsahil.web.app/',
  },
  {
    title: 'Bagpacker | Mobile Only',
    id: 7,
    href: 'https://bag-packer.vercel.app/',
  },
  {
    title: 'Bagpacker | Mobile Only',
    id: 7,
    href: 'https://bag-packer.vercel.app/',
  },
  {
    title: 'Q-Manager | Quickbooks Automation',
    id: 3,
    href: 'https://q-manager.vercel.app/login',
  },
  {
    title: 'Content Management System | Assignment App',
    id: 4,
    href: 'https://cms-app-demo.vercel.app/',
  },
  {
    title: 'CViator | Open Source Resume Repository',
    id: 5,
    href: 'https://cviator.vercel.app/',
  },
  {
    title: 'Insurance Center | Hackathon Project',
    id: 2,
    href: 'https://chubb-icenter.vercel.app/',
  },
  {
    title: 'Articles App | Assignment App',
    id: 5,
    href: 'https://articles-zeta.vercel.app/',
  },
  {
    title: 'Apartment Rental | Assignment App',
    id: 6,
    href: 'https://apartment-rental.vercel.app/',
  },
];
const dontShowKey = 'donotShowThisAgain';
const Footer = () => {
  const params = useSearchParams();
  const router = useRouter();
  const shouldShow = !!JSON.parse(params.get('showOtherProjects') ?? 'false');
  const [dontShow, setDontShow] = useState(true);
  useEffect(() => {
    setDontShow(JSON.parse(localStorage.getItem(dontShowKey) ?? 'false'));
  }, []);
  const onDontShowAgainHandler = () => {
    localStorage.setItem(dontShowKey, 'true');
    setDontShow(true);
    router.push('/');
  };
  return dontShow && !shouldShow ? null : (
    <footer className={classes.footer}>
      <p className={classes.CloseButton} onClick={onDontShowAgainHandler}>
        Close this (X)
      </p>
      You liked it? You will love these other apps created by me:
      <div className={classes.otherApps}>
        {otherWebsites.map((item) => (
          <a href={item.href} target='_blank' key={item.id}>
            {item.title}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
