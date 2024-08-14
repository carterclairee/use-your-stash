--
-- Drop Tables
--

-- SET foreign_key_checks = 0;
-- CHANGE THESE TO MATCH TABLES BELOW FROM DRAW SQL
-- First must drop junction table as it is child of yarn and patterns
DROP TABLE if exists yarn_patterns;
DROP TABLE if exists yarn;
DROP TABLE if exists patterns;
-- SET foreign_key_checks = 1;

--
-- Create Tables
--
-- CHANGE THESE WITH DRAW SQL CODE
CREATE TABLE yarn (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) not null, 
    brand VARCHAR(255) not null, 
    weight VARCHAR(255) not null, 
    yardage BIGINT not null, 
    color VARCHAR(255) not null, 
    fiber_type VARCHAR(255) not null
    );

CREATE TABLE patterns (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) not null, 
    brand VARCHAR(255) not null, 
    project_type VARCHAR(255) NOT NULL,
    yardage_needed BIGINT NOT NULL,
    yarn_weight VARCHAR(255) NOT NULL,
    notes VARCHAR(255) NULL,
    difficulty VARCHAR(255) NULL
    );

CREATE TABLE yarn_patterns (
    yarn_id INT NOT NULL,
    pattern_id INT NOT NULL,
    FOREIGN KEY (yarn_id) REFERENCES yarn(id),
    FOREIGN KEY (pattern_id) REFERENCES patterns(id)
    );

-- npm run migrate after doing all of this