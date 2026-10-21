import { StoreService } from "../services/store.service.js";

export const MentorsController = {
  async getAll(req, res, next) {
    try {
      const mentors = await StoreService.getMentors();
      res.status(200).json({ success: true, count: mentors.length, data: mentors });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const mentor = await StoreService.createMentor(req.body);
      res.status(201).json({ success: true, message: "Mentor created", data: mentor });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await StoreService.updateMentor(id, req.body);
      res.status(200).json({ success: true, message: "Mentor updated", data: updated });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await StoreService.deleteMentor(id);
      res.status(200).json({ success: true, message: `Mentor "${id}" deleted` });
    } catch (error) {
      next(error);
    }
  },
};
