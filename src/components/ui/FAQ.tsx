import { faqs } from "@/app/data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import Heading from "@/components/Heading"

export default function FaqSection() {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-4xl">
      <Heading title="Frequently Asked Questions" />
      <div className="my-10 text-gray-700">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`}>
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
