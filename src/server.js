require("express-async-errors")
//Aqui importamos a biblioteca para tratar os erros

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

const express = require("express");
// É como se eu tivesse pegando todas as funcionalidades da pasta express e colocando dentro da constante express

const routes = require("./routes")
//Por padrão, se a gente nao diz qual arquivo queremos acessar de uma pasta, ele buscará o index

migrationsRun();

const app = express();
//Essa variável é criada para que eu inicialize o express para poder utilizar ele


app.use(express.json());
//Essa linha vai mostrar para a aplicação que estaremos trocando informações em formato JSON

app.use(routes)

app.use((error , request, response, next) => {
    //Isso daqui é para verificar se o erro foi por parte do cliente
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    //Se não for do lado do cliente o erro, emitiremos um erro padrão
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;
//Porta onde o express ficará observando os pedidos

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
//Aqui eu estou informando que a aplicação deve ficar monitorando a porta que eu escolhi