"use client";
import React, { useRef, useEffect, useState } from "react";
import Script from "next/script";
import { useLocation } from "@/context/LocationContext";
import api from "../../../api/axios";

const NAVER_MAP_CENTER = {
  lat: 37.5665,
  lng: 126.978,
};

const MapPage: React.FC = () => {
  const { location, theme } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);

  const handleInfo = () => {
    if (!location || !theme || !naverMap) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await api.get(
          `adong-details/${location.adongCode}?themeCode=${theme.subCategoryCode}`
        );
        console.log("API 응답:", response.data);
        const data = response.data as { 경계좌표?: string };
        const polygonCoords = data.경계좌표;

        if (!polygonCoords) {
          console.log("경계좌표 데이터가 없습니다.");
          return;
        }

        const match = polygonCoords.match(/\(\((.+)\)\)/);
        if (!match || !match[1]) {
          console.error("좌표 형식이 올바르지 않습니다:", polygonCoords);
          return;
        }
        const coordStr = match[1];
        const points = coordStr
          .split(",")
          .map((pt) => pt.trim().split(" ").map(Number));
        const polygonPath = points.map(([x, y]) => {
          const point = new naver.maps.Point(x, y);
          return naver.maps.TransCoord.fromUTMKToLatLng(point);
        });

        const naverPolygon = new naver.maps.Polygon({
          map: naverMap,
          paths: [polygonPath],
          strokeColor: "#5347AA",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        });
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
      }
    };
    fetchData();
  };

  // Effect 1: Initialize the map when the script is loaded
  useEffect(() => {
    if (naverMap || !mapRef.current) return;

    const initMap = () => {
      if (window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map(mapRef.current!, {
          center: new window.naver.maps.LatLng(
            NAVER_MAP_CENTER.lat,
            NAVER_MAP_CENTER.lng
          ),
          zoom: 10,
        });
        setNaverMap(map);
        clearInterval(interval);
      }
    };

    const interval = setInterval(initMap, 100);

    return () => {
      clearInterval(interval);
    };
  }, []); // Run only once on mount

  // Effect 2: React to map and location changes
  useEffect(() => {
    if (!naverMap || !location) {
      return;
    }

    const checkGeocoder = () => {
      if (window.naver && window.naver.maps && naver.maps.Service) {
        clearInterval(geocoderInterval);

        naverMap.trigger("resize");

        const address = `${location.sidoName} ${location.sigunguName} ${location.adongName}`;
        naver.maps.Service.geocode({ query: address }, (status, response) => {
          if (
            status === naver.maps.Service.Status.OK &&
            response.v2.addresses.length > 0
          ) {
            const { x, y } = response.v2.addresses[0];
            const newCenter = new naver.maps.LatLng(parseFloat(y), parseFloat(x));
            naverMap.setCenter(newCenter);
            naverMap.setZoom(15);
          } else {
            console.error("Geocode failed for address:", address, "Status:", status);
          }
        });
      }
    };

    const geocoderInterval = setInterval(checkGeocoder, 100);

    return () => {
      clearInterval(geocoderInterval);
    };
  }, [naverMap, location]);

  useEffect(() => {
    if (theme) {
      console.log("MapPage: theme updated", theme);
    }
  }, [theme]);

  useEffect(() => {
    handleInfo();
  }, [location, theme, naverMap]);


  return (
    <div className="h-full relative" style={{ minHeight: 1200 }}>
      <div
        ref={mapRef}
        id="map"
        className="absolute inset-0 bg-gray-200"
        style={{ minHeight: 800 }}
      />
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=u220qy34qg&submodules=geocoder"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default MapPage;
