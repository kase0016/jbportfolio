"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { useRouter } from "next/navigation";
import { getQuoteOD } from "@/lib/utils/utils";
import { QuoteOD } from "@/lib/features/weather/types";

const AboutMe = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const [quotes, setQuotes] = useState<QuoteOD>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const resp: QuoteOD = await getQuoteOD();
      setQuotes(resp);
    })();
  }, []);

  return (
    <div>
      {/* Header */}
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
      {/* Nav */}
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
          <Link className="text-slate-50 pl-3 text-[18px]" href="/myprojects">
            My Projects
          </Link>
          <Link className="text-slate-50 pl-3 text-[18px]" href="/contactme">
            Contact Me
          </Link>
        </nav>
      </div>
      {/* About Me */}
      <div className="px-8 lg:px-20 xl:px-45">
        {quotes && (
          <div>
            <h1 className="text-[27px] font-semibold py-4">Quote of The Day</h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="xs: text-[17px]/5 pb-2">{quotes?.quote}</p>
            <p className="xs: text-[20px]/6 pb-5 font-semibold italic">
              {quotes?.author}
            </p>
          </div>
        )}

        <h1 className="text-[27px] font-semibold py-4">About Me</h1>
        <p className="xs: text-[17px]/6 pb-5">
          I&apos;m Jean-Baptiste Kasenda, a developer who began in content
          creation—video editing and visual design in Photoshop and
          Illustrator—then moved into software when I co-founded a startup and
          trained to build our web app. Since then, coding and problem-solving
          have been my focus.
        </p>
        <p className="xs: text-[17px]/6">
          Today I&apos;m a full-stack developer working with React, Next.js,
          Redux, TypeScript, Tailwind, HTML/CSS on the front end and Node.js,
          Express, MongoDB on the back, and I still bring a designer&apos;s eye
          with Figma and Adobe (After Effects, Photoshop, Premiere Pro,
          Illustrator). I&apos;m excited to kick-start my journey as a software
          developer and bring that blend of craft and care to every project.
        </p>
      </div>

      {/* Education */}
      <div className="px-8 lg:px-20 xl:px-45">
        <h1 className="text-[27px] font-semibold py-4">Education</h1>
        <div className="xl:flex gap-5">
          <div>
            <h3 className="text-[17px]/6 pb-0.5 font-semibold">
              Algonquin College Ottawa Campus
            </h3>
            <h3 className="text-[15px]/6 font-normal">
              Mobile Application Developement and Design
            </h3>
            <h3 className="text-[15px]/6 font-normal -mt-1 italic">
              2023 - 2025
            </h3>
          </div>

          <div>
            {" "}
            <h3 className="text-[17px]/6 pb-0.5 font-semibold">
              University of Waterloo
            </h3>
            <h3 className="text-[15px]/6 font-normal">General Arts</h3>
            <h3 className="text-[15px]/6 font-normal -mt-1 italic">
              2016 - 2020
            </h3>
          </div>
        </div>
      </div>

      {/* My Projects */}
      <div className="px-8 lg:px-20 xl:px-45">
        <h1 className="text-[27px] font-semibold py-4">My Projects</h1>
        <p className="xs: text-[17px]/6 pb-5">
          Below are some of the projects I&apos;ve worked on and links to the
          github repository or webpages themselves.
        </p>

        <div className="mb-7">
          <h1 className="text-[20px] font-semibold pb-2 lg:  xl:">
            The Motive Network Web App
          </h1>
          <p className="xs: text-[17px]/6 pb-5">
            This web app is built with React, JavaScript, and CSS on the front
            end and Node.js/Express on the back end. The homepage includes
            search, multi-facet filtering, and card-based listings pulled from
            our database. I also built an admin portal to manage content—create,
            edit, and delete records across multiple models. It&apos;s deployed
            on Vercel (frontend) and Render (API/backend).
          </p>
          <a href="https://themotive.ca/motives">
            Live Web App (Free Tier Will Tak Time To Load)
          </a>
        </div>

        <div className="mb-7">
          <h1 className="text-[20px] font-semibold pb-2 lg:  xl:">
            My Portfolio Website
          </h1>
          <p className="xs: text-[17px]/6 pb-5">
            This site is built with Next.js (React), TypeScript, and Tailwind
            CSS. It fetches live weather from an external API and stores it in
            Redux, and the quote above updates daily from another API. In this
            website, you&apos;ll find my tech stack, work experience, projects
            I&apos;ve worked on and a little more about me.
          </p>
          <a href="https://kase0016.github.io/jbportfolio/">
            Portfolio Link GitHUB
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
