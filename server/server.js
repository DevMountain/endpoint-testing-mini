const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/students', mainCtrl.getStudents);
app.get('/api/students/:id', mainCtrl.getStudentById);
app.put('/api/students/:id', mainCtrl.updateGrade);
app.post('/api/students', mainCtrl.addStudent);
app.delete('/api/students/:id', mainCtrl.removeStudent)



const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))