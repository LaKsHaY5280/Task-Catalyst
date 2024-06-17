"use client";

import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";

export function CustomTabs() {
  const tabs = [
    {
      title: "Todos",
      value: "Todos",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Todos Tab</p>
        </div>
      ),
    },
    {
      title: "Notes",
      value: "Notes",
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Notes tab</p>
        </div>
      ),
    },
  ];

  return (
    <div className="b relative mx-auto my-10 flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] md:h-[40rem]">
      <Tabs tabs={tabs} />
    </div>
  );
}
