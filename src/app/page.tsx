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
  // Weathe Ixon
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
        // dispatch();
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
      } catch (e: any) {
        setError(e.message ?? "Failed to fetch weather");
      }
    })();
  }, [coords]);

  return (
    <div className="h-[100dvh]">
      {/* Header Section */}
      <div className="xs:px-8 flex flex-row items-center pt-5 justify-between">
        <h3 className="text-[23px] font-bold" onClick={() => router.push("/")}>
          JB Kasenda
        </h3>
        <HamburgerMenu
          size="40"
          color="black"
          onclick={() => setHideMenu((prev) => !prev)}
          swidth={3}
        />
      </div>

      {/* Main Sections */}
      <div className="xs: flex flex-col justify-items-start gap-3 px-8">
        {/* Nav Section */}
        <div
          className={`${
            hideMenu ? "xs:hidden" : "xs:block"
          } absolute z-10 bg-black h-dvh w-[55dvw] -right-2 top-0 pt-10`}
        >
          <div className=" flex justify-end pr-7">
            <XExitIcon
              size="20"
              color="white"
              onclick={() => setHideMenu((prev) => !prev)}
              swidth={70}
            />
          </div>

          <nav className="xs:flex flex-col">
            <Link className="text-slate-50 pl-3" href="/skillsnexp">
              Skills & Experience
            </Link>
            <Link className="text-slate-50 pl-3" href="/aboutme">
              About Me
            </Link>
            <Link className="text-slate-50 pl-3" href="/contactme">
              Contact Me
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

        <div className="xs:flex flex-col ">
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
              <h1 className="xs:pb-3 text-[35px]/8 font-black">{myTitle}</h1>
              <h4 className="xs: text-[17px]/6">
                Building modern digital experiences through web design &
                development, video editing, and graphic design.
              </h4>
              <div className="xs:flex flex-row items-center gap-3 col-start-1 col-end-3">
                <Link
                  href="contactme"
                  className="xs:py-3 text-[18px] font-bold"
                >
                  Let's Work Together
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

        {/* Buttons */}
        <div className="xs:grid grid-cols-2 gap-2 mb-2">
          <Link
            href="/skillsnexp"
            className="xs:px-2.5 py-4 shadow-btn rounded-md text-center text-[17px]"
          >
            Skills & Experience
          </Link>
          <Link
            href="aboutme"
            className="xs:px-2.5 py-4 shadow-btn rounded-md text-center text-[17px]"
          >
            About Me
          </Link>
          <Link
            href="aboutme"
            className="xs:px-2.5 py-4 shadow-btn rounded-md text-center text-[17px] col-start-1 col-end-3"
          >
            My Projects
          </Link>
        </div>
      </div>
      {/* Tech Stack & Skill Logo Section */}
      <div className=" py-10 relative overflow-hidden">
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
    </div>
  );
};

export default Home;
