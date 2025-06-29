"use client";
import React, { useState, useRef, useEffect } from 'react';
import adongInfo from './adongInfo';
import themeInfo from "./themInfo";
import { useLocation } from '@/context/LocationContext';

interface LocationInfo {
  sidoName: string;
  sigunguName: string;
  adongName: string;
  sidoCode: string;
  sigunguCode: string;
  adongCode: string;
}

const SideBar: React.FC = () => {
  const { setLocation, setTheme } = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [dong, setDong] = useState('');
  const [mainTheme, setMainTheme] = useState('');
  const [subTheme, setSubTheme] = useState('');

  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const dropdownRef3 = useRef<HTMLDivElement>(null);
  const dropdownRef4 = useRef<HTMLDivElement>(null);
  const dropdownRef5 = useRef<HTMLDivElement>(null);

  const sidoOptions = adongInfo.map(item => item.sidoName);
  const sigunguOptions = sido
    ? adongInfo.find(item => item.sidoName === sido)?.sigungus.map(sg => sg.sigunguName) || []
    : [];
  const dongOptions = sido && sigungu
    ? adongInfo
        .find(item => item.sidoName === sido)
        ?.sigungus.find(sg => sg.sigunguName === sigungu)
        ?.adongs.map(dong => dong.adongName) || []
    : [];

  const mainThemeOptions = themeInfo.map(item => item.대분류명);
  const subThemeOptions = mainTheme
    ? themeInfo.find(item => item.대분류명 === mainTheme)?.소분류_목록.map(st => st.소분류명) || []
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let activeRef;
      if (openDropdown === 'sido') activeRef = dropdownRef1;
      else if (openDropdown === 'sigungu') activeRef = dropdownRef2;
      else if (openDropdown === 'dong') activeRef = dropdownRef3;
      else if (openDropdown === 'mainTheme') activeRef = dropdownRef4;
      else if (openDropdown === 'subTheme') activeRef = dropdownRef5;

      if (activeRef && activeRef.current && !activeRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const ChevronDownIcon = () => (
      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
  );

  const ChevronUpIcon = () => (
      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
      </svg>
  );

  return (
    <aside className="w-80 bg-white p-4 flex flex-col h-full space-y-4">
      {/* Sido Dropdown */}
      <p className="text-center">행정동 조회</p>
      <div className="relative" ref={dropdownRef1}>
        <button
          onClick={() => setOpenDropdown(openDropdown === 'sido' ? null : 'sido')}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span className="text-gray-700">{sido || '도/광역시/특별시'}</span>
          {openDropdown === 'sido' ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {openDropdown === 'sido' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              {sidoOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSido(option);
                    setSigungu('');
                    setDong('');
                    setOpenDropdown(null);
                  }}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                >
                  {option}
                  {sido === option && <CheckIcon />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sigungu Dropdown */}
      <div className="relative" ref={dropdownRef2}>
        <button
          onClick={() => setOpenDropdown(openDropdown === 'sigungu' ? null : 'sigungu')}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span className="text-gray-700">{sigungu || '시/군/구'}</span>
          {openDropdown === 'sigungu' ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {openDropdown === 'sigungu' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              {sigunguOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSigungu(option);
                    setDong('');
                    setOpenDropdown(null);
                  }}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                >
                  {option}
                  {sigungu === option && <CheckIcon />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Dong Dropdown */}
      <div className="relative" ref={dropdownRef3}>
        <button
          onClick={() => setOpenDropdown(openDropdown === 'dong' ? null : 'dong')}
          className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white border rounded-lg ${openDropdown === 'dong' ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-300'}`}
        >
          <span className="text-gray-700">{dong || '읍/면/리/동'}</span>
          {openDropdown === 'dong' ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {openDropdown === 'dong' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              {dongOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setDong(option);
                    setOpenDropdown(null);
                    const sidoInfo = adongInfo.find(item => item.sidoName === sido);
                    const sigunguInfo = sidoInfo?.sigungus.find(sg => sg.sigunguName === sigungu);
                    const adongInfoItem = sigunguInfo?.adongs.find(ad => ad.adongName === option);
                    if (sidoInfo && sigunguInfo && adongInfoItem) {
                      const newLocation = {
                        sidoName: sidoInfo.sidoName,
                        sidoCode: sidoInfo.sidoCode,
                        sigunguName: sigunguInfo.sigunguName,
                        sigunguCode: sigunguInfo.sigunguCode,
                        adongName: adongInfoItem.adongName,
                        adongCode: adongInfoItem.adongCode,
                      };
                      console.log('SideBar: setLocation called with:', newLocation);
                      setLocation(newLocation);
                    }
                  }}
                  className={`px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${dong === option ? 'bg-purple-50' : ''}`}
                >
                  {option}
                  {dong === option && <CheckIcon />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="text-center mt-4">테마 조회</p>
      {/* Main Theme Dropdown */}
      <div className="relative" ref={dropdownRef4}>
        <button
          onClick={() => setOpenDropdown(openDropdown === 'mainTheme' ? null : 'mainTheme')}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span className="text-gray-700">{mainTheme || '테마 대분류'}</span>
          {openDropdown === 'mainTheme' ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {openDropdown === 'mainTheme' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              {mainThemeOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setMainTheme(option);
                    setSubTheme('');
                    setOpenDropdown(null);
                  }}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                >
                  {option}
                  {mainTheme === option && <CheckIcon />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sub Theme Dropdown */}
      <div className="relative" ref={dropdownRef5}>
        <button
          onClick={() => setOpenDropdown(openDropdown === 'subTheme' ? null : 'subTheme')}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <span className="text-gray-700">{subTheme || '테마 소분류'}</span>
          {openDropdown === 'subTheme' ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
        {openDropdown === 'subTheme' && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul className="py-1">
              {subThemeOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSubTheme(option);
                    setOpenDropdown(null);
                    const mainThemeInfo = themeInfo.find(item => item.대분류명 === mainTheme);
                    const subThemeInfo = mainThemeInfo?.소분류_목록.find(st => st.소분류명 === option);
                    if (mainThemeInfo && subThemeInfo) {
                      const newTheme = {
                        mainCategoryName: mainThemeInfo.대분류명,
                        mainCategoryCode: mainThemeInfo.대분류코드,
                        subCategoryName: subThemeInfo.소분류명,
                        subCategoryCode: subThemeInfo.소분류코드,
                      };
                      setTheme(newTheme);
                    }
                  }}
                  className={`px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${subTheme === option ? 'bg-purple-50' : ''}`}
                >
                  {option}
                  {subTheme === option && <CheckIcon />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>

    
  );
};

export default SideBar;
