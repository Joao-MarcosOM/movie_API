const { Router } = require("express");

const MovieNotesController = require("../controllers/Movie_NotesController");
//Aqui eu importo o controller

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const movieNotesRoutes = Router();


const movieNotesController = new MovieNotesController();
//Aqui eu estou criando uma variável que está instanciando a classe UserController, alocando um espaço na memória para ela

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.get("/" , movieNotesController.index);

movieNotesRoutes.post("/" , movieNotesController.create);


movieNotesRoutes.get("/:id" , movieNotesController.show);

movieNotesRoutes.delete("/:id" , movieNotesController.delete);

module.exports = movieNotesRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar