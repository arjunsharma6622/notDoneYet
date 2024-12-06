"use client"

import { useEffect } from 'react';

const Page = () => {

  useEffect(() => {
    // Redirect to the Play Store
    window.location.href = 'https://play.google.com/store/apps/details?id=in.notdoneyet.app&hl=en';
  }, []);

  return null; // Optionally, you can return a loading indicator while redirecting
};

export default Page;