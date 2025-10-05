import type { Response } from "express";
import type { AuthenticatedRequest } from "../middlewares/protectRoute";

import Project from "../models/project.model";
import News from "../models/news.model";
import TechStack from "../models/techstack.model";
import Testimonial from "../models/testimonial.model";
import Visit from "../models/visit.model";

export const DashboardStats = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized", status: "false" });

        const totalProjects = await Project.countDocuments();
        const totalNews = await News.countDocuments();
        const totalTechStacks = await TechStack.countDocuments();
        const totalTestimonials = await Testimonial.countDocuments();

        // Start of current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        // Counts for this month
        const newProjectsThisMonth = await Project.countDocuments({ createdAt: { $gte: startOfMonth } });
        const newNewsThisMonth = await News.countDocuments({ createdAt: { $gte: startOfMonth } });
        const newTestimonialsThisMonth = await Testimonial.countDocuments({ createdAt: { $gte: startOfMonth } });
        const totalVisitsThisMonth = await Visit.countDocuments({ createdAt: { $gte: startOfMonth } });

        const visits = await Visit.find().sort({ createdAt: -1 });
        console.log("Total visits:", visits.length);
        console.log("visits:", visits);

        // Recent activity
        const lastProject = await Project.find().sort({ createdAt: -1 }).limit(1);
        const lastNews = await News.find().sort({ createdAt: -1 }).limit(1);
        const lastTestimonial = await Testimonial.find().sort({ createdAt: -1 }).limit(1);
        // const recentActivity = [
        //     ...lastProject.map(proj => ({
        //         id: proj._id,
        //         type: 'project',
        //         message: `New project added: ${proj.title}`,
        //         timeAgo: proj.createdAt.toISOString(),
        //     })),
        //     ...lastNews.map(news => ({
        //         id: news._id,
        //         type: 'news',
        //         message: `New news article: ${news.title}`,
        //         timeAgo: news.createdAt.toISOString(),
        //     })),
        //     ...lastTestimonial.map(testi => ({
        //         id: testi._id,
        //         type: 'testimonial',
        //         message: `New testimonial from: ${testi.author}`,
        //         timeAgo: testi.createdAt.toISOString(),
        //     })),
        // ];

        // Monthly trends (6 months)
        const monthlyTrends = [];
        for (let i = 0; i < 6; i++) {
            const monthStart = new Date(new Date().getFullYear(), new Date().getMonth() - i, 1);
            const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() - i + 1, 0);
            const monthLabel = monthStart.toLocaleString('default', { month: 'short' });

            const projectsCount = await Project.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
            const newsCount = await News.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
            const testimonialsCount = await Testimonial.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
            const visitsCount = await Visit.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });

            monthlyTrends.push({
                month: monthLabel,
                projects: projectsCount,
                news: newsCount,
                testimonials: testimonialsCount,
                visits: visitsCount,
            });
        }

        res.status(200).json({
            totalProjects,
            totalNews,
            totalTechStacks,
            totalTestimonials,
            newProjectsThisMonth,
            newNewsThisMonth,
            newTestimonialsThisMonth,
            totalVisitsThisMonth,
            // recentActivity,
            monthlyTrends: monthlyTrends.reverse(),
            status: "true"
        });

    } catch (error) {
        console.log("Dashboard stats error:", error);
        res.status(500).json({ message: "Internal server error", status: "false" });
    }
};
