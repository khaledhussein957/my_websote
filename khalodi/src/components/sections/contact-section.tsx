"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/redux";

export function ContactSection() {
  const { user } = useAppSelector((state) => state.portfolio);

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

  return (
    <section id="contact" className="py-20 bg-muted/30">
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
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I&apos;d love to hear
              from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Let&apos;s Connect
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed pt-2">
                    I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href={`mailto:${user?.email || "your.email@example.com"
                          }`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {user?.email || "your.email@example.com"}
                      </a>
                    </div>
                  </div>

                  {user?.phone && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone</p>
                        <a
                          href={`tel:${user.phone}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {user.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {user?.location && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Location</p>
                        <p className="text-muted-foreground">{user.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="pt-4">
                    <p className="font-medium text-foreground mb-4">
                      Follow me in social media
                    </p>
                    <div className="flex space-x-4">
                      {user?.github && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {user?.linkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {user?.instagram && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={user.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Instagram className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {user?.facebook && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={user.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Download CV Card */}
            <motion.div variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Download My CV
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <Download className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-6">
                      Interested in my work? Download my CV to learn more about
                      my experience, skills, and accomplishments.
                    </p>
                    <Button size="lg" className="w-full sm:w-auto" asChild>
                      <a
                        href="/cv.pdf"
                        download="CV.pdf"
                        className="inline-flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download CV
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    PDF Format • Latest Version
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
