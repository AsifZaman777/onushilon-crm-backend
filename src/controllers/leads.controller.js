import { StoreService } from "../services/store.service.js";

export const LeadsController = {
  async getAll(req, res, next) {
    try {
      const { status } = req.query;
      const leads = await StoreService.getLeads({ status });
      res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required." });
      }

      const validStatuses = ["new", "contacted", "enrolled", "closed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }

      const updated = await StoreService.updateLeadStatus(id, status, notes);
      res.status(200).json({
        success: true,
        message: "Lead status updated successfully",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await StoreService.deleteLead(id);
      res.status(200).json({ success: true, message: `Lead "${id}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  },
};
