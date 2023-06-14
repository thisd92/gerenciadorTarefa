'use client'
import Features from "@/components/features/features";
import { GetStarted, TryNow } from "@/components/getStarted/getStarted";
import TestimonialCarousel from "@/components/testimonial/testimonial";
import { testimonials } from "@/utils/testimonials";
import Link from "next/link";
import { BsListTask } from "react-icons/bs";
import { GrTasks } from 'react-icons/gr'
import { RiTeamFill } from 'react-icons/ri'

export default function Home() {
  return (
    <div className="w-full">
      <GetStarted />
      <Features />
      <TestimonialCarousel testimonials={testimonials} />
      <TryNow />
    </div>
  );
};
