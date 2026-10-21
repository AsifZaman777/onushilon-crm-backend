import { StoreService } from "../services/store.service.js";

export const CoursesController = {
  async getAll(req, res, next) {
    try {
      const { category, isActive } = req.query;
      const filters = {};
      if (category) filters.category = category;
      if (isActive !== undefined) filters.isActive = isActive === "true";

      const courses = await StoreService.getCourses(filters);
      res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await StoreService.getCourseById(id);

      if (!course) {
        return res.status(404).json({ success: false, message: `Course "${id}" not found` });
      }

      res.status(200).json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const courseData = req.body;
      if (!courseData.title_en || !courseData.price) {
        return res.status(400).json({
          success: false,
          message: "Course title (EN) and price/fee are required.",
        });
      }

      const created = await StoreService.createCourse(courseData);
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: created,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updated = await StoreService.updateCourse(id, updates);
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await StoreService.deleteCourse(id);
      res.status(200).json({
        success: true,
        message: `Course "${id}" deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  },
};
