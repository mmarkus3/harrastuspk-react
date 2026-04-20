'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Button({ onClick, children, disabled }: { onClick?: any; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      className="btn rounded"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}