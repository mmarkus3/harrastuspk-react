'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button({ onClick, children }: { onClick?: any; children: React.ReactNode }) {
  return (
    <button
      className="btn rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}