'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchTestimonials } from '@/store/portfolioSlice';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function TestimonialsSection() {
  const dispatch = useAppDispatch();
  const { testimonials, loading } = useAppSelector((state) => state.portfolio);
  // Ensure testimonials is always an array
  const testimonialList = Array.isArray(testimonials) ? testimonials : [];

  useEffect(() => {
    dispatch(fetchTestimonials());
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

  if (loading.testimonials) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating
          ? 'text-yellow-400 fill-current'
          : 'text-muted-foreground'
          }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20">
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
              Client Testimonials
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What clients and colleagues say about working with me
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialList.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="h-8 w-8 text-primary/20" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      &quot;{testimonial.content}&quot;
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-border">
                      <div className="flex-shrink-0">
                        {testimonial.avatar ? (
                          <Image
                            src={(testimonial.avatar) as string}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold text-lg">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </p>
                        {testimonial.company && (
                          <p className="text-xs text-muted-foreground">
                            {testimonial.company}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {testimonialList.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="text-muted-foreground">
                <Quote className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No testimonials available yet.</p>
                <p className="text-sm">Check back soon for updates!</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
