// src/components/ClientWrapper.js

"use client";

import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';

export default function ClientWrapper({ children }) {
  useEffect(() => {
    // Any client-side effects can be added here
    document.body.style.margin = "0";
  }, []);

  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}
