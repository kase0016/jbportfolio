import React, { useState, useEffect } from "react";
import Image from "next/image";

type skillsCard = {
  imageSrc: string;
  size: number;
  skillName: string;
};

const SkillsCard = ({ imageSrc, size, skillName }: skillsCard) => {
  const imgUrl = `/${imageSrc}`;
  return (
    <div className="flex flex-col items-center">
      <Image
        src={imgUrl}
        alt=""
        width={size}
        height={size}
        className="object-contain mb-2.5 self-center"
      />
      <h3>{skillName}</h3>
    </div>
  );
};

export default SkillsCard;
