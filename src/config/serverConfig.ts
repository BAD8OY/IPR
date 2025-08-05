// import dotenv from 'dotenv';

// dotenv.config();

const SERVER_PORT: number = 8082;

const BASE_URL: string = '';

export const config = {
    server: {
        port: SERVER_PORT
    },
    service_addr: {
        base_url: BASE_URL
    },
    swagger: {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "IPR",
                description: "Сервис заказов и пользователей",
                version: "1.0.0",
            },
            schemes: ["http", "https"],
            servers: [{ url: "http://localhost:8082/" }],
        },
        apis: [
            './src/routes/order.routes.ts',
            '../out/routes/order.routes.js',
        ],
    }
}
