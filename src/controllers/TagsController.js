const knex = require("../database/knex");

class TagsController{

    async index( request, response){
        const { user_id } = request.params;

        const tags = await knex("movie_tags").where({ user_id });//Aqui ele vai trazer todas as tags atreladas aquela usuário ordenada por ordem alfabética

        return response.json({
            tags
        });
    }

}

module.exports = TagsController;