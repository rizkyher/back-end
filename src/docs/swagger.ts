import swaggerAutogen from "swagger-autogen";


const doc = {
  info: {
    version: "v0.0.1",
    title: "API Documentation",
    description: "API Documentation"
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server"
    },
    {
      url: "https://back-end-nine-indol.vercel.app/api",
      description: "Production server"
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        // bearerFormat: "JWT"
      }
    },
    schemas: {
      LoginRequest: {
        identifier: "herdians",
        password: "rizky72h"
      },
      RegisterRequest: {

        fullName: "member2025",
        
        username: "member2025",
        
        email: "member2025@yopmail.com",
        
        password: "Member2025!",
        
        confirmPassword: "Member2025!",
        
      },
      ActivationRequest: {
        code : "abcdef"
      }
    }
  }
}

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0"})(outputFile, endpointsFiles, doc);