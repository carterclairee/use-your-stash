--
-- Drop Tables
--

-- SET foreign_key_checks = 0;

-- First must drop junction table as it is child of yarn and patterns
DROP TABLE if exists yarn_patterns;
DROP TABLE if exists yarn;
DROP TABLE if exists patterns;
-- SET foreign_key_checks = 1;


-- Create Tables

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
    FOREIGN KEY (yarn_id) REFERENCES yarn(id) ON DELETE CASCADE,
    FOREIGN KEY (pattern_id) REFERENCES patterns(id) ON DELETE CASCADE
    );

-- Data to start with
INSERT INTO yarn (name, brand, weight, yardage, color, fiber_type)
VALUES 
    ('Eco Wool', 'KnitPicks', 'worsted', 260, 'brown', 'wool'),
    ('Grace', 'Pattons', 'dk', 900, 'purple', 'cotton'),
    ('CotLin', 'KnitPicks', 'dk', 1290, 'orange', 'cotton linen');

INSERT INTO patterns (name, brand, project_type, yardage_needed, yarn_weight, notes, difficulty)
VALUES
    ('Classic Tee', 'Darling Jadore', 'sweater', 760, 'dk', 'yardage for size medium', 'intermediate'),
    ('Tide Chart', 'Plucky Knitter', 'sweater', 1125, 'dk', 'yardage for 36 inch bust', 'intermediate'),
    ('Harvest', 'Tin Can Knits', 'cardigan', 250, 'worsted', 'yardage needed for 0-6 mos', 'beginner');

INSERT INTO yarn_patterns (yarn_id, pattern_id)
VALUES 
    (1, 3), (2, 1), (3, 1), (3, 2);

-- npm run migrate