import { Hono } from "hono";
import { FormController } from "../controllers/form.controller.js";

const formController = new FormController();
const formRouter = new Hono();

formRouter.post("/validateName/:name", formController.validateName);
formRouter.post("/validateCareType/:careType", formController.validateCareType);
formRouter.post("/searchMatchingFacility/:zipCode/:careType", formController.searchMatchingFacility);

export default formRouter;
