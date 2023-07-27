const { Router } = require("express");

const MovieNotesController = require("../controllers/Movie_NotesController");
//Aqui eu importo o controller

const movieNotesRoutes = Router();


function myMiddleware(request , response, next){
    console.log("Você passou pelo Middleware");
    

    next();
}
//Criando o middleware



const movieNotesController = new MovieNotesController();
//Aqui eu estou criando uma variável que está instanciando a classe UserController, alocando um espaço na memória para ela


movieNotesRoutes.get("/" , movieNotesController.index);

movieNotesRoutes.post("/:user_id" , movieNotesController.create);
//Aqui eu to fazendo com que caso a rota X seja acessada, o método Y da minha classe será executado
//Usando dessa forma, eu falo que essa rota específica tem o middleware

movieNotesRoutes.get("/:id" , movieNotesController.show);

movieNotesRoutes.delete("/:id" , movieNotesController.delete);

module.exports = movieNotesRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar