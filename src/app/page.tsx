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
  "Front-End Developer",
  "Back-End Developer",
  "Graphic Designer",
  "Video Editor",
  "UX Designer",
  "UI Designer",
];

const Home = () => {
  type Coords = { lat: number; lon: number };
  const [index, setIndex] = useState(0);
  // const [perm, setPerm] = useState<PermissionState | "unsupported" | null>(
  //   null
  // );
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hideMenu, setHideMenu] = useState(true);

  const myTitle = TITLES[index];
  const dispatch = useAppDispatch();
  const weather = useAppSelector((s) => s.weather.data);
  const router = useRouter();
  // Weather Icon
  const rawIcon = weather?.icon;
  const icon = rawIcon?.startsWith("//") ? `https:${rawIcon}` : rawIcon;

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
        if (!cancelled) return;
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
        },
        { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    console.log("redux weather changed:", weather);
  }, [weather]);

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
    <div className="h-[100dvh]">
      {/* Header Section */}
      <div className="px-8 flex flex-row items-center pt-5 justify-between lg:px-20 xl:px-45 pt-15">
        <h3
          className="text-[23px] font-bold bg-black rounded-lg text-white px-4"
          onClick={() => router.push("/")}
        >
          JB Kasenda
        </h3>

        <nav className="hidden lg:flex gap-2">
          <Link className="pl-3 text-[22px] font-semibold" href="/aboutme">
            About Me
          </Link>
          <Link className="pl-3 text-[22px] font-semibold" href="/skillsnexp">
            Skills & Experience
          </Link>
        </nav>
        <div className="block lg:hidden">
          <HamburgerMenu
            size="40"
            color="black"
            onclick={() => setHideMenu((prev) => !prev)}
            swidth={3}
          />
        </div>
      </div>

      {/* Main Sections */}
      <div className="flex flex-col justify-items-start gap-3 px-8 lg:px-20 xl:px-45">
        {/* Nav Section */}
        <div
          className={`${
            hideMenu ? "xs:hidden" : "xs:block"
          } absolute z-10 bg-black h-dvh w-[45dvw] -right-2 top-0 pt-5`}
        >
          <div className=" flex justify-end pr-7">
            <XExitIcon
              size="20"
              color="white"
              onclick={() => setHideMenu((prev) => !prev)}
              swidth={70}
            />
          </div>

          <nav className="xs:flex flex-col gap-3 mt-5">
            <Link className="text-slate-50 pl-3 text-[18px]" href="/aboutme">
              About Me
            </Link>
            <Link className="text-slate-50 pl-3 text-[18px]" href="/skillsnexp">
              Skills & Experience
            </Link>
          </nav>
        </div>
        {/* Weather In Your Area */}
        {weather && (
          <div className="justify-between flex flex-row items-center">
            <h2 className="text-[30px] font-medium">{weather?.city}</h2>
            <div className="self-end flex flex-row items-center">
              {icon && (
                <Image
                  src={icon}
                  alt={weather?.condition ?? "Weather icon"}
                  width={80}
                  height={80}
                  priority
                  className="rounded-full object-cover self-end"
                />
              )}
              <h2 className="text-[30px] font-medium">
                {weather?.tempC}&deg;C
              </h2>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row lg:gap-6 xl:gap-10">
          <Image
            src="/jb.jpg"
            alt="Placeholder"
            width={320}
            height={320}
            priority
            className="xs:rounded-full  object-cover mb-2.5 rounded-2xl self-center"
          />
          {/* Hero Banner Text */}
          <div className="xs:flex flex-row items-center">
            <div>
              <h1 className="pb-3 text-[35px]/8 font-black sm:text-[57px]/13 ">
                {myTitle}
              </h1>
              <h4 className="text-[17px]/6 sm:text-[22px]/7">
                Building modern digital experiences through web design &
                development, video editing, and graphic design.
              </h4>
              <div className="xs:flex flex-row items-center gap-3 col-start-1 col-end-3">
                <Link
                  href="contactme"
                  className="py-3 text-[18px] font-bold sm:text-[24px]"
                >
                  Let&apos;s Work Together
                </Link>
                <InfoArrow
                  size="25"
                  color="black"
                  onclick={() => router.push("/contactme")}
                  swidth={0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tech Stack & Skill Logo Section */}
      <div className=" py-7 relative overflow-hidden">
        {/* moving track */}
        <div className="flex animate-marquee-x whitespace-nowrap">
          {/* track half 1 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            {/* your images once */}
            <Image
              src="/2.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt=""
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
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt=""
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>
          {/* track half 2 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            {/* your images once */}
            <Image
              src="/2.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt=""
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
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt=""
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>
          {/* track half 3 */}
          <div className="flex gap-3.5 pr-3.5 shrink-0">
            {/* your images once */}
            <Image
              src="/2.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/5.png"
              alt=""
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
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/16.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/17.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/14.png"
              alt=""
              width={35}
              height={50}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/13.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/15.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/3.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/4.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/8.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/9.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/10.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/11.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
            <Image
              src="/12.png"
              alt=""
              width={70}
              height={70}
              className="object-contain mb-2.5 self-center"
            />
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 pb-10 px-8 xl:px-45">
        <Link
          href="/skillsnexp"
          className="px-2.5 py-4 shadow-btn rounded-md text-center text-[17px] lg:text-[22px]"
        >
          Skills & Experience
        </Link>
        <Link
          href="aboutme"
          className="px-2.5 py-4 shadow-btn rounded-md text-center text-[17px] lg:text-[22px]"
        >
          About Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
