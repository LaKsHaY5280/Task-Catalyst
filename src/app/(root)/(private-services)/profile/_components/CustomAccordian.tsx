import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const CustomAccordian = () => {
  return (
    <Accordion type="single" collapsible className="w-9/12">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Image
            src={""}
            alt="Time Table"
            className="h-14 w-14 rounded-full bg-primary"
          />
          Time Table
        </AccordionTrigger>
        <AccordionContent>Table</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <Image
            src={""}
            alt="Syllabus"
            className="h-14 w-14 rounded-full bg-primary"
          />
          Syllabus
        </AccordionTrigger>
        <AccordionContent>Table</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Image
            src={""}
            alt="Date Sheet"
            className="h-14 w-14 rounded-full bg-primary"
          />
          Date Sheet
        </AccordionTrigger>
        <AccordionContent>Table</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordian;
