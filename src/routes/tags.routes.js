const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
//Aqui eu importo o controller

const tagsRoutes = Router();


const tagsController = new TagsController();

tagsRoutes.get("/:user_id" , tagsController.index);

module.exports = tagsRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar