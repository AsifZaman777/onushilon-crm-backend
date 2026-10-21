import { StorageService } from "../services/storage.service.js";
import { StoreService } from "../services/store.service.js";

export const MediaController = {
  async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided in request. Field name must be 'image'.",
        });
      }

      const folder = req.body.folder || "general";
      const uploadResult = await StorageService.uploadFile(req.file, folder);

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully to " + uploadResult.storageType,
        data: uploadResult,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const folder = req.query.folder || "";
      const files = await StorageService.listFiles(folder);
      res.status(200).json({ success: true, count: files.length, data: files });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { storagePath, publicUrl } = req.body;

      await StorageService.deleteFile(storagePath, publicUrl);
      await StoreService.deleteMediaAsset(id);

      res.status(200).json({
        success: true,
        message: "Media asset deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
