"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";

type Destination = {
  id: number;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  type: string;
  timeRange: string;
  latitude: number;
  longitude: number;
  image: string;
};

type MapProps = {
  destinations: Destination[];
};

export default function Map({ destinations }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // User location (mock center location)
  const userLocation: [number, number] = [120.5955, 18.1961]; // Laoag City center as mock user location
  const defaultZoom = 16;

  const resetToUserLocation = () => {
    if (map.current) {
      map.current.flyTo({
        center: userLocation,
        zoom: defaultZoom,
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on user location
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: userLocation,
      zoom: defaultZoom,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
    });

    // Wait for map to load
    map.current.on("load", () => {
      setIsMapLoaded(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add user location marker
    const userEl = document.createElement("div");
    userEl.className = "user-location-marker";
    userEl.style.width = "20px";
    userEl.style.height = "20px";
    userEl.style.borderRadius = "50%";
    userEl.style.backgroundColor = "#22c55e";
    userEl.style.border = "3px solid white";
    userEl.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
    userEl.style.cursor = "pointer";
    
    // Create user location marker
    new mapboxgl.Marker(userEl)
      .setLngLat(userLocation)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="font-weight: 600; margin-bottom: 4px;">Your Location</div>
         <div style="font-size: 12px; color: #666;">Laoag City</div>`
      ))
      .addTo(map.current!);

    // Add markers for each destination
    destinations.forEach((destination) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.flexDirection = "column";
      el.style.alignItems = "center";
      el.style.maxWidth = "120px";
      
      // Create image element
      const img = document.createElement("img");
      img.src = destination.image;
      img.alt = destination.title;
      img.style.width = "60px";
      img.style.height = "60px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      img.style.border = "3px solid white";
      img.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
      
      // Create title element
      const title = document.createElement("div");
      title.textContent = destination.title;
      title.style.marginTop = "8px";
      title.style.padding = "4px 8px";
      title.style.backgroundColor = "white";
      title.style.borderRadius = "4px";
      title.style.fontSize = "8px";
      title.style.fontWeight = "600";
      title.style.color = "#1e293b";
      title.style.textAlign = "center";
      title.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
      title.style.maxWidth = "60px";
      title.style.lineHeight = "1.3";
      title.style.hyphens = "auto";
      
      el.appendChild(img);
      el.appendChild(title);

      // Create marker
      new mapboxgl.Marker(el)
        .setLngLat([destination.longitude, destination.latitude])
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [destinations]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: "100%" }}>
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ minHeight: "100%" }}
      />
      {/* Reset to user location button */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button
          onClick={resetToUserLocation}
          size="icon"
          className="rounded-full bg-white text-slate-900 hover:bg-slate-50 shadow-lg border border-slate-200 h-12 w-12"
          title="Reset to your location"
        >
          <Navigation className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

