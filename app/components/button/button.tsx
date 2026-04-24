'use client';

import React, { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  classNames?: string[];
}

export default function Button({ onClick, children, disabled, type = 'button', classNames }: ButtonProps) {
  const finalClassNames = `btn rounded ${classNames?.join(' ')}`;

  return (
    <button
      className={finalClassNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}