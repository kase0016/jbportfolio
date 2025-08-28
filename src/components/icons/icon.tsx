"use client";
import type React from "react";

type IconProps = {
  size: string;
  color: string;
  onclick: React.MouseEventHandler<SVGSVGElement>;
  swidth: number;
};

export const InfoArrow = ({ color, size, onclick }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
      onClick={onclick}
    >
      <path
        d="M61 30.5C61 13.6549 47.3451 0 30.5 0C13.6549 0 9.53674e-07 13.6549 9.53674e-07 30.5C9.53674e-07 47.3451 13.6549 61 30.5 61C47.3451 61 61 47.3451 61 30.5ZM17.321 25.1625C18.5837 23.8998 20.6333 23.8998 21.896 25.1625L30.5 33.7665L39.1041 25.1625C40.3668 23.8998 42.4164 23.8998 43.6791 25.1625C44.9418 26.4252 44.9418 28.4748 43.6791 29.7375L32.6563 40.7602C31.4638 41.9528 29.5332 41.9528 28.3437 40.7602L17.321 29.7375C16.0583 28.4748 16.0583 26.4252 17.321 25.1625Z"
        fill={color}
      />
    </svg>
  );
};

export const HamburgerMenu = ({ color, size, swidth, onclick }: IconProps) => {
  return (
    <div>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        onClick={onclick}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 18L20 18"
          stroke={color}
          strokeWidth={swidth}
          strokeLinecap="round"
        />
        <path
          d="M4 12L20 12"
          stroke={color}
          strokeWidth={swidth}
          strokeLinecap="round"
        />
        <path
          d="M4 6L20 6"
          stroke={color}
          strokeWidth={swidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const XExitIcon = ({ color, swidth, size, onclick }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 269 269"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onclick}
    >
      <path
        d="M31 238L238 31"
        stroke={color}
        strokeWidth={swidth}
        strokeLinecap="round"
      />
      <path
        d="M31 31L238 238"
        stroke={color}
        strokeWidth={swidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
