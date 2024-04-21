const mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    studentId: String,
    firstName: String,
    lastName: String,
    age: Number,
    dob: String,
    department: String
});

let Student = mongoose.model("student", studentSchema);

module.exports = Student;
