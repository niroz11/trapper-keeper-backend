import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

app.locals.title = []
app.locals.body = []

//get all notes 
app.get('/app/v1/notes/', (request,response) => {
    const  titles = app.locals.title;
    const body = app.locals.body;
    if(titles.length === 0 || body.length === 0 ){
        return response.status(404).json("No notes yet")
    }else {
        return response.status(200).json({titles, body})
    }
})

//add notes 
app.post('/app/v1/notes/', (request, response) => {
    const { title,body } = request.body;
    if(!title || !body){
        return response.status(422).json("title or body missing")
    } else {
        app.locals.title.push(title)
        app.locals.body.push(body)
        return response.status(200).json({title,body})
    }
})

//get note by id 
app.get('/app/v1/notes/:id', (request,response) => {
    const { id } = request.params;
    const foundNote = app.locals.notes.find(note => note.id === id)
    const foundBody = app.locals.body.find( body => body.id === id)

    if(foundNote){
        return response.status(200).json({foundNote, foundBody})
    }else {
        return response.status(404).json("this note does not exist")
    }
})

//delete note by id 

app.delete('/app/v1/notes/:id', (request, response) => {
    const { id } = request.params;
    const filteredNotes = app.locals.notes.filter(note => note.id !== id)
    const filteredBody = app.locals.body.filter(body => body.id !== id)

    if(filteredNotes.length < app.locals.notes.length){
        app.locals.notes = filteredNotes
        app.locals.body = filteredBody
        return response.status(200).json("note was deleted successfully")
    }else {
        return response.status(404).json("sorry could not delete or that note doesnt exist")
    }

})

//edit or update note by id 
app.put('/app/v1/notes/:id', (request,response) => {
    const { id } = request.params; 
    const { title, body } = request.body;

    const noteToEdit = app.locals.notes.find(note => note.id === id)

    if(noteToEdit){
        const updatedNote = app.locals.notes.map((note) => {
            if(note.id === id){
                note.title = title;
            }
            return note;
        })
        app.locals.notes = updatedNote;
        return response.status(202).json("Note was updated successfully")
        
    } else {
        return response.status(404).json("note not found and could not be updated")
    }

})


export default app;


