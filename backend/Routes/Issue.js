import express from "express";
const router = express.Router();
import Issue from "../models/Issue.js";

router.post("/issue", async (req, res) => {
  try {
    const { userId, orderId, issues } = req.body;

    const issue = new Issue({
      userId,
      orderId,
      issues,
    });

    await issue.save();

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      data: issue,
    });
  } catch (error) {
    console.error("Error reporting issue:", error.message);
    res.status(500).json({
      success: false,
      message: `Error reporting issue: ${error.message}`,
    });
  }
});

router.get("/issue", async (req, res) => {
  try {
    const allIssue = await Issue.find();
    res.status(200).json(allIssue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
