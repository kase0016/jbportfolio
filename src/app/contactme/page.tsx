"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfoArrow, XExitIcon, HamburgerMenu } from "@/components/icons/icon";
import { useRouter } from "next/navigation";

const ContactMe = () => {
  const [hideMenu, setHideMenu] = useState(true);
  const router = useRouter();

  return (
    <div>
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
    </div>
  );
};

export default ContactMe;
