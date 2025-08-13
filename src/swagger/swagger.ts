import swaggerAutogen from "swagger-autogen";

const doc = {
// заголовки
    info: {
        title: 'IPR',
        description: 'Documentation'
    },
    host: "localhost:8082",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
// группировка по эндпойнтам
    tags: [
        {
            "name": "Auth",
            "description": "Endpoints"
        },
        {
            "name": "Users",
            "description": "Endpoints"
        },
        {
            "name": "Orders",
            "description": "Endpoints"
        }
    ],
// описание моделей
    definitions: {
        Order: {
            userId: "689263d269d12bef18c33a4d",
            amount: 5,
        },
        User: {
            email: "vas@ya.ru",
            name: "Vasya",
            profile: "",
        }
    }
}

// путь к автоматически сгенерированному файлу
const outputFile = './output.json';
// путь к файлу с описанием адресов роутеров
const endpointsFiles = ['../routes/order.routes.js', '../routes/user.routes.js'];

// путь к главному файлу с которого стартует сервер
swaggerAutogen( /*options*/)(outputFile, endpointsFiles, doc).then(() => {
    import('../app.js');
});
