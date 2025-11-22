import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Welcome() {
  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-900 overflow-hidden selection:bg-orange-100">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-2">
          {/* Logo placeholder */}
          <div className="flex items-center gap-1 font-medium text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white">
              <Image src="/path.svg" alt="Ilocos Norte Tourism Path Planner" width={24} height={24} />
            </span>
            <span>Ilocos Norte Tourism Path Planner</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <div className="transition-colors hover:text-black">
            Bring joy to your journey.
          </div>
          <span className="h-4 w-px bg-slate-200"></span>
          <Button
            asChild
            variant="secondary"
            className="rounded-full bg-slate-100 px-5 font-medium text-slate-900 hover:bg-slate-200"
          >
            <Link href="/onboarding">Start Planning</Link>
          </Button>
        </div>
      </nav>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
        {/* Hero Text */}
        <div className="relative text-center">
          {/* Star - Upper Left */}
          <div className="absolute -left-10 -top-8 opacity-60 sm:-left-10 sm:-top-16">
            <Image
              src="/sun.png"
              alt="Sun"
              width={128}
              height={128}
            />
          </div>

          {/* Smiley Face - Upper Right */}
          <div className="absolute -right-20 -top-16 opacity-60 sm:-right-20 sm:-top-24 rotate-20">
            <Image
              src="/cloud.png"
              alt="Cloud"
              width={200}
              height={200}
            />
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
            Save Time, Save Fuel <br className="hidden sm:block" />
            with our intelligent path planner.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">
            Ilocos Norte Tourism Path Planner is the intelligent software your
            family & friends will love for their next adventure.
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex items-center justify-center">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full border border-slate-200 bg-white px-8 text-lg font-semibold text-slate-900 shadow-lg hover:bg-slate-50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <Link href="/onboarding">Start Planning</Link>
            </Button>
          </div>
        </div>

        {/* Map Images at Bottom - Fixed Position */}
        {/* Bottom Left Map */}
        <div className="fixed bottom-[-60px] left-[-50px] pointer-events-none z-0">
          <Image
            src="/map-bottom-left.png"
            alt="Map bottom left"
            width={400}
            height={300}
            className="object-contain opacity-50"
          />
        </div>

        {/* Bottom Right Map */}
        <div className="rotate-200 fixed bottom-[-200px] right-[-400px] pointer-events-none z-0">
          <Image
            src="/map-bottom-right.png"
            alt="Map bottom right"
            width={800}
            height={300}
            className="object-contain opacity-50"
          />
        </div>
      </main>
    </div>
  );
}