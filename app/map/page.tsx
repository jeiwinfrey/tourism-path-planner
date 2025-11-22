import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function MapPage() {
  // Placeholder data to match the Airbnb style list
  const destinations = [
    {
      id: 1,
      title: "Paoay Church",
      description: "UNESCO World Heritage Site",
      rating: 4.9,
      reviews: 328,
      type: "Historical Site",
      timeRange: "8:00 AM - 5:00 PM",
      isOpen: true,
      imageColor: "bg-orange-100",
    },         
    {
      id: 2,
      title: "Bangui Windmills",
      description: "Iconic sustainable energy farm",
      rating: 4.8,
      reviews: 450,
      type: "Landmark",
      timeRange: "6:00 AM - 6:00 PM",
      isOpen: true,
      imageColor: "bg-blue-100",
    },
    {
      id: 3,
      title: "Kapurpurawan Rocks",
      description: "Natural limestone formations",
      rating: 4.7,
      reviews: 210,
      type: "Nature",
      timeRange: "24 hours",
      isOpen: true,
      imageColor: "bg-stone-200",
    },
    {
      id: 4,
      title: "Pagudpud Beach",
      description: "White sand and crystal waters",
      rating: 4.9,
      reviews: 512,
      type: "Beach",
      timeRange: "24 hours",
      isOpen: true,
      imageColor: "bg-cyan-100",
    },
    {
      id: 5,
      title: "Malacañang of the North",
      description: "Presidential museum",
      rating: 4.6,
      reviews: 180,
      type: "Museum",
      timeRange: "9:00 AM - 4:00 PM",
      isOpen: false,
      imageColor: "bg-rose-100",
    },
    {
      id: 6,
      title: "Cape Bojeador Lighthouse",
      description: "Cultural heritage structure",
      rating: 4.7,
      reviews: 290,
      type: "Landmark",
      timeRange: "8:00 AM - 5:00 PM",
      isOpen: true,
      imageColor: "bg-slate-200",
    },
  ];

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
            <p className="text-sm font-medium text-slate-500 mb-2">6 stops found</p>
            <h1 className="text-3xl font-bold text-slate-900">Your Personalized Itinerary</h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {destinations.map((place) => (
              <Card
                key={place.id}
                className="group cursor-pointer border-0 shadow-none bg-transparent gap-0 py-0 rounded-none"
              >
                {/* Card Image Area */}
                <div className={`relative aspect-square w-full overflow-hidden rounded-xl ${place.imageColor} mb-3`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Image src="/map-pin-area.svg" width={40} height={40} alt="Icon" />
                  </div>
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
                    <span className={`font-medium ${place.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                      {place.isOpen ? '· Open' : '· Closed'}
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
