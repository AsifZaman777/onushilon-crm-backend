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
      const storagePath = req.body?.storagePath || req.query?.storagePath || (id !== "undefined" && !id.startsWith("asset-") ? id : null);
      const publicUrl = req.body?.publicUrl || req.query?.publicUrl;

      const deleteResult = await StorageService.deleteFile(storagePath, publicUrl);
      if (id) {
        await StoreService.deleteMediaAsset(id);
      }

      res.set("Cache-Control", "no-store, no-cache, must-revalidate");
      res.status(200).json({
        success: true,
        message: "Media asset deleted successfully and storage cache invalidated",
        data: deleteResult,
      });
    } catch (error) {
      next(error);
    }
  },
};
