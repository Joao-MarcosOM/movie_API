const knex = require("../database/knex");

class MovieNotesController{
    async create(request, response){
        const {title , description, rating, tags} = request.body;
        const  user_id  = request.user.id;
        console.log(user_id)

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });


       if(tags.length > 0){
            const tagsInsert = tags.map(name => {
                return {
                    user_id,
                    note_id,
                    name
                }
            });
            await knex("movie_tags").insert(tagsInsert);
        }


        response.json();
    }

    async show( request, response){
        const { id } = request.params;

        const movieNote = await knex("movie_notes").where({id}).first();//Aqui ele vai trazer o primeiro registro de nota que ele encontrar
        const movieTags = await knex("movie_tags").where({note_id: id}).orderBy("name"); //Aqui ele vai trazer todas as tags atreladas aquela nota ordenada por ordem alfabética

        return response.json({
            ...movieNote, //Aqui eu to puxando todo o objeto atrelado na constante note
            movieTags
        });
    }

    async delete(request, response){
        const {id} = request.params;
        
        await knex("movie_notes").where({id}).delete(); //Aqui eu estou usando a própria função de delete na nota selecionada

        return response.json();

    }

    async index(request, response){
        const {title , user_id , tags} = request.query;


        let notes;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim()); //Aqui eu converto o meu texto de tags em um array
            notes = await knex("movie_tags").select([
                "movie_notes.id",
                "movie_notes.title",
                "movie_notes.user_id"
            ]).where("movie_notes.user_id", user_id).whereLike("movie_notes.title", `%${title}%`).whereIn("name" , filterTags).innerJoin("movie_notes", "movie_notes.id","movie_tags.note_id").orderBy("movie_notes.title")//Aqui eu to realizando a pesquisa apenas de notas que possuem a tag específica caso eu mande ela no query da requisição


        }else{
            notes = await knex("movie_notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title") //Aqui eu to puxando todas as notas criadas pelo usuário do id passado pela query da URL e organizando por ordem, alfabética
        }

        const userTags = await knex("movie_tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })
 

        return response.json(notesWithTags);
    }

}

module.exports = MovieNotesController;