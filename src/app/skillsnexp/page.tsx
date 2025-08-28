"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfoArrow, XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { useRouter } from "next/navigation";
import SkillsCard from "@/components/skillscard/component";

const SkillsNExp = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const router = useRouter();
  return (
    <div>
      {/* Header ection */}
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
      {/* Nav Section */}
      <div
        className={`${
          hideMenu ? "xs:hidden" : "xs:block"
        } absolute z-10 bg-black h-dvh w-[55dvw] right-0 top-0 pt-10`}
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
      {/* Skills Section */}
      <h1 className=" px-8 text-[27px] font-semibold py-4">My Skills</h1>
      <div className="">
        {/*  Tech Stack*/}
        <div className="py-2">
          <h1 className="px-8 text-[20px] font-semibold pb-2">Tech Stack</h1>
          <p className="px-8 text-[17px]/4.5">
            Here are all the languages I am familiar with that includes both
            front-end and back-end.
          </p>
          <div className=" overflow-x-scroll scrollbar-hide">
            <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-4 w-max  py-4">
              <SkillsCard imageSrc="5.png" size={70} skillName="React" />
              <SkillsCard imageSrc="13.png" size={70} skillName="Next.js" />
              <SkillsCard imageSrc="2.png" size={70} skillName="Javascript" />
              <SkillsCard imageSrc="16.png" size={70} skillName="Typescript" />
              <SkillsCard imageSrc="7.png" size={70} skillName="Redux" />
              <SkillsCard imageSrc="6.png" size={70} skillName="Node.js" />
              <SkillsCard imageSrc="14.png" size={33} skillName="MongoDB" />
              <SkillsCard imageSrc="3.png" size={70} skillName="CSS" />
              <SkillsCard imageSrc="17.png" size={70} skillName="TailwindCSS" />
              <SkillsCard imageSrc="4.png" size={70} skillName="HTML" />
            </div>
          </div>
        </div>
        {/*  Design and Editing Tools */}
        <div className="py-2">
          <h1 className="px-8 text-[20px] font-semibold pb-2">
            Design and Editing Tools
          </h1>
          <p className="px-8 text-[17px]/4.5">
            Here are all the design and editing tools I'm familiar with and have
            experience using.
          </p>
          <div className=" overflow-x-scroll scrollbar-hide">
            <div className="grid grid-rows-1 grid-flow-col auto-cols-max gap-4 w-max  py-4">
              <SkillsCard imageSrc="15.png" size={70} skillName="Figma" />
              <SkillsCard imageSrc="12.png" size={70} skillName="Lightroom" />
              <SkillsCard imageSrc="8.png" size={70} skillName="Photoshop" />
              <SkillsCard
                imageSrc="10.png"
                size={70}
                skillName="After Effects"
              />
              <SkillsCard imageSrc="9.png" size={70} skillName="Illustrator" />
              <SkillsCard
                imageSrc="11.png"
                size={70}
                skillName="Premiere Pro"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Experience Section  */}
      <h1 className=" px-8 text-[27px] font-semibold py-4">My Experience</h1>
      <div>
        <h1 className="px-8 text-[17px] font-semibold">
          The Motive Network Inc
        </h1>
        <h1 className="px-8 text-[15px] font-medium">CEO | Lead Developer</h1>
        <h1 className="px-8 text-[15px] font-medium -mt-2 italic">
          2014 - Present
        </h1>
      </div>
    </div>
  );
};

export default SkillsNExp;
