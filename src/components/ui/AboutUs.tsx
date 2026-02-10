import { About, Approach, Maybe, Value } from "@/app/graphql/types"
import Heading from "@/components/Heading"
import OurApproach from "@/components/ui/OurApproach"
import { StickerCard } from "@/components/ui/StickerCard"
import Image from "next/image"
import Link from "next/link"

import React from "react";
import clsx from "clsx";
import { RemixIconComponent } from "@/components/RemixIconComponent"

// Co-founders data
const CO_FOUNDERS = [
  {
    id: "flori",
    avatarUrl: "https://d1ljophloyhryl.cloudfront.net/assets/images/flori.JPG",
    name: "Florian Zeidler",
    title: "Co-Founder",
    status: "Online",
    github: "https://github.com/florizeidler",
    linkedin: "https://www.linkedin.com/in/florian-zeidler/",
    email: "mailto:florian@nimbustech.dev",
  },
  {
    id: "rohit",
    avatarUrl: "https://d1ljophloyhryl.cloudfront.net/assets/images/rohit.JPG",
    name: "Rohit Khanduri",
    title: "Co-Founder",
    status: "Online",
    github: "https://github.com/rohitkhanduri",
    linkedin: "https://www.linkedin.com/in/rohit-khanduri/",
    email: "mailto:rohit@nimbustech.dev",
  },
] as const;

type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  title: string;
  handle?: string;
  status?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  className?: string;
};

export const SimpleProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  handle,
  status = "Online",
  github,
  linkedin,
  email,
  className,
}) => {
  return (
    <div
      className={clsx(
        "relative w-full max-w-md overflow-hidden rounded-lg border",
        "border-gray-200 dark:border-slate-800",
        "bg-gray-50 dark:bg-gray-950",
        "p-6 shadow-xl shadow-black/2.5 dark:shadow-slate-900/60",
        "text-gray-900 dark:text-slate-100",
        className
      )}
    >
      {/* Avatar - Larger and at Top */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={avatarUrl}
            alt={name}
            width={192}
            height={192}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold leading-tight">{name}</h3>
          <p className="text-sm text-gray-600 dark:text-slate-400">{title}</p>
          {(handle || status) && (
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
              {handle && <span>@{handle}</span>}
              {status && (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{status}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-gray-300 to-transparent dark:via-slate-700" />

      {/* Social Links */}
      <div className="mt-5 flex items-center justify-center gap-4">
        {github && (
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full p-2.5 transition-colors hover:bg-orange-100 dark:hover:bg-orange-500/10"
            aria-label="GitHub"
          >
            <RemixIconComponent
              name="RiGithubFill"
              className="size-5 text-orange-600 dark:text-orange-400"
            />
          </Link>
        )}
        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full p-2.5 transition-colors hover:bg-orange-100 dark:hover:bg-orange-500/10"
            aria-label="LinkedIn"
          >
            <RemixIconComponent
              name="RiLinkedinBoxFill"
              className="size-5 text-orange-600 dark:text-orange-400"
            />
          </Link>
        )}
        {email && (
          <Link
            href={email}
            className="flex items-center justify-center rounded-full p-2.5 transition-colors hover:bg-orange-100 dark:hover:bg-orange-500/10"
            aria-label="Email"
          >
            <RemixIconComponent
              name="RiMailFill"
              className="size-5 text-orange-600 dark:text-orange-400"
            />
          </Link>
        )}
      </div>
    </div>
  );
};


function FounderIntro({ heading, intro }: { heading: string; intro: string }) {
  const [leftFounder, rightFounder] = CO_FOUNDERS;

  return (
    <div className="relative mb-20 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8">
        {/* Left Founder Card */}
        <div className="hidden lg:block">
          <SimpleProfileCard
            avatarUrl={leftFounder.avatarUrl}
            name={leftFounder.name}
            title={leftFounder.title}
            status={leftFounder.status}
            github={leftFounder.github}
            linkedin={leftFounder.linkedin}
            email={leftFounder.email}
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-1 flex-col items-center justify-center self-center px-4 py-12 sm:px-8 lg:px-16">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            {heading}
          </h2>
          <p className="max-w-3xl text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {intro}
          </p>
        </div>

        {/* Right Founder Card */}
        <div className="hidden lg:block">
          <SimpleProfileCard
            avatarUrl={rightFounder.avatarUrl}
            name={rightFounder.name}
            title={rightFounder.title}
            status={rightFounder.status}
            github={rightFounder.github}
            linkedin={rightFounder.linkedin}
            email={rightFounder.email}
          />
        </div>
      </div>
    </div>
  )
}

function OurValues({
  valuesTitle,
  values,
}: {
  valuesTitle: string
  values?: Maybe<Value[]>
}) {
  return (
    <section id="our-values" className="my-4">
      <div className="mx-auto px-4">
        <Heading title={valuesTitle} className="mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {values?.map((value) => (
            <StickerCard
              key={value.label}
              iconName={value.icon}
              title={value.label}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutUs({
  about,
  approaches,
}: {
  about?: Maybe<About>
  approaches?: Maybe<Approach>
}) {
  if (!about) return null
  return (
    <section id="about-us" className="w-full">
      {about.intro && (
        <FounderIntro heading={about.heading ?? ""} intro={about.intro} />
      )}
      <div className="mx-auto max-w-6xl px-4">
        <OurValues
          valuesTitle={about.valuesTitle ?? ""}
          values={about.values}
        />
        <OurApproach approaches={approaches} />
        <p className="text-center text-gray-600 dark:text-gray-50">
          {about.closing ?? ""}
        </p>
      </div>
    </section>
  )
}
