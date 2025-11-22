"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { NewsSection } from "@/components/sections/news-section";
// import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { useAppDispatch } from "@/hooks/redux";
import {
  fetchUser,
  fetchProjects,
  fetchEducations,
  fetchExperiences,
  // fetchTestimonials,
  fetchTechStacks,
  fetchNews,
} from "@/store/portfolioSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch all data on component mount
    dispatch(fetchUser());
    dispatch(fetchProjects());
    dispatch(fetchEducations());
    dispatch(fetchExperiences());
    // dispatch(fetchTestimonials());
    dispatch(fetchTechStacks());
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <NewsSection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
