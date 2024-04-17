import { randomUUID } from "crypto";
import { create } from "domain";
import { FastifyInstance } from "fastify";
import { request } from "http";
import { UsersController } from "../controllers/UsersController";
import { NotesController } from "../controllers/NotesController";

const users = new Map()
const usersController = new UsersController()
const notesController = new NotesController()

export async function routes(fastify: FastifyInstance) {
    
    // Users
    fastify.post("/users", (request, reply) => usersController.create(request, reply))
    
    fastify.get("/users", (request, reply) => usersController.list(request, reply))
 
 
    // Notes
    fastify.post("/notes", (request, reply) => notesController.create(request, reply))
    
    fastify.get("/notess", (request, reply) => notesController.list(request, reply))
}