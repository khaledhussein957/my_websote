"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchNews } from "@/store/portfolioSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function NewsSection() {
    const dispatch = useAppDispatch();
    const { news, loading } = useAppSelector((state) => state.portfolio);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    if (loading.news) {
        return (
            <section id="news" className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-72 bg-muted rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="news" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Latest News & Events
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Stay updated with my latest achievements, events, and announcements
                        </p>
                    </motion.div>

                    {/* News Grid or Empty State */}
                    {news && news.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item, index) => (
                                <motion.div key={item._id} variants={itemVariants}>
                                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-300 group">
                                        {/* Image */}
                                        {item.image && (
                                            <div className="relative h-48 overflow-hidden bg-muted">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                {/* Event Date Badge */}
                                                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                                                    <Calendar className="h-4 w-4" />
                                                    {format(new Date(item.eventAt), "MMM dd, yyyy")}
                                                </div>
                                            </div>
                                        )}

                                        <CardContent className="p-6">
                                            {/* Title */}
                                            <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                                                {item.description}
                                            </p>

                                            {/* Read More Link */}
                                            <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                                <span>Read more</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            variants={itemVariants}
                            className="text-center py-12"
                        >
                            <div className="text-muted-foreground">
                                <p className="text-lg font-medium">No news available yet</p>
                                <p className="text-sm mt-2">Check back soon for updates!</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
