const express = require('express')
const cors=require('cors')
const app = express()
const pool=require('./db')

//middleware
app.use(cors())
app.use(express.json())

//Routes

//Create students
app.post("/students", async (req, res) => {
    try {
        const { student_id } = req.body;
      const { first_name } = req.body;
      const { last_name } = req.body;
      const newStudent = await pool.query(
        "INSERT INTO students (student_id,first_name,last_name) VALUES($1,$2,$3) RETURNING *",
        [student_id,first_name,last_name]
        //"INSERT INTO students (last_name) VALUES($1) RETURNING *",
        //[last_name],
      );
  
      res.json(newStudent.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//get all students
app.get("/students", async (req, res) => {
    try {
      const allStudents = await pool.query("SELECT * FROM students");
      res.json(allStudents.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
//get a student
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
      //const x=req.params.id;
      console.log(req.params.id)
      const student = await pool.query("SELECT * FROM students WHERE student_id = $1", [id]);
  
      res.json(student.rows[0]);
      //console.log(student.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//delete a student
app.delete("/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteStudent = await pool.query("DELETE FROM students WHERE student_id = $1", [
        id
      ]);
      res.json("Student was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
//update a student
app.put("/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name } = req.body;
      const { last_name } = req.body;
      const updateStudent = await pool.query(
        "UPDATE students SET first_name = $1, last_name =$2 WHERE student_id = $3",
        [first_name, last_name,id]
      );
  
      res.json("Student was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });


app.listen(5000,()=>{
    console.log('listening on port 5000')
})