// Represents the Application
const express = require('express');
const app = express();

// 
app.use(express.json());

// Courses
const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];


app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/api/courses', (req, res) => { 
	res.send(courses);
});

app.post('/api/courses', (req, res) => {
	if(!req.body.name || req.body.name < 3) {

		res.status(400).send('Throw some error message.')
		return;
	}
	const course = {
		id: courses.length + 1,
		name: req.body.name 
	};
	courses.push(course);	
	res.send(course);
});

// /api/courses/1, requesting a query
app.get('/api/courses/:id', (req, res) => {

// Course Object
const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course)   

// 404
	res.status(404).send('The course with the given ID was not found.')
	res.send(course);
});

// Port settings: Enviroment variable, ex: export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

