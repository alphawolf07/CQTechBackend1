CREATE DATABASE students;

CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

ALTER TABLE students
ADD COLUMN first_name VARCHAR(255);
ALTER TABLE students
ADD COLUMN last_name VARCHAR(255);

ALTER TABLE students 
DROP COLUMN description;

DELETE FROM students
WHERE student_id=1;

CREATE DATABASE books;

CREATE TABLE books(
    book_name SERIAL PRIMARY KEY,
    author VARCHAR(255),
    borrowedby VARCHAR(255),
    borrowdate VARCHAR(255),
    returndate VARCHAR(255)
);

