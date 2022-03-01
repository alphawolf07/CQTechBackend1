const express = require('express')
const cors=require('cors')
const app = express()
const pool=require('./db')

//middleware
app.use(cors())
app.use(express.json())

//Routes

//Create books
app.post("/books", async (req, res) => {
    try {
        const { book_name } = req.body;
      const { author} = req.body;
      const { borrowedby } = req.body;
      const { borrowdate } = req.body;
      const { returndate } = req.body;
      const newBook = await pool.query(
        "INSERT INTO books (book_name,author,borrowedby,borrowdate,returndate) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [book_name,author,borrowedby,borrowdate,returndate]
        //"INSERT INTO students (last_name) VALUES($1) RETURNING *",
        //[last_name],
      );
  
      res.json(newBook.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//get all books
app.get("/books", async (req, res) => {
    try {
      const allBooks = await pool.query("SELECT * FROM books");
      res.json(allBooks.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
//get a book
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
      //const x=req.params.id;
      console.log(req.params.id)
      const book = await pool.query("SELECT * FROM books WHERE book_name = $1", [id]);
  
      res.json(book.rows[0]);
      //console.log(student.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

// //update a student
// app.put("/students/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { first_name } = req.body;
//       const { last_name } = req.body;
//       const updateStudent = await pool.query(
//         "UPDATE students SET first_name = $1, last_name =$2 WHERE student_id = $3",
//         [first_name, last_name,id]
//       );
  
//       res.json("Student was updated!");
//     } catch (err) {
//       console.error(err.message);
//     }
//   });


app.listen(5500,()=>{
    console.log('listening on port 5500')
})