"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { format } from "date-fns";
import { useAppSelector } from "@/hooks/redux";

export function Footer() {
  const { user } = useAppSelector((state) => state.portfolio);

  const socialLinks = [
    { name: "GitHub", icon: Github, href: user?.github },
    { name: "LinkedIn", icon: Linkedin, href: user?.linkedin },
    { name: "Twitter", icon: Twitter, href: user?.twitter },
    {
      name: "Email",
      icon: Mail,
      href: user?.email ? `mailto:${user.email}` : undefined,
    },
  ].filter((link) => link.href);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                {user?.name || "Portfolio"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {user?.about_me ||
                  user?.bio ||
                  "Full-Stack Developer passionate about creating innovative solutions and bringing ideas to life through code."}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Quick Links
              </h4>
              <nav className="space-y-2">
                {[
                  { name: "About", href: "#about" },
                  { name: "Skills", href: "#skills" },
                  { name: "Experience", href: "#experience" },
                  { name: "Projects", href: "#projects" },
                  { name: "Contact", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Get In Touch
              </h4>
              <div className="space-y-2">
                {user?.email && (
                  <a
                    href={`mailto:${user.email}`}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {user.email}
                  </a>
                )}
                {user?.phone && (
                  <a
                    href={`tel:${user.phone}`}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {user.phone}
                  </a>
                )}
                {user?.location && (
                  <p className="text-muted-foreground">{user.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                © {currentYear} {user?.name || "Portfolio"}. All rights
                reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
