'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchUser, fetchTechStacks } from '@/store/portfolioSlice';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  const dispatch = useAppDispatch();
  const { user, techStacks, loading } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchUser());
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

  if (loading.user || loading.techStacks) {
    return (
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
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
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    {user?.name || 'Your Name'}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {user?.about_me || user?.bio || 'I am a passionate full-stack developer with a strong foundation in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.'}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    With experience in both frontend and backend development, I enjoy working on projects that challenge me to learn and grow. I believe in writing maintainable code and creating user experiences that are both beautiful and functional.
                  </p>
                  
                  {/* Personal Info */}
                  <div className="space-y-3">
                    {user?.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium mr-2">Location:</span>
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user?.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium mr-2">Email:</span>
                        <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
                          {user.email}
                        </a>
                      </div>
                    )}
                    {user?.website && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium mr-2">Website:</span>
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          {user.website}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Preview */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Core Technologies
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Array.isArray(techStacks?.data) && techStacks.data.slice(0, 8).map((tech, index) => (
                      <motion.div
                        key={tech._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {tech.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-center"
                  >
                    <a
                      href="#skills"
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      View All Skills →
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
