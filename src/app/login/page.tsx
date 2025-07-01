'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '../../../api/axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post<{ Authorization: string }>('api/login', { "username" : username, "password" : password });
      console.log(response.headers)
      const Authorization  = response.headers.authorization.split(' ')[1];
      if (Authorization) {
        localStorage.setItem('token', Authorization);
        router.push('/');
      } else {
        setError('로그인에 실패했습니다.');
      }
    } catch (error: any) {
      console.error(
        'An unexpected error occurred:',
        error.response?.data || error.message,
      );
      setError(
        error.response?.data?.message || '로그인 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col pt-16 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:w-112">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              자리잡자에 오신 것을 환영합니다!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              회원이시라면 자리잡자의 모든 서비스를 이용 가능합니다.
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    아이디
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="아이디"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    비밀번호
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="auto-login"
                      name="auto-login"
                      type="checkbox"
                      checked={autoLogin}
                      onChange={(e) => setAutoLogin(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="auto-login"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      자동 로그인
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      비밀번호를 잊으셨나요?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    로그인
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">또는</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <Image src="/btn_google.svg" alt="Google login" width={24} height={24} />
                    <span className="ml-2">구글로 로그인</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <Image src="/btn_kakao.svg" alt="Kakao login" width={20} height={20} />
                    <span className="ml-2">카카오로 로그인</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <Image src="/btn_naver.svg" alt="Naver login" width={20} height={20} />
                    <span className="ml-2">네이버로 로그인</span>
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center text-sm">
                계정이 없다면?{' '}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  간편 회원 가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block pt-16">
        <div className="absolute inset-y-0 inset-x-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
