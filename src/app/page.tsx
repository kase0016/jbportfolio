"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfoArrow, HamburgerMenu, XExitIcon } from "@/components/icons/icon";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setWeather as setWeatherAction } from "@/lib/features/weather/slice";
import { clearWeather as clearingWeather } from "@/lib/features/weather/slice";
import {
  getWeatherNoLocation,
  getWeatherWithLocation,
} from "@/lib/utils/utils";

const TITLES = [
  "Full Stack Developer",
  "FrontEnd Developer",
  "BackEnd Developer",
  "Graphic Designer",
  "Video Editor",
  "UX Designer",
  "UI Designer",
];

const Home = () => {
  type Coords = { lat: number; lon: number };
  const [index, setIndex] = useState(0);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hideMenu, setHideMenu] = useState(true);

  const myTitle = TITLES[index];
  const dispatch = useAppDispatch();
  const weather = useAppSelector((s) => s.weather.data);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TITLES.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (
        !("geolocation" in navigator) ||
        !("permissions" in navigator) ||
        !coords
      ) {
        const data = await getWeatherNoLocation();
        dispatch(setWeatherAction(data));
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentCoord = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          if (!cancelled) setCoords(currentCoord);
        },
        (err) => {
          if (!cancelled) setError(err.message);
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!coords) return;
    (async () => {
      try {
        const { lat, lon } = coords;
        const locationWeather = await getWeatherWithLocation(lat, lon);
        console.log("weather with location", locationWeather);
        dispatch(setWeatherAction(locationWeather));
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      }
    })();
  }, [coords, dispatch]);

  return (
    <div className="h-[100%] text-white bg-[linear-gradient(219deg,_var(--marine-mid)_0%,_var(--marine-mid-light)_25%,_var(--teal-bridge)_55%,_var(--electric-green)_75%,_var(--marine-deep)_100%)]">
      {/* Header Section */}
      <div className="px-8 flex flex-row items-center pt-5 justify-between lg:px-20 xl:px-45 xl:pt-15">
        {/* Weather In Your Area */}
        {weather ? (
          <div className="flex items-center text-white">
            <h2
              className="text-[30px] font-semibold"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              {weather?.city} &nbsp;|
            </h2>
            <div className="self-end flex flex-row items-center">
              <h2
                className="text-[30px] font-medium ml-1"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                &nbsp;{weather?.tempC}&deg;C
              </h2>
            </div>
          </div>
        ) : (
          <div />
        )}

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4">
          <Link
            className="pl-3 text-[22px] font-semibold text-white hover:text-[var(--mint-green)] transition-colors"
            href="/"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Home
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold text-white hover:text-[var(--mint-green)] transition-colors"
            href="/aboutme"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            About Me
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold text-white hover:text-[var(--mint-green)] transition-colors"
            href="/aboutme/#myprojects"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            My Projects
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold text-white hover:text-[var(--mint-green)] transition-colors"
            href="/skillsnexp"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Skills & Experience
          </Link>
        </nav>

        {/* Burger for mobile */}
        <div className="block lg:hidden">
          <HamburgerMenu
            size="40"
            color="white"
            onclick={() => setHideMenu((prev) => !prev)}
            swidth={3}
          />
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl
      transition-transform duration-300 border-b border-white/20
      ${hideMenu ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex justify-end p-4">
          <XExitIcon
            size="22"
            color="white"
            onclick={() => setHideMenu(true)}
            swidth={60}
          />
        </div>

        <nav className="flex flex-col gap-4 pb-6 px-6">
          <Link className="text-white text-[20px]" href="/">
            Home
          </Link>
          <Link className="text-white text-[20px]" href="/aboutme">
            About Me
          </Link>
          <Link className="text-white text-[20px]" href="/aboutme/#myprojects">
            My Projects
          </Link>
          <Link className="text-white text-[20px]" href="/skillsnexp">
            Skills & Experience
          </Link>
        </nav>
      </div>

      {/* Main Hero Section */}
      <div className="flex flex-col justify-center gap-3 px-8 lg:px-20 xl:px-45 xl:h-[50dvh] xl:items-center">
        <div className="flex flex-col sm:flex-row lg:gap-6 xl:gap-10">
          <Image
            src="/jb.png"
            alt="Portrait of Jean-Baptiste Kasenda"
            width={320}
            height={320}
            priority
            className="rounded-full object-cover mb-2.5 self-center border-4 border-[var(--mint-green)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
          />

          {/* Hero Banner Text */}
          <div className="xs:flex flex-row items-center">
            <div>
              <h2
                className="md:py-3 text-[18px] font-bold sm:text-[24px] flex justify-between items-end text-white"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Jean-Baptiste Kasenda
              </h2>
              <h1
                className="py-3 text-[40px]/8 sm:text-[57px]/13 font-black tracking-[-0.07em] text-white"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {myTitle}
              </h1>
              <h4
                className="text-[17px]/6 sm:text-[22px]/7 text-[var(--mint-green)]"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Building modern digital experiences through web design &
                development, video editing, and graphic design.
              </h4>

              <div className="xs:flex flex-row items-center gap-3 col-start-1 col-end-3 mt-3">
                <Link
                  href="aboutme"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-[18px] sm:text-[20px] font-bold tracking-[-0.055em]
                         bg-[var(--electric-green)] text-[var(--charcoal-navy)]
                         shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                         hover:brightness-110 hover:-translate-y-[1px] transition-all"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Let&apos;s Work Together
                  <InfoArrow
                    size="25"
                    color="#041c32"
                    swidth={0}
                    onclick={() => router.push("/aboutme")}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack & Skill Logo Section */}
      <div className="py-7 relative overflow-hidden bg-[rgba(1,18,74,0.75)] border-y border-[rgba(142,250,205,0.25)] backdrop-blur-md mt-4">
        <div className="flex animate-marquee-x whitespace-nowrap">
          {/* track half 1 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            <Image
              src="/2.png"
              alt="Javascript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt="React Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/6.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/7.png"
              alt="Redux Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt="Typescript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt="Tailwind Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt="MongoDB Logo"
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt="Next JS"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt="Figma Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt="CSS Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt="HTML5 Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt="Adobe Photoshop"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt="Adobe Illustrator"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt="Adobe After Effect"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt="Adobe Premiere Pro Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt="Adobe Light Room Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>

          {/* track half 2 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            <Image
              src="/2.png"
              alt="Javascript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt="React Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/6.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/7.png"
              alt="Redux Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt="Typescript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt="Tailwind Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt="MongoDB Logo"
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt="Next JS"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt="Figma Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt="CSS Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt="HTML5 Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt="Adobe Photoshop"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt="Adobe Illustrator"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt="Adobe After Effect"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt="Adobe Premiere Pro Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt="Adobe Light Room Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>

          {/* track half 3 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            <Image
              src="/2.png"
              alt="Javascript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt="React Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/6.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/7.png"
              alt="Redux Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt="Typescript Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt="Tailwind Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt="MongoDB Logo"
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt="Next JS"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt="Figma Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt="CSS Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt="HTML5 Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt="Adobe Photoshop"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt="Adobe Illustrator"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt="Adobe After Effect"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt="Adobe Premiere Pro Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt="Adobe Light Room Logo"
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-3 gap-3 pb-10 px-8 xl:px-45 mt-4">
        <Link
          href="/skillsnexp"
          className="px-2.5 py-4 rounded-md text-center text-[17px] lg:text-[22px] font-bold
                 bg-[rgba(4,28,50,0.85)] text-white border border-[rgba(142,250,205,0.35)]
                 hover:bg-[rgba(4,28,50,0.95)] hover:border-[var(--electric-green)]
                 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          Skills & Experience
        </Link>
        <Link
          href="/aboutme/#myprojects"
          className="px-2.5 py-4 rounded-md text-center text-[17px] lg:text-[22px] font-bold
                 bg-[rgba(4,28,50,0.85)] text-white border border-[rgba(142,250,205,0.35)]
                 hover:bg-[rgba(4,28,50,0.95)] hover:border-[var(--electric-green)]
                 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          My Projects
        </Link>
        <Link
          href="/aboutme"
          className="px-2.5 py-4 rounded-md text-center text-[17px] lg:text-[22px] font-bold
                 bg-[rgba(4,28,50,0.85)] text-white border border-[rgba(142,250,205,0.35)]
                 hover:bg-[rgba(4,28,50,0.95)] hover:border-[var(--electric-green)]
                 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all"
          style={{ fontFamily: "var(--font-roboto)" }}
        >
          About Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
