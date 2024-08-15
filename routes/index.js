var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// Full url for the root is http://localhost:4000/api

// Create function to treat data for yarn and matching patterns
const treatYarnData = function (results) {
  const patternsArray = results.data.map((p) => ({
    pattern_id: p.pattern_id,
    pattern_name: p.pattern_name,
    pattern_brand: p.pattern_brand,
    project_type: p.project_type,
    yardage_needed: p.yardage_needed,
    notes: p.notes,
    difficulty: p.difficulty
  }));

  const y = results.data[0];
  
  return {
    yarn_id: y.yarn_id,
    yarn_name: y.yarn_name,
    yarn_brand: y.yarn_brand,
    weight: y.weight,
    yardage: y.yardage,
    color: y.color,
    fiber_type: y.fiber_type,
    matching_patterns: patternsArray
  };
};

// Create function to treat data for patterns and matching yarn
const treatPatternsData = function(results) {
  const yarnArray = results.data.map((y) => ({
    yarn_id: y.yarn_id,
    yarn_name: y.yarn_name,
    yarn_brand: y.yarn_brand,
    yardage: y.yardage,
    color: y.color,
    fiber_type: y.fiber_type
  }));

  const p = results.data[0];

  return {
    pattern_id: p.pattern_id,
    pattern_name: p.pattern_name,
    pattern_brand: p.pattern_brand,
    project_type: p.project_type,
    yardage_needed: p.yardage_needed,
    notes: p.notes,
    difficulty: p.difficulty,
    matching_yarn: yarnArray
  };
};

// GET all yarn
router.get("/yarn", async function (req, res, next) {
  try {
    const results = await db (
      "SELECT * FROM yarn ORDER BY name ASC;"
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET all patterns
router.get("/patterns", async function (req, res, next) {
  try {
    const results = await db (
      "SELECT * FROM patterns ORDER BY name ASC;"
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET a particular yarn and its matching patterns
router.get("/yarn/:id", async function (req, res, next) {
  try {
    const results = await db (
      `SELECT yp.yarn_id, y.name AS yarn_name, y.brand AS yarn_brand, y.weight, y.yardage, y.color, y.fiber_type,
      yp.pattern_id, p.name AS pattern_name, p.brand AS pattern_brand, p.project_type, p.yardage_needed, p.notes, p.difficulty   
      FROM yarn AS y 
      LEFT JOIN yarn_patterns AS yp ON y.id = yp.yarn_id 
      LEFT JOIN patterns AS p ON yp.pattern_id = p.id 
      WHERE y.id = ${req.params.id} AND y.yardage >= p.yardage_needed;` 
    );

    // Use the treatYarnData function to return more organized data
    const response = treatYarnData(results);

    // Send the response
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET a particular pattern and its matching yarns
router.get("/patterns/:id", async function (req, res, next) {
  try {
    const results = await db (
      `SELECT yp.pattern_id, p.name AS pattern_name, p.brand AS pattern_brand, p.project_type, p.yardage_needed, p.yarn_weight, p.notes, p.difficulty, yp.yarn_id, y.name AS yarn_name, y.brand AS yarn_brand, y.yardage, y.color, y.fiber_type   
      FROM patterns AS p 
      LEFT JOIN yarn_patterns AS yp ON p.id = yp.pattern_id 
      LEFT JOIN yarn AS y ON yp.yarn_id = y.id 
      WHERE p.id = ${req.params.id} AND y.yardage >= p.yardage_needed;` 
    );

    // treat the data to return more organized results
    const response = treatPatternsData(results);

    // Send the response
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST yarn and update the junction table
router.post("/yarn", async function(req, res, next) {
  const {name, brand, weight, yardage, color, fiber_type} = req.body;

  try {
    // Insert the new yarn
    await db(
      `INSERT INTO yarn (name, brand, weight, yardage, color, fiber_type) VALUES ("${name}", "${brand}", "${weight}", "${yardage}", "${color}", "${fiber_type}");`
    );

    // Get the most recently inserted yarn (the highest id since id is auto-incremented)
    const updatedList = await db(
      "SELECT * FROM yarn ORDER BY id DESC;"
    );

    const newYarnId = updatedList.data[0].id;

    // Update the junction table so yarns immediately can link to patterns. Update based on matching weights.
    await db(
      `INSERT INTO yarn_patterns (yarn_id, pattern_id)
      SELECT ${newYarnId}, id
      FROM patterns 
      WHERE yarn_weight = "${weight}";`
    );

    // Send the full, updated list back
    const results = await db(
      "SELECT * FROM yarn ORDER BY name ASC;"
    );

    // 201 message to show it was created
    res.status(201).send(results.data);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;
