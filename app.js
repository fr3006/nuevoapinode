//npm init   instala pack json
// instalar express npm i express
//npm i joy
//npm i nodemon
//backtikcs alt 96.
//javascript es6 code snippets, 
//terminal, tsi 
//clg 



const express = require('express')
const app = express()
const Joi = require('joi');
app.use(express.json());

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
];

app.get('/', (req, res) => {
    res.send('Hello World')
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {

    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('No encontrado'); //404

    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const {
        error
    } = validateCouse(req.body); //result error 
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    let course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {

    res.send(req.params);
});

app.put('/api/courses/:id', (req, res) => {
    // si no existe return 404
    //
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('No actualizado'); //404
   
    const {error} = validateCouse(req.body); //result error 
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) =>
{
  //retur 404
  let course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('No Eliminado'); //404
  //delete 

  let index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCouse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

//PORT
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Ok ${port}`));