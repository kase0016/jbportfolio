"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { getQuoteOD } from "@/lib/utils/utils";
import { FavQsQuoteResponse } from "@/lib/features/weather/types";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setWeather as setWeatherAction } from "@/lib/features/weather/slice";
import {
  getWeatherNoLocation,
  getWeatherWithLocation,
} from "@/lib/utils/utils";

const AboutMe = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const [quotes, setQuotes] = useState<FavQsQuoteResponse>();
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const dispatch = useAppDispatch();

  const weather = useAppSelector((s) => s.weather.data);
  type Coords = { lat: number; lon: number };

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

  useEffect(() => {
    (async () => {
      const resp: FavQsQuoteResponse = await getQuoteOD();
      setQuotes(resp);
    })();
  }, []);

  return (
    <div className="min-h-[100dvh] text-white bg-[linear-gradient(219deg,_var(--marine-mid)_0%,_var(--marine-mid-light)_25%,_var(--teal-bridge)_55%,_var(--electric-green)_75%,_var(--marine-deep)_100%)]">
      {/* Header */}
      <div className="px-8 flex flex-row items-center pt-5 justify-between lg:px-20 xl:px-45 xl:pt-15">
        {/* Weather In Your Area */}
        {weather ? (
          <div className="flex items-center">
            <h2
              className="text-[30px] font-semibold tracking-[-0.07em]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {weather.city} &nbsp;|
            </h2>
            <div className="self-end flex flex-row items-center">
              <h2
                className="text-[30px] font-medium tracking-[-0.07em] ml-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                &nbsp;{weather.tempC}&deg;C
              </h2>
            </div>
          </div>
        ) : !error ? (
          // Skeleton
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-8 w-32 rounded-md bg-white/15" />
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-white/15" />
              <div className="h-7 w-16 rounded-md bg-white/15" />
            </div>
          </div>
        ) : (
          <p
            className="text-sm text-white/70"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Weather unavailable
          </p>
        )}

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4">
          <Link
            className="pl-3 text-[22px] font-semibold tracking-[-0.07em] text-white hover:text-[var(--mint-green)] transition-colors"
            href="/"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Home
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold tracking-[-0.07em] text-white hover:text-[var(--mint-green)] transition-colors"
            href="/aboutme"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            About Me
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold tracking-[-0.07em] text-white hover:text-[var(--mint-green)] transition-colors"
            href="/aboutme/#myprojects"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            My Projects
          </Link>
          <Link
            className="pl-3 text-[22px] font-semibold tracking-[-0.07em] text-white hover:text-[var(--mint-green)] transition-colors"
            href="/skillsnexp"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Skills & Experience
          </Link>
        </nav>

        {/* Mobile Menu Button */}
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
        ${hideMenu ? "-translate-y-full" : "translate-y-0"}
      `}
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
          <Link
            className="text-white text-[20px] tracking-[-0.07em]"
            href="/"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Home
          </Link>
          <Link
            className="text-white text-[20px] tracking-[-0.07em]"
            href="/aboutme"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            About Me
          </Link>
          <Link
            className="text-white text-[20px] tracking-[-0.07em]"
            href="/aboutme/#myprojects"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            My Projects
          </Link>
          <Link
            className="text-white text-[20px] tracking-[-0.07em]"
            href="/skillsnexp"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Skills & Experience
          </Link>
        </nav>
      </div>

      {/* Quote of the Day */}
      <div className="px-8 lg:py-20 lg:px-20 xl:px-55 flex justify-center xl:py-30">
        {quotes && (
          <div className="w-full rounded-3xl bg-[rgba(4,28,50,0.85)] border border-[rgba(142,250,205,0.35)] shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-6 md:p-10">
            <h1
              className="text-[27px] font-semibold py-2 tracking-[-0.07em] xl:text-[45px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Quote of The Day
            </h1>
            <p
              className="text-[17px]/5 pb-2 xl:text-[26px] xl:leading-tight text-[var(--mint-green)]"
              style={{ fontFamily: "var(--font-roboto)" }}
            >
              &quot;{quotes?.quote.body}&quot;
            </p>
            <p
              className="text-[20px]/6 pb-1 font-semibold italic xl:text-[30px] xl:pt-3 tracking-[-0.07em]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              - {quotes?.quote.author}
            </p>
          </div>
        )}
      </div>

      {/* About Me */}
      <div className="px-8 py-10 lg:px-20 xl:px-35 flex flex-col items-center gap-5 lg:flex-row lg:justify-center">
        <div className="relative mx-auto w-full max-w-[300px] aspect-[1/1] lg:aspect-[9/16] lg:flex-3 lg:max-w-[400px] xl:max-w-[400px]">
          <Image
            src="/jb.jpg"
            alt="Portrait of Jean-Baptiste Kasenda"
            fill
            className="object-cover rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.7)] border-2 border-[rgba(142,250,205,0.5)]"
            priority
          />
        </div>

        <div className="mt-4 lg:mt-0 lg:ml-10 w-full max-w-3xl rounded-3xl bg-[rgba(1,18,74,0.85)] border border-[rgba(142,250,205,0.3)] shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-6 md:p-8 lg:p-10 text-center lg:text-left">
          <h1
            className="text-[27px] font-semibold pb-4 tracking-[-0.07em] xl:text-[45px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            About Me
          </h1>
          <p
            className="text-[17px]/6 pb-5 text-slate-100"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            I&apos;m Jean-Baptiste Kasenda, a developer who began in content
            creation—video editing and visual design in Photoshop and
            Illustrator—then moved into software when I co-founded a startup and
            trained to build our web app. Since then, coding and problem-solving
            have been my focus.
          </p>
          <p
            className="text-[17px]/6 pb-5 text-slate-100"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Today I&apos;m a full-stack developer working with React, Next.js,
            Redux, TypeScript, Tailwind, HTML/CSS on the front end and Node.js,
            Express, MongoDB on the back, and I still bring a designer&apos;s
            eye with Figma and Adobe (After Effects, Photoshop, Premiere Pro,
            Illustrator). I&apos;m excited to kick-start my journey as a
            software developer and bring that blend of craft and care to every
            project.
          </p>
          <p
            className="text-[17px]/6 text-slate-100"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            You can contact me by email at:
          </p>
          <p
            className="text-[17px]/6 font-bold text-[var(--electric-green)]"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            jb.kasenda@outlook.com
          </p>

          <h1
            className="text-[27px] font-semibold py-4 tracking-[-0.07em]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Education
          </h1>
          <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-start">
            <div className="text-center lg:text-left">
              <Image
                width={300}
                height={100}
                alt="Waterloo University Logo"
                src="/uwlogo.png"
                className="mx-auto lg:mx-0"
              />
              <h3
                className="text-[17px]/6 pb-0.5 font-semibold tracking-[-0.05em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                University of Waterloo
              </h3>
              <h3
                className="text-[15px]/6 font-normal text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                General Arts
              </h3>
              <h3
                className="text-[15px]/6 font-normal -mt-1 italic text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                2016 - 2020
              </h3>
            </div>
            <div className="text-center lg:text-left">
              <Image
                width={280}
                height={100}
                alt="Algonquin College Logo"
                src="/ACLogo.png"
                className="mx-auto lg:mx-0"
              />
              <h3
                className="text-[17px]/6 pb-0.5 font-semibold tracking-[-0.05em] lg:leading-4.5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Algonquin College Ottawa Campus
              </h3>
              <h3
                className="text-[15px]/6 font-normal lg:leading-4.5 text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Mobile Application Development and Design
              </h3>
              <h3
                className="text-[15px]/6 font-normal -mt-1 italic text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                2023 - 2025
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* My Projects */}
      <div id="myprojects" className="px-8 py-10 lg:px-20 xl:py-20 ">
        <div>
          <h1
            className="text-[27px] font-semibold py-4 tracking-[-0.07em] xl:text-[45px] xl:px-20"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            My Projects
          </h1>
          <p
            className="text-[17px]/6 pb-5 xl:pl-20 xl:pr-50 text-slate-100 xl:text-[32px]/10"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Below are some of the projects I&apos;ve worked on and links to the
            GitHub repository or webpages themselves.
          </p>

          {/* Projects */}
          <div className="flex flex-col gap-10 lg:flex-row lg:overflow-x-auto lg:scrollbar-hide lg:snap-x lg:snap-mandatory lg:w-full lg:px-4 xl:w-[100%] xl:mx-auto xl:p-20">
            {/* Project 1 */}
            <div className="flex flex-col lg:gap-5 lg:max-w-[75%] xl:max-w-[60%] lg:shrink-0 lg:snap-center rounded-bl-4xl rounded-tr-4xl border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)] p-6 lg:p-10">
              {/* Text Section */}
              <div className="flex-1 flex flex-col">
                <h1
                  className="text-[20px] font-semibold pb-2 tracking-[-0.07em] xl:text-[30px]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  The Motive Network Web App
                </h1>
                <p
                  className="text-[17px] leading-6 pb-5 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  This web application is built with Next.js and TypeScript,
                  styled with Tailwind CSS, and powered by a Neon PostgreSQL
                  database accessed through Prisma ORM. The homepage includes
                  search and multi-facet filtering, along with card-based
                  listings dynamically generated from the database. I also
                  developed an admin portal that enables users to create, edit,
                  and delete records across multiple models. Additional features
                  include a bookmarking system and content sharing for improved
                  user experience. The entire application is deployed on Vercel
                  for high performance and scalability.
                </p>
                <a
                  href="https://www.themotive.ca/curatedlists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center md:self-start inline-flex items-center justify-center text-[17px] lg:text-[18px] font-semibold
                         bg-[var(--electric-green)] text-[var(--charcoal-navy)]
                         px-7 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                         hover:brightness-110 hover:-translate-y-[1px] transition-all"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Check it Out
                </a>
              </div>

              {/* Images */}
              <div className="flex xs:flex-col lg:flex-row gap-5 mt-5">
                {/* Mobile mockup */}
                <div className="relative w-full max-w-[280px] aspect-[9/16] mx-auto lg:max-w-[150px] xl:max-w-[200px]">
                  <Image
                    src="/TheMotivePotfolio.png"
                    alt="Motive Mobile Website Mockup"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Desktop mockup */}
                <div className="relative w-full max-w-[800px] aspect-[16/10] mx-auto lg:max-w-[360px] xl:max-w-[800px] xl:aspect-[1000/95]">
                  <Image
                    src="/motivedesktopp.png"
                    alt="Motive Desktop Website Mockup"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col lg:gap-5 lg:max-w-[75%] xl:max-w-[60%] lg:shrink-0 lg:snap-center rounded-bl-4xl rounded-tr-4xl border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)] p-6 lg:p-10">
              {/* Text Section */}
              <div className="flex-1 flex flex-col">
                <h1
                  className="text-[20px] font-semibold pb-2 tracking-[-0.07em] xl:text-[30px]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Ottawa Daycare Website
                </h1>
                <p
                  className="text-[17px] leading-6 pb-5 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  I designed and developed a responsive website for a local
                  Ottawa daycare, ensuring a seamless experience across mobile,
                  tablet, and desktop devices. The site was built using Next.js,
                  Tailwind CSS, and JavaScript, and deployed on Vercel for fast
                  performance and reliable hosting. I also configured a custom
                  email form that delivers inquiries directly to the client’s
                  inbox, improving their lead response workflow. In addition, I
                  helped craft clear, engaging copy aligned with the daycare’s
                  tone and audience in both English and French, and implemented
                  basic SEO metadata to enhance local visibility on search
                  engines.
                </p>
                <a
                  href="https://www.mdaycare.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-center md:self-start inline-flex items-center justify-center text-[17px] lg:text-[18px] font-semibold
                         bg-[var(--electric-green)] text-[var(--charcoal-navy)]
                         px-7 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                         hover:brightness-110 hover:-translate-y-[1px] transition-all"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Check it Out
                </a>
              </div>

              {/* Images */}
              <div className="flex xs:flex-col lg:flex-row gap-5 mt-5">
                {/* Mobile mockup */}
                <div className="relative w-full max-w-[280px] xl:max-w-[200px] aspect-[9/16] mx-auto lg:max-w-[150px]">
                  <Image
                    src="/DaycarePortfolio.png"
                    alt="Daycare Mobile Website Mockup"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Desktop mockup */}
                <div className="relative w-full max-w-[800px] aspect-[16/10] mx-auto lg:max-w-[360px] xl:max-w-[800px] xl:aspect-[1000/85]">
                  <Image
                    src="/daycaredesktopp.png"
                    alt="Daycare Desktop Website Mockup"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
