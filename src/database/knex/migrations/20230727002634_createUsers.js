//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.text("avatar").nullable(); // Adicionando .nullable() para permitir valores nulos
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("users");