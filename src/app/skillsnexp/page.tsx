"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import SkillsCard from "@/components/skillscard/component";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setWeather as setWeatherAction } from "@/lib/features/weather/slice";
import {
  getWeatherNoLocation,
  getWeatherWithLocation,
} from "@/lib/utils/utils";

type Coords = { lat: number; lon: number };

const SkillsNExp = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const dispatch = useAppDispatch();

  const weather = useAppSelector((s) => s.weather.data);
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!("geolocation" in navigator)) {
        try {
          const data = await getWeatherNoLocation();
          if (!cancelled) dispatch(setWeatherAction(data));
        } catch (e: unknown) {
          const msg = e instanceof Error ? e.message : String(e);
          if (!cancelled) setError(msg);
        }
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (cancelled) return;
          setCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        async (err) => {
          if (cancelled) return;
          setError(err.message);
          try {
            const data = await getWeatherNoLocation();
            if (!cancelled) dispatch(setWeatherAction(data));
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            if (!cancelled) setError(msg);
          }
        },
        { enableHighAccuracy: true, timeout: 10_000, maximumAge: 0 }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!coords) return;

    let cancelled = false;

    (async () => {
      try {
        const { lat, lon } = coords;
        const locationWeather = await getWeatherWithLocation(lat, lon);
        if (!cancelled) {
          dispatch(setWeatherAction(locationWeather));
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(msg);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [coords, dispatch]);

  return (
    <div
      className="
      min-h-[100dvh]
      bg-[linear-gradient(219deg,_var(--marine-mid)_0%,_var(--marine-mid-light)_25%,_var(--teal-bridge)_55%,_var(--electric-green)_75%,_var(--marine-deep)_100%)]
      text-slate-50
      pb-16
    "
    >
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between pt-5 lg:pt-8">
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
                &nbsp;{Math.floor(weather?.tempC)}&deg;C
              </h2>
            </div>
          </div>
        ) : !error ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-8 w-32 rounded-md bg-white/20" />
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-full bg-white/20" />
              <div className="h-7 w-16 rounded-md bg-white/20" />
            </div>
          </div>
        ) : (
          <p
            className="text-sm text-slate-100/70"
            style={{ fontFamily: "var(--font-roboto)" }}
          >
            Weather unavailable
          </p>
        )}

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4">
          <Link
            className="text-[22px] font-semibold tracking-[-0.07em]"
            href="/"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Home
          </Link>
          <Link
            className="text-[22px] font-semibold tracking-[-0.07em]"
            href="/aboutme"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            About Me
          </Link>
          <Link
            className="text-[22px] font-semibold tracking-[-0.07em]"
            href="/aboutme/#myprojects"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            My Projects
          </Link>
          <Link
            className="text-[22px] font-semibold tracking-[-0.07em]"
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
            color="black"
            onclick={() => setHideMenu((prev) => !prev)}
            swidth={3}
          />
        </div>
      </header>

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

      <main className="mt-6 space-y-10 md:space-y-14">
        {/* Skills Section */}
        <section>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
            <h1
              className="text-[27px] font-semibold py-4 tracking-[-0.07em] xl:text-[34px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              My Skills
            </h1>

            {/* Tech Stack */}
            <div className="py-2">
              <h2
                className="text-[20px] font-semibold pb-2 tracking-[-0.07em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Tech Stack
              </h2>
              <p
                className="text-[17px]/4.5 text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Here are all the languages I&apos;m familiar with that includes
                both front-end and back-end.
              </p>
              <div className="overflow-x-auto scrollbar-hide sm:overflow-visible mt-3">
                <div
                  className="grid grid-flow-col auto-cols-max gap-4 w-max py-4
                           sm:flex sm:flex-wrap sm:w-full"
                >
                  <SkillsCard imageSrc="5.png" size={70} skillName="React" />
                  <SkillsCard imageSrc="13.png" size={70} skillName="Next.js" />
                  <SkillsCard
                    imageSrc="2.png"
                    size={70}
                    skillName="JavaScript"
                  />
                  <SkillsCard
                    imageSrc="16.png"
                    size={70}
                    skillName="TypeScript"
                  />
                  <SkillsCard imageSrc="7.png" size={70} skillName="Redux" />
                  <SkillsCard imageSrc="6.png" size={70} skillName="Node.js" />
                  <SkillsCard imageSrc="14.png" size={33} skillName="MongoDB" />
                  <SkillsCard imageSrc="3.png" size={70} skillName="CSS" />
                  <SkillsCard
                    imageSrc="17.png"
                    size={70}
                    skillName="Tailwind CSS"
                  />
                  <SkillsCard imageSrc="4.png" size={70} skillName="HTML" />
                </div>
              </div>
            </div>

            {/* Design and Editing Tools */}
            <div className="py-4">
              <h2
                className="text-[20px] font-semibold pb-2 tracking-[-0.07em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Design and Editing Tools
              </h2>
              <p
                className="text-[17px]/4.5 text-slate-100"
                style={{ fontFamily: "var(--font-roboto)" }}
              >
                Here are all the design and editing tools I&apos;m familiar with
                and have experience using.
              </p>
              <div className="overflow-x-auto scrollbar-hide mt-3">
                <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-4 w-max py-4">
                  <SkillsCard imageSrc="15.png" size={70} skillName="Figma" />
                  <SkillsCard
                    imageSrc="12.png"
                    size={70}
                    skillName="Lightroom"
                  />
                  <SkillsCard
                    imageSrc="8.png"
                    size={70}
                    skillName="Photoshop"
                  />
                  <SkillsCard
                    imageSrc="10.png"
                    size={70}
                    skillName="After Effects"
                  />
                  <SkillsCard
                    imageSrc="9.png"
                    size={70}
                    skillName="Illustrator"
                  />
                  <SkillsCard
                    imageSrc="11.png"
                    size={70}
                    skillName="Premiere Pro"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section>
          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
            <h1
              className="text-[27px] font-semibold py-4 tracking-[-0.07em] xl:text-[34px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              My Work Experience
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
              {/* The Motive Network */}
              <div className="rounded-xl py-3.5 px-4 border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                <h2
                  className="text-[17px] font-semibold pt-2 tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  The Motive Network Inc
                </h2>
                <h3
                  className="text-[15px] font-semibold pb-1 tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Co-Founder | CEO | Lead Developer
                </h3>
                <p
                  className="text-[15px] font-medium -mt-1.5 mb-2 tracking-[-0.07em] text-slate-200"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  2014 - Present
                </p>
                <ul
                  className="text-[15px]/4 pb-2 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <li className="pb-2.5 font-light">
                    Led the design, development, and launch of a web app for
                    discovering things to do and places to go.
                  </li>
                  <li className="pb-2.5 font-light">
                    Built the application using React, Node.js, and MongoDB,
                    covering both frontend and backend.
                  </li>
                  <li className="pb-2.5 font-light">
                    Developed a content management portal with features to add,
                    edit, update, and delete listings.
                  </li>
                  <li className="pb-2.5 font-light">
                    Directed product strategy and technical execution while
                    managing all aspects of the business.
                  </li>
                </ul>
              </div>

              {/* Solara Studios */}
              <div className="rounded-xl py-3.5 px-4 border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                <h2
                  className="text-[17px] font-semibold pt-2 tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Solara Studios
                </h2>
                <h3
                  className="text-[15px] font-semibold pb-1 tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Lead Web Developer
                </h3>
                <p
                  className="text-[15px] font-medium -mt-1.5 mb-2 tracking-[-0.07em] text-slate-200"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  July 2023 - Present
                </p>
                <ul
                  className="text-[15px]/4 pb-2 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <li className="pb-2.5 font-light">
                    Managed WordPress website updates for clients, ensuring
                    timely and accurate content changes.
                  </li>
                  <li className="pb-2.5 font-light">
                    Built and customized landing pages from scratch,
                    implementing provided copy and designs to meet
                    specifications.
                  </li>
                  <li className="pb-2.5 font-light">
                    Collaborated with copywriters to incorporate updated content
                    and refine pages for consistency, clarity, and user
                    experience.
                  </li>
                </ul>
              </div>

              {/* Concentrix */}
              <div className="rounded-xl py-3.5 px-4 border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                <h2
                  className="text-[17px] font-semibold pt-2 tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Concentrix
                </h2>
                <h3
                  className="text-[15px] font-semibold tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Technical Support Specialist Level II
                </h3>
                <p
                  className="text-[15px] font-medium -mt-1.5 mb-2 tracking-[-0.07em] text-slate-200"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  July 2022 - Nov 2022
                </p>
                <ul
                  className="text-[15px]/4 pb-2 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <li className="pb-2.5 font-light">
                    Handled client calls for smartphone and subscription issues.
                  </li>
                  <li className="pb-2.5 font-light">
                    Documented cases thoroughly for accurate history and
                    follow-ups.
                  </li>
                  <li className="pb-2.5 font-light">
                    Escalated complex issues to the appropriate departments.
                  </li>
                  <li className="pb-2.5 font-light">
                    Used documentation, knowledge base, and product expertise to
                    resolve issues.
                  </li>
                </ul>
              </div>

              {/* Emerge BPO */}
              <div className="rounded-xl py-3.5 px-4 border border-[rgba(142,250,205,0.35)] bg-[rgba(4,28,50,0.9)] shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
                <h2
                  className="text-[17px] font-semibold tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Emerge BPO
                </h2>
                <h3
                  className="text-[15px] font-semibold tracking-[-0.07em]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Customer Service Representative
                </h3>
                <p
                  className="text-[15px] font-medium -mt-1.5 mb-2 tracking-[-0.07em] text-slate-200"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  Sep 2020 - Dec 2020
                </p>
                <ul
                  className="text-[15px]/4 text-slate-100"
                  style={{ fontFamily: "var(--font-roboto)" }}
                >
                  <li className="pb-2.5 font-light">
                    Managed client orders for office supplies, provided delivery
                    ETAs, and processed returns.
                  </li>
                  <li className="pb-2.5 font-light">
                    Assisted French-speaking clients, resolved inquiries, and
                    escalated issues when needed.
                  </li>
                  <li className="pb-2.5 font-light">
                    Updated client account details and completed requested
                    changes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SkillsNExp;
