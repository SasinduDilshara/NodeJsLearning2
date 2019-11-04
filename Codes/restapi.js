const express = require('express');
const app = express();
app.use(express.json());//adding a middleware

const courses = [
    { id: 1, name: "Sasindu" },
    { id: 2, name: "Sasindu2" },
    { id: 3, name: "Sasindu3" },
    { id: 4, name: "Sasindu4" }
];

app.get('/', (req, res) => {
    res.send("Hello");
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
})
//res.state(400)

app.post('/api/courses', (req, res) => {//if post has happen in here

    const course = {
        id: courses.length + 1,
        name: 'req.body.name'
    };
    courses.push(course);
    res.send(courses);//bcz client need to know idea of this , view body in postman
}
);



app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("No course");
    }
    course.name = req.body.name;
    res.send(courses);
});
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("No course");
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
});



//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`${port}`));