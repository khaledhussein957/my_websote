"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/store/portfolioSlice";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    dispatch(fetchUser());
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

  if (loading.user) {
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
                    {user?.name || "Your Name"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {user?.about_me ||
                      user?.bio ||
                      "I am a passionate full-stack developer with a strong foundation in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    With experience in both frontend and backend development, I
                    enjoy working on projects that challenge me to learn and
                    grow. I believe in writing maintainable code and creating
                    user experiences that are both beautiful and functional.
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
                        <a
                          href={`mailto:${user.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {user.email}
                        </a>
                      </div>
                    )}
                    {user?.website && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium mr-2">Website:</span>
                        <a
                          href={user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {user.website}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Services I Offer
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: "🌐",
                        title: "Web Development",
                        description: "Modern and responsive websites tailored to your needs",
                      },
                      {
                        icon: "📱",
                        title: "Mobile App Development",
                        description: "Native and cross-platform mobile applications",
                      },
                      {
                        icon: "💻",
                        title: "Full-Stack Development",
                        description: "End-to-end web application development",
                      },
                      {
                        icon: "🎨",
                        title: "UI/UX Design",
                        description: "Beautiful and intuitive user interfaces",
                      },
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {service.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
