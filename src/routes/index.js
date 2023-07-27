// A missão do index.js é de reunir todas as rotas da aplicação que estarão separadas por arquivos
const { Router } = require("express");

const usersRouter = require("./user.routes")

const movieNotesRouter = require("./movie_notes.routes")

const tagsRouter = require("./tags.routes")

const routes = Router();

routes.use("/users", usersRouter);
//Toda vez que alguém acessar a url /users, vai ser redirecionado para o usersRouter

routes.use("/movies", movieNotesRouter);


routes.use("/tags", tagsRouter);


module.exports = routes;