'use client';

import React, { createContext, useState, useContext } from 'react';

interface LocationInfo {
  sidoName: string;
  sigunguName: string;
  adongName: string;
  sidoCode: string;
  sigunguCode: string;
  adongCode: string;
}

interface ThemeInfo {
  mainCategoryName: string;
  mainCategoryCode: string;
  subCategoryName: string;
  subCategoryCode: string;
}

interface LocationContextType {
  location: LocationInfo | null;
  setLocation: (location: LocationInfo | null) => void;
  theme: ThemeInfo | null;
  setTheme: (theme: ThemeInfo | null) => void;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  setLocation: () => {},
  theme: null,
  setTheme: () => {},
});

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<LocationInfo | null>({
    sidoName: '서울특별시',
    sigunguName: '중구',
    adongName: '명동',
    sidoCode: '11',
    sigunguCode: '11140',
    adongCode: '1114052000',
  });
  const [theme, setTheme] = useState<ThemeInfo | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation, theme, setTheme }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
