
var express = require('express');
const app = require('../app');
const Student = require('../models/student');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.send('Student route is working');
});

/* Get student Details */
router.get('/list', function(req, res, next){
Student.find(function(err,response){
if(err){
  return res.status(404).send("Not found");
}
else{
  res.status(200).json({response});
}

});
});


/* Get student Details */
router.get('/searchByid/studentId', function(req, res, next) {
  Student.findOne({ studentId: req.params.studentId })
      .then((studentId) => {
        console.log({"checking student value": studentId});
          if (!studentId) {

              return res.status(404).json({ message: 'Student not found' });
          }
          res.status(200).json({ data: res });
      })
      .catch((err) => {
          console.error('Error searching for student:', err);
          res.status(500).json({ message: 'Internal server error' });
      });
});

router.post('/register', (req, res, next)=> {
  let newStudent= new Student({
   studentId: req.body.studentId,
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   age: req.body.age, 
   dob: req.body.dob, 
   department: req.body.department
  });
 
  newStudent.save()
  .then(result => {
   res.status(200).json({"Data Stored Successfully ":newStudent});
  })
  .catch(err => {
   res.status(500).send("Unable to Save the details");
  });
 
 });

module.exports = router;