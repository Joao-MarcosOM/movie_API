const { hash , compare} = require("bcryptjs");
// O hash é a função que vai gerar a criptografia
// O compare é utilizado para comparar dados criptografados

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
//Aqui eu importo a conexão com o banco de dados

class UserController{
    /*
    - index - GET para listar vários registros.
    - show - GET para exibir um registro específico
    - create - POST para criar um registro.
    - update - PUT para atualizar um registro
    - delete - DELETE para remover um registro
    */

    async create(request, response){
        const {name, email, password} = request.body

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        
        if(checkUserExists){
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8);
        //Primeiro passamos o que queremos criptografar e depois o grau de complexidade

        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);


        return response.status(201).json();
    }

    async update(request, response){
        const {name, email, password, old_password} = request.body;

        const { id } = request.params

        const database = await sqliteConnection();

        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Você precisa informar a senha antiga para informar a nova senha")
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            //Se for falso, quer dizer que a senha antiga não é igual
            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`, [user.name, user.email, user.password, id]);

        return response.status(200).json();

    }
}

module.exports = UserController;