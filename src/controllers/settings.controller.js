import { StoreService } from "../services/store.service.js";

export const SettingsController = {
  async get(req, res, next) {
    try {
      const settings = await StoreService.getSettings();
      res.status(200).json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const updates = req.body;
      const updated = await StoreService.updateSettings(updates);
      res.status(200).json({
        success: true,
        message: "Settings updated successfully",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },
};
