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

        // Recent activity (fetch single most recent items and guard createdAt access)
        const lastProject = await Project.findOne().sort({ createdAt: -1 });
        const lastNews = await News.findOne().sort({ createdAt: -1 });
        const lastTestimonial = await Testimonial.findOne().sort({ createdAt: -1 });

        const recentActivity: Array<{ id: any; type: string; message: string; timeAgo: string | null }> = [];

        const safeDateIso = (doc: any) => {
            try {
                const d = doc?.createdAt ? new Date(doc.createdAt) : null;
                return d ? d.toISOString() : null;
            } catch {
                return null;
            }
        };

        if (lastProject) {
            recentActivity.push({
                id: lastProject._id,
                type: 'project',
                message: `New project added: ${lastProject.title}`,
                timeAgo: safeDateIso(lastProject),
            });
        }

        if (lastNews) {
            recentActivity.push({
                id: lastNews._id,
                type: 'news',
                message: `New news article: ${lastNews.title}`,
                timeAgo: safeDateIso(lastNews),
            });
        }

        if (lastTestimonial) {
            recentActivity.push({
                id: lastTestimonial._id,
                type: 'testimonial',
                message: `New testimonial from: ${lastTestimonial.name ?? (lastTestimonial as any).author ?? 'unknown'}`,
                timeAgo: safeDateIso(lastTestimonial),
            });
        }

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
            recentActivity,
            monthlyTrends: monthlyTrends.reverse(),
            status: "true"
        });

    } catch (error) {
        console.log("Dashboard stats error:", error);
        res.status(500).json({ message: "Internal server error", status: "false" });
    }
};
