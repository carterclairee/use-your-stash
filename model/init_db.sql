--
-- Drop Tables
--

-- SET foreign_key_checks = 0;
-- CHANGE THESE TO MATCH TABLES BELOW FROM DRAW SQL
DROP TABLE if exists students;
-- SET foreign_key_checks = 1;

--
-- Create Tables
--
-- CHANGE THESE WITH DRAW SQL CODE
CREATE TABLE students(
    id INT NOT NULL AUTO_INCREMENT, 
    firstname VARCHAR(40) not null, 
    lastname VARCHAR(40) not null, 
    PRIMARY KEY (id)
    );

-- npm run migrate after doing all of this