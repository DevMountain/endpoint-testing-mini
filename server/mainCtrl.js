let studentList = require("./mockData/student_list.json");
let nextId = 20;
module.exports = {
    getStudents(req, res) {
        const qObj = req.query;
        function findUsers( input, prop ) {
            const re = new RegExp(input.toLowerCase());
            return studentList.filter( user => {
              return user[prop].toLowerCase().match(re)
            }) 
        }
        if (qObj.name) {
            const returnedValue = findUsers(qObj.name, 'student');
            if (returnedValue.length === 0) {
                return res.status(404).send('No match found.')
            }
            return (res
                    .status(200)
                    .send(returnedValue))
          } else if (qObj.email) {
                const returnedValue = findUsers(qObj.email, 'email_address');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.phone) {
                const returnedValue = findUsers(qObj.phone, 'phone');
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (qObj.grade) {
                const returnedValue = studentList.filter(student => {
                    return student.current_grade === qObj.grade.toUpperCase();
                })
                if (returnedValue.length === 0) {
                    return res.status(404).send('No match found.')
                }
                return (res
                        .status(200)
                        .send(returnedValue))
          } else if (Object.keys(qObj).length !== 0) {
            return res    
                    .status(400)
                    .send(`Improper query sent in request: ${Object.keys(qObj)[0]}=${qObj[Object.keys(qObj)[0]]}`)
          }
        res.status(200).send(studentList);
    },
    getStudentById(req,res) {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send('Error with student ID.')
        } else {
            let student = studentList.filter( student => {
                return student.id === id;
            })
            if (student.length === 0) return res.status(404).send('Student not found');
            return res.status(200).send(student);
        }
    },
    updateGrade(req,res) {
        let id = parseInt(req.params.id);
        let newGrade = req.body.current_grade.toUpperCase();
        if (!newGrade) return res.status(400).send('Error with new student grade sent.')
        let possibleGrades = ['A','A-','B+','B','B-','C+','C','C-','D+','D','D-','F']
        if (isNaN(id)) {
            res.status(400).send('Error with student ID.')
        } else {
            if (possibleGrades.indexOf(newGrade) === -1) return res.status(400).send("Send valid grade. Possible grades: " + possibleGrades);
            let student = studentList.filter(s => s.id === id);
            student[0].current_grade = newGrade;
            res.status(200).send(student);
        }
    },
    addStudent(req,res) {
        let b = req.body;
        if (!b.student || !b.email_address || !b.phone || !b.current_grade) {
            return res.status(400).send('Missing information in body.')
        }
        nextId++;
        let newStudent = {
            id: nextId,
            student: b.student,
            email_address: b.email_address,
            phone: b.phone,
            current_grade: b.current_grade
        }
        studentList.push(newStudent)
        return res.status(200).send([studentList[studentList.length - 1]]);
    },
    removeStudent(req,res) {
        let id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send('Error with student ID.')
        } else {
            let studentToRemove = {};
            studentList = studentList.filter(student => {
                if (student.id === id) studentToRemove = student;
                return student.id !== id;
            })
            if (Object.keys(studentToRemove).length === 0) {
                return res.status(404).send('No student with that ID.')
            }
            res.status(200).send([studentToRemove])
        }
    }
}