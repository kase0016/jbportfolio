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
      <div className="border-black border-r-[7px] border-b-[1px] border-t-[2px] border-l-[2px] mx-8 rounded-xl my-4">
        <h1 className="px-3.5  text-[17px] font-semibold pt-2">
          The Motive Network Inc
        </h1>
        <h1 className="px-3.5  text-[15px] font-semibold">
          Co-Founder | CEO | Lead Developer
        </h1>
        <h1 className="px-3.5  text-[15px] font-medium -mt-1.5 italic mb-2">
          2014 - Present
        </h1>
        <ul className="px-3.5  text-[15px]/4 pb-2">
          <li className="pb-2.5 font-extralight">
            Led the design, development, and launch of a web app for discovering
            things to do and places to go.
          </li>
          <li className="pb-2.5 font-extralight">
            Built the application using React, Node.js, and MongoDB, covering
            both frontend and backend.
          </li>
          <li className="pb-2.5 font-extralight">
            Developed a content management portal with features to add, edit,
            update, and delete listings.
          </li>
          <li className="pb-2.5 font-extralight">
            Directed product strategy and technical execution while managing all
            aspects of the business.
          </li>
        </ul>
      </div>
      <div className="border-black border-r-[7px] border-b-[1px] border-t-[2px] border-l-[2px] mx-8 rounded-xl my-4">
        <h1 className="px-3.5  text-[17px] font-semibold pt-2">
          Solara Studios
        </h1>
        <h1 className="px-3.5  text-[15px] font-semibold">
          Lead Web Developer
        </h1>
        <h1 className="px-3.5  text-[15px] font-medium -mt-1.5 italic mb-2">
          July 2023 - Present
        </h1>
        <ul className="px-3.5 text-[15px]/4 pb-2">
          <li className="pb-2.5 font-extralight">
            Managed WordPress website updates for clients, ensuring timely and
            accurate content changes.
          </li>
          <li className="pb-2.5 font-extralight">
            Built and customized landing pages from scratch, implementing
            provided copy and designs to meet specifications.
          </li>
          <li className="pb-2.5 font-extralight">
            Collaborated with copywriters to incorporate updated content and
            refine pages for consistency, clarity, and user experience.
          </li>
        </ul>
      </div>
      <div className="border-black border-r-[7px] border-b-[1px] border-t-[2px] border-l-[2px] mx-8 rounded-xl my-4">
        <h1 className="px-3.5  text-[17px] font-semibold pt-2">Concentrix</h1>
        <h1 className="px-3.5  text-[15px] font-semibold">
          Technical Support Specialist Level II
        </h1>
        <h1 className="px-3.5  text-[15px] font-medium -mt-1.5 italic mb-2">
          July 2022 - Nov 2022
        </h1>
        <ul className="px-3.5  text-[15px]/4 pb-2">
          <li className="pb-2.5 font-extralight">
            Handled client calls for smartphone and subscription issues.
          </li>
          <li className="pb-2.5 font-extralight">
            Documented cases thoroughly for accurate history and follow-ups.
          </li>
          <li className="pb-2.5 font-extralight">
            Escalated complex issues to the appropriate departments.
          </li>
          <li className="pb-2.5 font-extralight">
            Used documentation, knowledge base, and product expertise to resolve
            issues.
          </li>
        </ul>
      </div>
      <div className="border-black border-r-[7px] border-b-[1px] border-t-[2px] border-l-[2px] mx-8 rounded-xl my-4 py-3.5 px-3.5">
        <h1 className="text-[17px] font-semibold">Emerge BPO</h1>
        <h1 className="text-[15px] font-semibold">
          Customer Service Representative
        </h1>
        <h1 className="text-[15px] font-medium -mt-1.5 italic mb-2">
          Sep 2020 - Dec 2020
        </h1>
        <ul className="text-[15px]/4">
          <li className="pb-2.5 font-extralight">
            Managed client orders for office supplies, provided delivery ETAs,
            and processed returns.
          </li>
          <li className="pb-2.5 font-extralight">
            Assisted French-speaking clients, resolved inquiries, and escalated
            issues when needed.
          </li>
          <li className="pb-2.5 font-extralight">
            Updated client account details and completed requested changes.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsNExp;
