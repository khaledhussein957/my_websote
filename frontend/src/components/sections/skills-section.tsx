"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchTechStacks } from "@/store/portfolioSlice";
import { Card, CardContent } from "@/components/ui/card";

export function SkillsSection() {
  const dispatch = useAppDispatch();
  const { techStacks, loading } = useAppSelector((state) => state.portfolio);
  // techStacks is already an array from the Redux store
  const techStackList = Array.isArray(techStacks) ? techStacks : [];

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // First useEffect - fetch tech stacks
  useEffect(() => {
    dispatch(fetchTechStacks());
  }, [dispatch]);

  // Group skills by category (using first category name or 'Other')
  const skillsByCategory = techStackList.reduce((acc, skill) => {
    const category =
      Array.isArray(skill.category) && skill.category.length > 0
        ? skill.category[0].name.trim()
        : "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as { [key: string]: typeof techStackList });

  // Get all categories
  const categories = ["All", ...Object.keys(skillsByCategory)];

  // Filter skills based on selected category
  const displayedSkills =
    selectedCategory === "All"
      ? skillsByCategory
      : skillsByCategory[selectedCategory]
        ? { [selectedCategory]: skillsByCategory[selectedCategory] }
        : {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Loading state - now comes AFTER all hooks
  if (loading.techStacks) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-20 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to
              life
            </p>
          </motion.div>

          {/* Category Toggle Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid - Key forces re-render on category change */}
          <div key={selectedCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(displayedSkills).map(
              ([category, skills], categoryIndex) => (
                <motion.div
                  key={`${selectedCategory}-${category}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {Array.isArray(skills) && skills.map((skill, index) => (
                      <motion.div
                        key={`${selectedCategory}-${skill._id}`}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <div className="text-2xl mb-2">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-center">
                          {skill.name}
                        </span>
                        {/* Skill Level Indicator */}
                        <div className="w-full bg-muted rounded-full h-1 mt-2">
                          <motion.div
                            className="bg-primary h-1 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(skill.proficiency || 0) * 10}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.1,
                              duration: 0.8,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* Additional Skills */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Additional Skills
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Problem Solving",
                    "Team Collaboration",
                    "Agile Development",
                    "Code Review",
                    "Testing & Debugging",
                    "Performance Optimization",
                    "UI/UX Design",
                    "Project Management",
                    "Mentoring",
                    "Documentation",
                  ].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
