const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: 'couse1' },
    { id: 2, name: 'couse2' },
    { id: 3, name: 'couse3' },
]

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course id not found.');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    /* const course = courses.find(c => c.id === parseInt(req.params.id));

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course); */

     courses = courses.filter((item)=>{
        return item.id != req.params.id;
    });

    res.send(courses);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
})