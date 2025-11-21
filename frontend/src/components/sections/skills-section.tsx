"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchTechStacks } from "@/store/portfolioSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkillsSection() {
  const dispatch = useAppDispatch();
  const { techStacks, loading } = useAppSelector((state) => state.portfolio);
  // techStacks is already an array from the Redux store
  const techStackList = Array.isArray(techStacks) ? techStacks : [];

  useEffect(() => {
    dispatch(fetchTechStacks());
  }, [dispatch]);

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(
              ([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-center">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill._id}
                            variants={skillVariants}
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
                    </CardContent>
                  </Card>
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
