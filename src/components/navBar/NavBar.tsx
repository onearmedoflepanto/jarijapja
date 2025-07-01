'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonPrimaryWith } from './ButtonPrimaryWith';
import x1 from './1.png';
import Link from 'next/link';
import api from '../../../api/axios';
import { useRouter } from 'next/navigation';

export const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      await api.post('api/logout', {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <div className="flex-shrink-0 h-16">
            <Image className="h-16 w-auto ml-2" alt="Element" src={x1} />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex md:items-center md:gap-10">
          <Link href="/map" className="text-gray-900 hover:text-rose-500">
            유동인구 지도
          </Link>
          <a href="#" className="text-gray-900 hover:text-rose-500">
            창업 정보
          </a>
          <a href="#" className="text-gray-900 hover:text-rose-500">
            사이트 정보
          </a>
        </nav>
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-900 hover:text-rose-500"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href="/login" className="text-gray-900 hover:text-rose-500">
                로그인
              </Link>
              <Link href="/signup">
                <ButtonPrimaryWith
                  className="h-auto rounded-md px-3 py-2 bg-gray-900"
                  divClassName="text-white"
                  hasIcon={false}
                  text="회원가입"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
