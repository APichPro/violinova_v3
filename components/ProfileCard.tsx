"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import LoaderSpinner from "@/components/LoaderSpinner";
import { ProfileCardProps } from "@/types";

const ProfileCard = ({
  podcastData,
  imageUrl,
  userFirstName,
}: ProfileCardProps) => {
  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-white-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-white-1">
            {userFirstName}
          </h1>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
          <h2 className="text-16 font-semibold text-white-1">
            <span className="font-normal text-white-2">monthly listeners</span>
          </h2>
        </figure>
      </div>
    </div>
  );
};

export default ProfileCard;
