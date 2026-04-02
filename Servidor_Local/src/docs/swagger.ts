import path from "node:path"
import swaggerJsdoc from "swagger-jsdoc"

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Servidor Local",
            description: "Plataforma de gestião de prestadores e servicios",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "dev"
            },
            {
                url: "https://localhost:3000",
                description: "production"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
        path.join(process.cwd(), "./src/docs/paths/*.yaml")
    ]

}

export const swaggerSpec = swaggerJsdoc(options)
