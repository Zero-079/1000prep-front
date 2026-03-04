"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqItems } from "@/lib/plans-data"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border border-border rounded-2xl px-6 bg-card hover:border-primary/30 transition-colors"
        >
          <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-4">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}