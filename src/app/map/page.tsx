"use client";
import React, { useRef, useEffect, useState } from "react";
import Script from "next/script";
import { useLocation } from "@/context/LocationContext";

const NAVER_MAP_CENTER = { lat: 37.3595704, lng: 127.105399 };

const MapPage: React.FC = () => {
  console.log("MapPage: component rendering");
  const { location } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);

  // Effect 1: Initialize the map when the script is loaded
  useEffect(() => {
    if (naverMap || !mapRef.current) return;

    const initMap = () => {
      if (window.naver && window.naver.maps) {
        console.log("MapPage: Naver Maps API is ready. Initializing map.");
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
    console.log("MapPage: useEffect[naverMap, location] triggered.");
    if (!naverMap || !location) {
      console.log("MapPage: useEffect - Map or location not ready.", { hasMap: !!naverMap, hasLocation: !!location });
      return;
    }

    const checkGeocoder = () => {
      if (naver.maps.Service) {
        console.log("MapPage: Geocoder submodule is ready. Proceeding with geocoding.");
        clearInterval(geocoderInterval);

        naverMap.trigger("resize");

        const address = location.adongName;
        console.log("MapPage: Calling geocode with address:", address);
        naver.maps.Service.geocode({ query: address }, (status, response) => {
          console.log("MapPage: geocode callback triggered. Status:", status);
          if (
            status === naver.maps.Service.Status.OK &&
            response.v2.addresses.length > 0
          ) {
            const { x, y } = response.v2.addresses[0];
            const newCenter = new naver.maps.LatLng(parseFloat(y), parseFloat(x));
            console.log("MapPage: geocode success - Setting map center to:", newCenter);
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

  return (
    <div className="h-full relative" style={{ minHeight: 400 }}>
      <div
        ref={mapRef}
        id="map"
        className="absolute inset-0 bg-gray-200"
        style={{ minHeight: 400 }}
      />
      <Script
        src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=u220qy34qg&submodules=geocoder"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default MapPage;
