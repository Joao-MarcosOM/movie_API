//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("movie_tags", table => {
    table.increments("id");

    table.integer("note_id").references("id").inTable("movie_notes").onDelete("CASCADE");

    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");

    table.text("name");
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("movie_tags");