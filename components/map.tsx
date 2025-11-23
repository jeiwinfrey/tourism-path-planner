"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [120.6, 18.2], // Center of Ilocos Norte
      zoom: 9,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: "100%" }}
    />
  );
}

