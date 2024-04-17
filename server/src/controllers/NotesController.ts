import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

interface myNote {
    tittle: String
    createdAt: String
    updatedAt: String
    isToDoList: String
    content: String
}

export class NotesController{
    notes = new Map() 
    create (request: FastifyRequest, reply: FastifyReply){
        
        const { tittle, createdAt, updatedAt, isToDoList, content } = request.body as myNote

        const notesId = randomUUID()
        this.notes.set(notesId, { tittle, createdAt, updatedAt, isToDoList, content })
        return reply.send({ status: "success"})
    }

    list(request:FastifyRequest, reply: FastifyReply){
        const notesArr = Array.from(this.notes)
        return reply.send(notesArr)
    }
}