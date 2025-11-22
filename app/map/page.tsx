import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import churchesData from "@/data/churches.json";
import beachesData from "@/data/beaches.json";
import museumsData from "@/data/museums.json";
import cuisineData from "@/data/cuisine.json";
import natureData from "@/data/nature.json";
import landmarksData from "@/data/landmarks.json";
import historyData from "@/data/history.json";
import shoppingData from "@/data/shopping.json";

// Type definition for destination
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

export default function MapPage() {
  // Combine all destinations from different interest categories
  const allDestinations = [
    ...churchesData,
    ...beachesData,
    ...museumsData,
    ...cuisineData,
    ...natureData,
    ...landmarksData,
    ...historyData,
    ...shoppingData,
  ] as Destination[];
  
  // Remove duplicates by id
  const destinations = Array.from(
    new Map(allDestinations.map((dest) => [dest.id, dest])).values()
  );

  // Frontend functionality: Determine if location is open based on timeRange
  const getIsOpen = (timeRange: string): boolean => {
    if (timeRange === "24 hours") return true;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Convert to minutes
    
    const [openTime, closeTime] = timeRange.split(" - ");
    const [openHour, openMinute] = openTime.replace(" AM", "").replace(" PM", "").split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.replace(" AM", "").replace(" PM", "").split(":").map(Number);
    
    const openMinutes = (openTime.includes("PM") && openHour !== 12 ? openHour + 12 : openHour === 12 && openTime.includes("AM") ? 0 : openHour) * 60 + openMinute;
    const closeMinutes = (closeTime.includes("PM") && closeHour !== 12 ? closeHour + 12 : closeHour === 12 && closeTime.includes("AM") ? 0 : closeHour) * 60 + closeMinute;
    
    return currentTime >= openMinutes && currentTime <= closeMinutes;
  };


  return (
    <div className="flex h-screen flex-col bg-white font-sans text-slate-900 overflow-hidden">
      {/* Navbar - Matching app/page.tsx style */}
      <nav className="flex flex-none items-center justify-between px-6 py-4 border-b border-slate-200 z-20 bg-white">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1 font-medium text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white">
              <Image src="/map-pin-area.svg" alt="Logo" width={20} height={20} />
            </span>
            <span className="hidden sm:inline">Ilocos Norte Tourism Path Planner</span>
            <span className="sm:hidden">Path Planner</span>
          </Link>
        </div>
        <Button
          asChild
          variant="secondary"
          className="rounded-full bg-slate-100 px-5 font-medium text-slate-900 hover:bg-slate-200"
        >
          <Link href="/onboarding">Plan New Trip</Link>
        </Button>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Cards List */}
        <div className="w-full md:w-[55%] lg:w-[45%] xl:w-[40%] h-full overflow-y-auto p-6 sm:px-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="mb-8">
            <p className="text-sm font-medium text-slate-500 mb-2">{destinations.length} stops found</p>
            <h1 className="text-3xl font-bold text-slate-900">Your Personalized Itinerary</h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {destinations.map((place) => (
              <Card
                key={place.id}
                className="group cursor-pointer border-0 shadow-none bg-transparent gap-0 py-0 rounded-none"
              >
                {/* Card Image Area */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-3">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Card Content */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 line-clamp-1">{place.title}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                      <span>{place.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">{place.timeRange}</span>
                    <span className={`font-medium ${getIsOpen(place.timeRange) ? 'text-green-600' : 'text-red-600'}`}>
                      {getIsOpen(place.timeRange) ? '· Open' : '· Closed'}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm">{place.type}</p>
                  <p className="text-slate-500 text-sm truncate">{place.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Map Placeholder */}
        <div className="hidden md:block flex-1 bg-slate-100 relative border-l border-slate-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/map-bottom-right.png"
              alt="Map Background"
              fill
              className="object-cover opacity-10 grayscale"
            />
            <Button className="z-10 rounded-full bg-white text-slate-900 hover:bg-slate-50 shadow-lg border border-slate-200 px-6">
              Map Integration Pending
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
