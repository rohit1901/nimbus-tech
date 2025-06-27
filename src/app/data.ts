import {
  AnalyticsData,
  Benefit,
  Certification,
  CompositePageContent,
  CompositePageContentWithExtras,
  CTA,
  FaqItem,
  FeatureVisualization,
  FooterSections,
  HeroType,
  Language,
  NavigationSectionItem,
  OurApproachContent,
  PageContent,
  PageContentWithSubHeading,
  Testimonial,
} from "@/app/types"
import {
  RiArrowRightUpLine,
  RiAwardFill,
  RiFlashlightFill,
  RiGithubFill,
  RiLightbulbFill,
  RiLinkedinBoxFill,
  RiMoneyEuroBoxFill,
  RiShieldCheckFill,
  RiTimeLine,
  RiXingFill,
} from "@remixicon/react"
import { ImageProps } from "next/image"

export const benefitsContent: CompositePageContent<"benefits", Benefit[]> = {
  title: "Your Benefits with Nimbus Tech",
  benefits: [
    {
      icon: RiAwardFill,
      title: "Certified Experts",
      description: "We are experienced and certified AWS cloud specialists.",
    },
    {
      icon: RiMoneyEuroBoxFill,
      title: "Full Cost Control",
      description:
        "We ensure transparent and predictable costs for your cloud project.",
    },
    {
      icon: RiFlashlightFill,
      title: "Fast Implementation",
      description:
        "We implement your individual cloud project efficiently and quickly.",
    },
  ],
}

export const testimonialPageContent: CompositePageContentWithExtras<{
  background: {
    imageProps: ImageProps
    outerClassName: string
  }[]
  testimonials?: Testimonial[]
  fallback: Testimonial
}> = {
  title: "Client Success Stories",
  background: [
    {
      imageProps: {
        src: "/images/field.png",
        alt: "clouds background",
        fill: true,
        className: "object-cover",
      },
      outerClassName: "absolute inset-0 object-cover",
    },
    {
      imageProps: {
        src: "/images/drone.png",
        alt: "clouds background",
        width: 1583,
        height: 554,
        className: "animate-hover",
      },
      outerClassName:
        "absolute top-[19rem] -right-14 w-[19rem] sm:top-[12rem] sm:right-3 sm:w-[23rem] md:top-[12rem] md:right-0 md:w-[25rem] lg:top-[16rem] lg:right-12 lg:w-[34rem]",
    },
  ],
  fallback: {
    badge: {
      icon: RiTimeLine,
      label: "Coming Soon",
    },
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts, Germany",
    company: "Nimbus Tech",
    image: {
      src: "/nimbus.svg",
      alt: "Nimbus Tech logo",
      width: 50,
      height: 50,
      className:
        "rounded-full border-none bg-orange-50 p-3 shadow-lg ring-1 shadow-[#366A79]/20 ring-white/20 transition-transform duration-300 ease-in-out hover:scale-105",
    },
    content:
      "As Nimbus Tech launches, we look forward to partnering with innovative organizations and delivering exceptional software and cloud solutions. Your feedback could be featured here!",
  } as Testimonial,
}

export const certifications: Certification[] = [
  {
    id: 1,
    title:
      "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
    description:
      "Advanced expertise in software architecture principles and practices.",
    image: "/cpsa.a.png",
    width: 200,
    height: 200,
  },
  {
    id: 2,
    title:
      "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
    description:
      "Fundamental knowledge of software architecture concepts and methodologies.",
    image:
      "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
    link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
    width: 200,
    height: 200,
  },
  {
    id: 3,
    title: "Apollo Certified Graph Developer - Professional",
    description:
      "Certified skills in GraphQL development and Apollo client/server technologies.",
    image:
      "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
    link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
    width: 200,
    height: 200,
  },
  {
    id: 4,
    title: "Apollo Certified Graph Developer - Associate",
    description:
      "Certified skills in GraphQL development and Apollo client/server technologies.",
    image:
      "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
    link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
    width: 200,
    height: 200,
  },
  {
    id: 5,
    title: "Git Certified Specialist by GitKraken",
    description:
      "Expertise in Git version control and collaboration workflows.",
    image: "/gitkraken.svg",
    link: "https://cdn.filestackcontent.com/dq8NILlGROaJpp4bxYlC?policy=eyJjYWxsIjpbInJlYWQiXSwiZXhwaXJ5IjoxNzUwNjg3MzIwLCJwYXRoIjoiLyJ9&signature=3180d99a6f24a049042e2341f449f4e35a12688f261859fa6dfd88cac212d230",
    width: 200,
    height: 200,
  },
  {
    id: 6,
    title: "AWS Certified Developer - Associate",
    description:
      "Demonstrates proficiency in developing and maintaining applications on AWS.",
    image:
      "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
    width: 200,
    height: 200,
  },
]

export const ourCertificationsPageContent: CompositePageContent<
  "certifications",
  Certification[]
> = {
  title: "Our Certifications",
  description:
    "Nimbus Tech is certified in various technologies and methodologies, ensuring the highest quality standards in our projects.",
  certifications,
  cta: {
    label: "Let’s Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
  },
}

export const navigationPageContent: PageContent = {
  title: "Nimbus Tech",
  description:
    "Nimbus Tech is a software development and consulting company specializing in cloud architecture, DevOps, and automation solutions. We help businesses build scalable, efficient, and secure software systems.",
  image: "https://nimbus-tech.de/images/nimbus-tech-hero-image.jpg", // Example image URL, replace with actual image path
  imageAlt: "Nimbus Tech Hero Image",
  cta: {
    label: "Get started",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
  },
}

// navLinks.ts or navLinks.json (can be imported or fetched from CMS/API)
export const navLinks: NavigationSectionItem[] = [
  { label: "Services", href: "#features" },
  { label: "About Us", href: "#about-us" },
  { label: "Blog", href: "https://rohitkhanduri.substack.com", external: true }, // TODO: Link to Substack for now
  {
    label: "Contact",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
  },
]

export const heroPageContent: CompositePageContent<"hero", HeroType> = {
  title: "Nimbus Tech",
  description:
    "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
  hero: {
    subHeading: "Expert Software & Cloud Solutions",
    banner: {
      label: "News",
      href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
      external: true,
      additional: {
        icon: RiArrowRightUpLine,
        text: "Nimbus Tech is launching soon!",
      },
    },
  },
  cta: {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: true,
  },
}

export const CURRENT_YEAR = new Date().getFullYear()
export const footerPageContent: CompositePageContentWithExtras<{
  sections: FooterSections
  languages: Language[]
}> = {
  title: "Footer",
  sections: {
    services: {
      title: "Services",
      items: [
        { label: "Software Development", href: "#features" },
        { label: "Cloud Architecture", href: "#features" },
        { label: "DevOps & Automation", href: "#features" },
        { label: "Software Architecture", href: "#features" },
        { label: "Technology Assessment", href: "#features" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { label: "About Nimbus Tech", href: "#about-us" },
        {
          label: "Blog",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
        // Careers removed (add later when hiring)
        // Case Studies removed (add after first projects)
        { label: "Our Values", href: "#our-values" },
        {
          label: "News & Updates",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
      ],
    },
    resources: {
      title: "Resources",
      items: [
        // TODO: Add links to documentation, guides, or other resources when available
        {
          label: "Contact",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        {
          label: "Support",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        // "Report an Issue" can stay if you want to be open to feedback from day one
      ],
    },
    social: {
      title: "Follow Us",
      items: [
        {
          label: "GitHub",
          href: "https://rohit1901.github.com",
          external: true,
          icon: RiGithubFill,
        },
        {
          label: "LinkedIn",
          href: "#",
          external: true,
          icon: RiLinkedinBoxFill,
        },
        {
          label: "Xing",
          href: "#",
          external: true,
          icon: RiXingFill,
        },
      ],
    },
  },
  languages: [
    {
      label: "English",
      value: "en-US",
    },
    {
      label: "German",
      value: "de-DE",
    },
  ],
}

export const featuresContent: CompositePageContentWithExtras<{
  id: string
  longDescription: string
  visualization: FeatureVisualization
}>[] = [
  {
    id: "software-development",
    title: "Software development",
    description:
      "Custom applications tailored to your business needs, from web to mobile.",
    longDescription:
      "Our team specializes in creating custom software solutions that streamline your operations, enhance productivity, and drive growth. Whether you need a web application, mobile app, or cloud-based solution, we have the expertise to deliver results that exceed your expectations.",
    visualization: "OrbitFeatureVisualization",
  },
  {
    id: "cloud-development",
    title: "Cloud Development",
    description:
      "Seamless cloud migration and scalable solutions leveraging AWS, Azure, or GCP",
    longDescription:
      "Our cloud development services help you migrate to the cloud effortlessly, ensuring your applications are optimized for performance, security, and scalability. We specialize in AWS, Azure, and GCP, providing tailored solutions that meet your unique requirements.",
    visualization: "CloudFeatureVisualization",
  },
  {
    id: "architecture-consulting",
    title: "Architecture & Consulting",
    description:
      "Robust system design and technical consulting for future-proof infrastructure.",
    longDescription:
      "Our architecture and consulting services ensure your systems are designed for scalability, reliability, and performance. We work closely with you to understand your business goals and provide tailored solutions that align with your vision .",
    visualization: "ArchitectureFeatureVisualization",
  },
]

export const faqs: FaqItem[] = [
  {
    question: "What is Nimbus Tech and what do you offer?",
    answer:
      "Nimbus Tech is a software consulting company based in Germany, specializing in custom software development, cloud architecture, DevOps, and software architecture for businesses of all sizes.",
  },
  {
    question: "What types of projects do you work on?",
    answer:
      "We help companies design and build custom software solutions, migrate to the cloud, modernize legacy systems, and optimize IT infrastructure using technologies like Java, JavaScript, TypeScript, React, Angular, Vue, and AWS.",
  },
  {
    question: "Do you only work with cloud technologies?",
    answer:
      "While cloud architecture is a core focus, we also offer on-premises and hybrid solutions, as well as consulting on software architecture, DevOps, and frontend development.",
  },
  {
    question: "How does the consulting process work?",
    answer:
      "We start by understanding your business needs, then recommend and implement tailored solutions. Our process typically includes discovery, planning, development, deployment, and ongoing support.",
  },
  {
    question: "Which technologies do you specialize in?",
    answer:
      "Our team has deep expertise in Java, J2EE, JavaScript, TypeScript, React, Angular, Vue, AWS, and DevOps tools.",
  },
  {
    question: "How do you ensure cost transparency?",
    answer:
      "We provide clear, upfront pricing and regular updates, so you always know what to expect—no hidden costs.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we offer support and maintenance packages to ensure your systems remain secure, up-to-date, and efficient.",
  },
  {
    question: "How can I get started with Nimbus Tech?",
    answer:
      "Simply contact us via our website. We’ll schedule an initial call to discuss your needs and how we can help.",
  },
]

export const ctaPageContent: CompositePageContentWithExtras<{
  background: {
    imageProps: ImageProps
    outerClassName?: string
  }[]
  ctas: CTA[]
}> = {
  title: "Ready to get started?",
  description:
    "Let’s build scalable software solutions tailored to your business goals.",
  ctas: [
    {
      label: "Start now",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      external: true,
    },
    {
      label: "Schedule a discovery call",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
      external: true,
    },
  ],
  background: [
    {
      imageProps: {
        src: "/images/farm-footer.webp",
        alt: "Farm with vehicles blurred",
        width: 1000,
        height: 1000,
        className: "absolute inset-0 -z-10 rounded-2xl blur-xl",
      },
    },
    {
      imageProps: {
        src: "/images/farm-footer.webp",
        alt: "Farm with vehicles",
        width: 1000,
        height: 1000,
        className: "relative z-10 rounded-2xl",
      },
    },
  ],
}

export const analyticsData: AnalyticsData = {
  heading: "Project Performance Overview",
  subheading:
    "Expert insights into deployments, uptime, and client satisfaction across key Nimbus Tech projects.",
  stats: {
    totalDeployments: "305",
    deploymentChange: "+25 deployments",
    deploymentChangePercent: "8.9",
    changePeriod: "Last quarter",
  },
  tableHeadings: [
    "Project",
    "Deployments",
    "Uptime",
    "Client Sat.",
    "Efficiency",
    "Revenue Growth",
  ],
  summary: [
    {
      name: "Project Nimbus",
      deployments: "120",
      uptime: "99.9%",
      clientSatisfaction: "+4.8",
      efficiency: "+7.2%",
      revenueGrowth: "+12.5%",
      bgColor: "bg-blue-500",
      changeType: "positive",
    },
    {
      name: "Cloud Migration",
      deployments: "85",
      uptime: "99.7%",
      clientSatisfaction: "+3.9",
      efficiency: "+5.4%",
      revenueGrowth: "+8.3%",
      bgColor: "bg-green-500",
      changeType: "positive",
    },
    {
      name: "Enterprise App",
      deployments: "60",
      uptime: "98.5%",
      clientSatisfaction: "-1.2",
      efficiency: "-2.5%",
      revenueGrowth: "-3.8%",
      bgColor: "bg-yellow-400",
      changeType: "negative",
    },
  ],
}
// TODO: update this type to PageContent
export const ourApproachContent: OurApproachContent = {
  title: "Our Approach: From Vision to Value",
  description:
    "At Nimbus Tech, we follow a structured approach to ensure your project is successful from start to finish. Our process is designed to be flexible, transparent, and focused on delivering real business value.",
  steps: [
    {
      id: 1,
      type: "done",
      title: "Discovery: Listen & Learn",
      description:
        "We start by understanding your goals, challenges, and vision.",
      activityTime: "Step 1",
    },
    {
      id: 2,
      type: "done",
      title: "Planning: Architect for Success",
      description:
        "We design a scalable, future-proof solution tailored to your needs.",
      activityTime: "Step 2",
    },
    {
      id: 3,
      type: "done",
      title: "Development: Build with Quality",
      description:
        "We develop your solution using best practices and modern technologies.",
      activityTime: "Step 3",
    },
    {
      id: 4,
      type: "in progress",
      title: "Deployment: Launch & Deliver",
      description:
        "We deploy your product securely and ensure a smooth go-live.",
      activityTime: "Step 4",
    },
    {
      id: 5,
      type: "open",
      title: "Support: Optimize & Grow",
      description: "We provide ongoing support and continuous improvement.",
      activityTime: "Step 5",
    },
  ],
}

// TODO: update this type to PageContent
export const aboutUsContent = {
  heading: "About Nimbus Tech",
  intro:
    "With over 14 years of experience in software development, architecture, and cloud, Nimbus Tech is your trusted partner for robust, scalable, and innovative digital solutions. Co-founded in Germany by experienced software architects, we combine deep technical expertise with a passion for solving complex challenges and delivering real business value.",
  valuesTitle: "Our Values",
  values: [
    {
      label: "Excellence",
      description:
        "Technical excellence and continuous improvement in every project.",
      icon: RiAwardFill,
    },
    {
      label: "Transparency",
      description: "Open communication and honest advice at all times.",
      icon: RiMoneyEuroBoxFill,
    },
    {
      label: "Collaboration",
      description: "Building the best solutions together with our clients.",
      icon: RiFlashlightFill,
    },
    {
      label: "Reliability",
      description: "Consistent delivery and long-term support.",
      icon: RiShieldCheckFill,
    },
    {
      label: "Innovation",
      description: "Embracing new technologies and creative thinking.",
      icon: RiLightbulbFill,
    },
  ],
  closing:
    "At Nimbus Tech, we are passionate about helping you succeed in your digital transformation journey.",
}

export const mapPageContent: PageContentWithSubHeading = {
  title: "Global Reach, Local Expertise",
  subheading: "Expert Software & Cloud Consulting, Wherever You Are",
  description:
    "Our team operates from Germany, collaborating with enterprises and startups worldwide to architect, build, and optimize custom software and cloud systems.",
}
