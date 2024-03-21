import { uplodeBanner,getBanner,deletedBanner,updateBanner } from "../controller/Banner.controller.js";
import { Router} from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/uplodebanner").post(
    upload.fields([
        {
            name: "banner",
            maxCount:1
        }
    ]),
    uplodeBanner)
router.route("/getbanner").get(getBanner)
router.route("/deletbanner/:id").delete(deletedBanner)
router.route("/updatebanner/:id").patch(upload.fields([
    {
        name: "banner",
        maxCount:1
    }
]),updateBanner)

export default router