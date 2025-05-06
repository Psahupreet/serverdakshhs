// controllers/partnerController.js
import Partner from "../models/Partner.js";

export const registerPartner = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const partner = new Partner({ name, phone, email });
    await partner.save();

    res.status(201).json({ message: "Partner registered successfully" });
  } catch (err) {
    console.error("❌ Partner register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch partners" });
  }
};

export const deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: "Partner deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
