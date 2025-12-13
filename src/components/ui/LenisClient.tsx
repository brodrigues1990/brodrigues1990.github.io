'use client';

import { useLenis } from '@/hooks/useLenis';
import React from 'react';

export function LenisClient({ children }: { children: React.ReactNode }) {
  useLenis();

  return <>{children}</>;
}
