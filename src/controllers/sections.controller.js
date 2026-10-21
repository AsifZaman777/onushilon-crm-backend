import { StoreService } from "../services/store.service.js";

export const SectionsController = {
  async getAll(req, res, next) {
    try {
      const sections = await StoreService.getSections();
      res.status(200).json({ success: true, count: sections.length, data: sections });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const section = await StoreService.getSectionById(id);

      if (!section) {
        return res.status(404).json({ success: false, message: `Section "${id}" not found` });
      }

      res.status(200).json({ success: true, data: section });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updated = await StoreService.updateSection(id, updates);
      res.status(200).json({
        success: true,
        message: `Section "${id}" updated successfully`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },
};
