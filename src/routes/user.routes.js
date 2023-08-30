const { Router } = require("express");

const UserController = require("../controllers/UserController");
//Aqui eu importo o controller

const userRoutes = Router();

//Utilizaremos a biblioteca Multer para carregar essa imagem
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);
const UserAvatarController = require("../controllers/UserAvatarController");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");


function myMiddleware(request , response, next){
    console.log("Você passou pelo Middleware");
    

    next();
}
//Criando o middleware

const userAvatarController = new UserAvatarController();


const userController = new UserController();
//Aqui eu estou criando uma variável que está instanciando a classe UserController, alocando um espaço na memória para ela

userRoutes.post("/" , myMiddleware, userController.create);
//Aqui eu to fazendo com que caso a rota X seja acessada, o método Y da minha classe será executado
//Usando dessa forma, eu falo que essa rota específica tem o middleware

userRoutes.put("/:id", userController.update);

//Aqui eu estou utilizando o patch para subir a imagem do usuário
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

//userRoutes.use(myMiddleware);
//Desse jeito aqui, eu estarei fazendo com que todas as minhas rotas passem pelo middleware

module.exports = userRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar