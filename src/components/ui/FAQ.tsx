import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import Heading from "@/components/Heading"
const faqs = [
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

export default function FaqSection() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-4xl">
      <Heading title="Frequently Asked Questions" />
      <div className="my-10 text-gray-700">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Accordion>
  )
}
