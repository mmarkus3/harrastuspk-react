"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  signInWithGoogle,
  signOut,
  onIdTokenChanged,
} from "../../lib/firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";
import Button from "../button/button";
import { User } from "firebase/auth";
import { FaSignOutAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { useAthleteStore } from '@/app/lib/athleteStore';
import Athletes from '../athletes/athletes';

interface HeaderProps {
  initialUser: User | null;
}

function useUserSession(initialUser: User | null) {
  useEffect(() => {
    return onIdTokenChanged(async (user: User | null) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
}



export default function Header({ initialUser }: HeaderProps) {
  const user = useUserSession(initialUser);
  const { athlete } = useAthleteStore();

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <Link href="/" className="logo">
        Harjoituspäiväkirja
      </Link>
      {user ? (
        <>
          <ul className="menu bg-base-200 menu-horizontal rounded-box">
            <li>
              <Athletes />
            </li>
            <li>
              <Button onClick={handleSignOut}>
                <FaSignOutAlt></FaSignOutAlt>
              </Button>
            </li>
          </ul>
        </>
      ) : (
        <div className="profile">
          <Button onClick={handleSignIn}>
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Sign In with Google
          </Button>
        </div>
      )}
    </header>
  );
}