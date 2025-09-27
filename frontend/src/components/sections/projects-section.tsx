'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchProjects } from '@/store/portfolioSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ProjectsSection() {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Normalize projects data - handle API response structure
  const normalizedProjects = Array.isArray(projects)
    ? projects.map((project: any) => {
        let technologies: string[] = [];
        if (Array.isArray(project.techStack) && project.techStack.length > 0) {
          technologies = project.techStack.map((t: any) => t.name?.trim() || '').filter(Boolean);
        } else if (Array.isArray(project.technologies)) {
          technologies = project.technologies;
        }
        return { 
          ...project, 
          technologies,
          // Map API field names to expected field names
          id: project._id || project.id,
          githubUrl: project.githubLink || project.githubUrl,
          liveUrl: project.liveLink || project.liveUrl,
        };
      })
    : [];

  const featuredProjects = normalizedProjects.filter((project: any) => project.featured);
  const otherProjects = normalizedProjects.filter((project: any) => !project.featured);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading.projects) {
    return (
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {project.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button size="sm" asChild>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <>
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Other Projects
                </h3>
                <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project: any, index: number) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      {project.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Demo
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <Github className="h-3 w-3 mr-1" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {normalizedProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="text-muted-foreground">
                <Github className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No projects available yet.</p>
                <p className="text-sm">Check back soon for updates!</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
