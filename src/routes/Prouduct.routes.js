import { uplodeProduct } from "../controller/Prouduct.controller.js";
import { Router} from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/uplodeproduct").post(
    upload.fields([
        {
            name: "slide",
            maxCount:1
        }
    ]),
    uplodeProduct)

export default router