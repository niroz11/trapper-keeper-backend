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
    return response.status(200).json({titles,body})
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


export default app;


