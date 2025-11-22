'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchExperiences } from '@/store/portfolioSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Experience } from '@/lib/api';

export function ExperienceSection() {
  const dispatch = useAppDispatch();
  const { experiences, loading } = useAppSelector((state) => state.portfolio);
  // Ensure experiences is always an array
  const experienceList = Array.isArray(experiences) ? experiences : [];

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  if (loading.experiences) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the experiences that shaped my career
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

            <div className="space-y-12">
              {experienceList.map((experience: Experience, index: number) => (
                <motion.div
                  key={experience._id || index}
                  variants={timelineVariants}
                  className="relative flex items-start md:items-center"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block z-10"></div>

                  {/* Experience Card */}
                  <div className="ml-0 md:ml-16 w-full">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {experience.title || experience.position}
                            </h3>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <Building2 className="h-4 w-4 mr-2" />
                              <span className="font-medium">{experience.company}</span>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end space-y-1">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>
                                {experience.startYear || experience.startDate} - {experience.endYear || experience.endDate || 'Present'}
                              </span>
                            </div>
                            {experience.location && (
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="prose prose-sm max-w-none">
                          <p className="text-muted-foreground leading-relaxed">
                            {experience.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {experienceList.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="text-muted-foreground">
                <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No work experience available yet.</p>
                <p className="text-sm">Check back soon for updates!</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
