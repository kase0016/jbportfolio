"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfoArrow, XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { useRouter } from "next/navigation";

const AboutMe = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const router = useRouter();
  return (
    <div>
      {/* Header */}
      <div className="xs:px-8 flex flex-row items-center pt-5 justify-between">
        <h3
          className="text-[23px] font-bold bg-black rounded-lg text-white px-4"
          onClick={() => router.push("/")}
        >
          JB Kasenda
        </h3>
        <HamburgerMenu
          size="40"
          color="black"
          onclick={() => setHideMenu((prev) => !prev)}
          swidth={3}
        />
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
      <div className="px-8">
        <h1 className="text-[27px] font-semibold py-4">About Me</h1>
        <p className="xs: text-[17px]/6 pb-5">
          I started in content creation—cutting video and crafting visuals in
          Photoshop and Illustrator—then jumped into development when I
          co-founded a startup and went to school to build our web app. I’ve
          been hooked on coding and problem-solving ever since.
        </p>
        <p className="xs: text-[17px]/6">
          Today I’m a full-stack developer working with React, Next.js, Redux,
          TypeScript, Tailwind, HTML/CSS on the front end and Node.js, Express,
          MongoDB on the back, and I still bring a designer’s eye with Figma and
          Adobe (After Effects, Photoshop, Premiere Pro, Illustrator). I’m
          excited to kick-start my journey as a software developer and bring
          that blend of craft and care to every project.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
