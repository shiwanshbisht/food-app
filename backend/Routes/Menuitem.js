import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Menuitem from "../models/Menuitem.js";
import { fetchUser, adminOnly } from "../middleware/Authmiddle.js";

const router = express.Router();

(async function () {
  cloudinary.config({
    cloud_name: "dqwgwb6gd",
    api_key: "545327828194598",
    api_secret: "P8tO42xvnwW8Uou-cvkJgJbRLFI",
  });
})();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
    console.log("heyyedshghdg");
  },
});

const upload = multer({ storage: storage });

router.post("/menuitem", fetchUser, adminOnly, upload.single("files"), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const newimage = uploadResult.secure_url;
    const newItem = new Menuitem({
      image: newimage,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      veg: req.body.veg,
      bestsellers: req.body.bestsellers,
      qunatity: req.body.qunatity,
    });

    const savedItem = await newItem.save();
    console.log(savedItem);

    res.status(201).json(savedItem);

    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file:", req.file.path);
      }
    });

  } catch (err) {
    res.status(400).json({ message: err.message });

    fs.unlink(req.file.path, function (err) {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file:", req.file.path);
      }
    });
  }
});

router.get("/menuitem", async (req, res) => {
  try {
    const allMenuItems = await Menuitem.find();
    res.status(200).json(allMenuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/menuitem/:id", fetchUser, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const menu = await Menuitem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Error updating quantity" });
  }
});

// Full edit route — updates all fields, image re-upload is optional
router.put("/menuitem/:id/edit", fetchUser, adminOnly, upload.single("files"), async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      veg: req.body.veg === "true" || req.body.veg === true,
      bestsellers: req.body.bestsellers === "true" || req.body.bestsellers === true,
      Avlqunatity: req.body.Avlqunatity,
    };

    // If a new image was uploaded, push it to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      updateData.image = uploadResult.secure_url;

      fs.unlink(req.file.path, (err) => {
        if (err) console.log("Error deleting temp file:", err);
      });
    }

    const updatedItem = await Menuitem.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);

    // Clean up temp file on error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("Cleanup error:", err);
      });
    }

    res.status(500).json({ error: "Error updating menu item" });
  }
});

export default router;
