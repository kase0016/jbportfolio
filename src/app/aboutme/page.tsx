"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { useRouter } from "next/navigation";
import { getQuoteOD } from "@/lib/utils/utils";
import { FavQsQuoteResponse } from "@/lib/features/weather/types";

const AboutMe = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const [quotes, setQuotes] = useState<FavQsQuoteResponse>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const resp: FavQsQuoteResponse = await getQuoteOD();
      setQuotes(resp);
    })();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="px-8 flex flex-row items-center justify-between lg:px-20 xl:px-45 pt-15">
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

      <div className="px-8 lg:px-20 xl:px-85 flex justify-center xl:py-30">
        {quotes && (
          <div>
            <h1 className="text-[27px] font-semibold py-4">Quote of The Day</h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="xs: text-[17px]/5 pb-2 xl:text-[20px] xl:leading-tight">
              &quot;{quotes?.quote.body}&quot;
            </p>
            <p className="xs: text-[20px]/6 pb-5 font-semibold italic xl:text-[25px] xl:pt-5">
              - {quotes?.quote.author}
            </p>
          </div>
        )}
      </div>
      {/* About Me */}
      <div className="px-8 lg:px-20 xl:px-45 flex flex-col xl:flex-row items-center bg-[grey]/10 gap-7 py-10">
        <Image
          src="/jb.jpg"
          alt="Jean-Baptiste Kasenda"
          width={320}
          height={320}
          priority
          className="mx-auto rounded-2xl object-cover mb-4 xl:mb-0 xl:rounded-4xl xl:h-full"
        />

        <div className="text-center xl:text-left">
          <h1 className="text-[27px] font-semibold py-4">About Me</h1>
          <p className="text-[17px]/6 pb-5">
            I&apos;m Jean-Baptiste Kasenda, a developer who began in content
            creation—video editing and visual design in Photoshop and
            Illustrator— then moved into software when I co-founded a startup
            and trained to build our web app. Since then, coding and
            problem-solving have been my focus.
          </p>
          <p className="text-[17px]/6 pb-5">
            Today I&apos;m a full-stack developer working with React, Next.js,
            Redux, TypeScript, Tailwind, HTML/CSS on the front end and Node.js,
            Express, MongoDB on the back, and I still bring a designer&apos;s
            eye with Figma and Adobe (After Effects, Photoshop, Premiere Pro,
            Illustrator). I&apos;m excited to kick-start my journey as a
            software developer and bring that blend of craft and care to every
            project.
          </p>
          <p className="text-[17px]/6">You can contact me by email at :</p>
          <p className="text-[17px]/6 font-bold">jb.kasenda@outlook.com</p>

          <h1 className="text-[27px] font-semibold py-4">Education</h1>
          <div className="flex flex-col xl:flex-row gap-5 items-center xl:items-start">
            <div>
              <Image
                width={300}
                height={100}
                alt="Waterloo University Logo"
                src="/uwlogo.png"
              />
              <h3 className="text-[17px]/6 pb-0.5 font-semibold">
                University of Waterloo
              </h3>
              <h3 className="text-[15px]/6 font-normal">General Arts</h3>
              <h3 className="text-[15px]/6 font-normal -mt-1 italic">
                2016 - 2020
              </h3>
            </div>
            <div>
              <Image
                width={300}
                height={100}
                alt="Algonquin College Logo"
                src="/ACLogo.png"
              />
              <h3 className="text-[17px]/6 pb-0.5 font-semibold">
                Algonquin College Ottawa Campus
              </h3>
              <h3 className="text-[15px]/6 font-normal">
                Mobile Application Development and Design
              </h3>
              <h3 className="text-[15px]/6 font-normal -mt-1 italic">
                2023 - 2025
              </h3>
            </div>

            {/* <div>
              <h3 className="text-[17px]/6 pb-0.5 font-semibold">
                University of Waterloo
              </h3>
              <h3 className="text-[15px]/6 font-normal">General Arts</h3>
              <h3 className="text-[15px]/6 font-normal -mt-1 italic">
                2016 - 2020
              </h3>
            </div> */}
          </div>
        </div>
      </div>

      {/* My Projects */}
      <div className="px-8 py-10 lg:px-20 xl:px-45 xl:py-20 ">
        <div>
          <h1 className="text-[27px] font-semibold py-4">My Projects</h1>
          <p className="xs: text-[17px]/6 pb-5">
            Below are some of the projects I&apos;ve worked on and links to the
            github repository or webpages themselves.
          </p>

          <div className="flex flex-col lg:gap-5">
            {/* Left: Text Section */}
            <div className="flex-1 ">
              <h1 className="text-[20px] font-semibold pb-2">
                The Motive Network Web App
              </h1>
              <p className="text-[17px] leading-6 pb-5">
                This web application is built with Next.js and TypeScript,
                styled with Tailwind CSS, and powered by a Neon PostgreSQL
                database accessed through Prisma ORM. The homepage includes
                search and multi-facet filtering, along with card-based listings
                dynamically generated from the database. I also developed an
                admin portal that enables users to create, edit, and delete
                records across multiple models. Additional features include a
                bookmarking system and content sharing for improved user
                experience. The entire application is deployed on Vercel for
                high performance and scalability.
              </p>
              <a
                href="https://www.themotive.ca/curatedlists"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-brand-magenta hover:text-brand-orange transition-colors"
              >
                Click Here to Visit The Motive
              </a>
            </div>

            <div className="flex xs:flex-col xl:flex-row gap-5">
              {/* Right Photo */}
              <Image
                width={300}
                height={150}
                src={"/TheMotivePotfolio.png"}
                alt="Daycare Mobile Website Mockup"
                className="self-center"
              />
              {/* Right Photo */}
              <div className="relative w-full max-w-[800px] aspect-[16/10] mx-auto xl:aspect-[1000/95">
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

          <div className="flex flex-col lg:gap-5 mt-10">
            {/* Left: Text Section */}
            <div className="flex-1">
              <h1 className="text-[20px] font-semibold pb-2">
                Ottawa Daycare Website
              </h1>
              <p className="text-[17px] leading-6 pb-5">
                I designed and developed a responsive website for a local Ottawa
                daycare, ensuring a seamless experience across mobile, tablet,
                and desktop devices. The site was built using Next.js, Tailwind
                CSS, and JavaScript, and deployed on Vercel for fast performance
                and reliable hosting. I also configured a custom email form that
                delivers inquiries directly to the client’s inbox, improving
                their lead response workflow. In addition, I helped craft clear,
                engaging copy aligned with the daycare’s tone and audience in
                both English and French, and implemented basic SEO metadata to
                enhance local visibility on search engines.
              </p>
              <a
                href="https://www.mdaycare.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-brand-magenta hover:text-brand-orange transition-colors"
              >
                Click Here to Visit the Daycare Website
              </a>
            </div>

            <div className="flex xs:flex-col xl:flex-row gap-5">
              {/* Left Photo */}
              <Image
                width={300}
                height={150}
                src="/DaycarePortfolio.png"
                alt="Daycare Mobile Website Mockup"
                className="self-center"
              />

              {/* Right Photo */}
              <div className="relative w-full max-w-[800px] aspect-[16/10] mx-auto xl:aspect-[1000/85">
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
  );
};

export default AboutMe;
