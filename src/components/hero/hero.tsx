'use client'

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocation } from "@/context/LocationContext";
import group92 from "./group-92.png";
import Script from 'next/script';

export const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { setLocation } = useLocation();
  const router = useRouter();

  const handleScriptLoad = () => {
    // Script loaded
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, we'll create a partial LocationInfo object.
      // You might need a more sophisticated way to get all the details.
      const newLocation = {
        sidoName: '',
        sigunguName: '',
        adongName: searchQuery,
        sidoCode: '',
        sigunguCode: '',
        adongCode: '',
      };
      setLocation(newLocation);
      router.push("/map");
    }
  };

  return (
    <>
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=u220qy34qg&submodules=geocoder"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div className="bg-white flex flex-row justify-center w-full">
        <div className="bg-white w-[1600px] h-[913px] relative">
          <div className="absolute w-[500px] h-[390px] top-60 left-[157px]">
            <div className="w-[460px] top-0 left-9 font-bold text-5xl text-gray-900 leading-tight absolute">
              소상공인을 위한
              <br />
              최적의 입지 찾기
            </div>

            <p className="w-[425px] top-[202px] left-9 text-base text-gray-600 absolute">
              저희 서비스는 소상공인을 위한 최적의 입지를 찾아드립니다.
            </p>

            <form onSubmit={handleSubmit} className="absolute w-[476px] h-[72px] top-[318px] left-0">
              <div className="relative h-full w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="동 이름을 검색해보세요"
                  className="w-full h-full pl-6 pr-[190px] border border-gray-400 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="absolute top-2 right-2 h-14 w-[179px] bg-gray-900 text-white font-bold text-lg rounded-[10px] hover:bg-gray-800"
                >
                  입지 검색
                </button>
              </div>
            </form>
          </div>

          <Image
            className="absolute w-[834px] h-[646px] top-[164px] left-[702px]"
            alt="Group"
            src={group92}
          />
        </div>
      </div>
    </>
  );
};
