const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Get all students, or search using query
app.get('/api/students', mainCtrl.getStudents);
// Get one student by ID
app.get('/api/students/:id', mainCtrl.getStudentById);
// Update one student's grade by ID, send new grade in body
app.put('/api/students/:id', mainCtrl.updateGrade);
// Add a new student, send info in body
app.post('/api/students', mainCtrl.addStudent);
// Remove student by ID
app.delete('/api/students/:id', mainCtrl.removeStudent)



const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))