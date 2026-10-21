import { StoreService } from "../services/store.service.js";

export const PublicController = {
  /**
   * Single unified endpoint returning all dynamic data for the landing page
   */
  async getAllContent(req, res, next) {
    try {
      const [settings, courses, sections, mentors, moments] = await Promise.all([
        StoreService.getSettings(),
        StoreService.getCourses({ isActive: true }),
        StoreService.getSections(),
        StoreService.getMentors(),
        StoreService.getMoments(),
      ]);

      res.status(200).json({
        success: true,
        data: {
          settings,
          courses,
          sections: sections.reduce((acc, curr) => {
            acc[curr.section_id] = curr;
            return acc;
          }, {}),
          mentors,
          moments,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getSettings(req, res, next) {
    try {
      const settings = await StoreService.getSettings();
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  },

  async getCourses(req, res, next) {
    try {
      const { category } = req.query;
      const courses = await StoreService.getCourses({ isActive: true, category });
      res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
      next(error);
    }
  },

  async submitLead(req, res, next) {
    try {
      const { full_name, name, phone, email, course_id, course_name, message } = req.body;

      const applicantName = (full_name || name || "").trim();
      const applicantPhone = (phone || "").trim();

      if (!applicantName || !applicantPhone) {
        return res.status(400).json({
          success: false,
          message: "Name and phone number are required to reserve a seat.",
        });
      }

      const lead = await StoreService.createLead({
        full_name: applicantName,
        phone: applicantPhone,
        email: email || "",
        course_id: course_id || "",
        course_name: course_name || "",
        message: message || "Enrolment request from website",
      });

      res.status(201).json({
        success: true,
        message: "Enrolment request received successfully! Our counsellor will reach out shortly.",
        data: lead,
      });
    } catch (error) {
      next(error);
    }
  },
};
