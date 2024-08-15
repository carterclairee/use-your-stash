var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// Full url for the root is http://localhost:4000/api

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

    // treat the data
    const patternsArray = [];
    for (let p of results.data) {
      patternsArray.push({
        pattern_id: p.pattern_id,
        pattern_name: p.pattern_name,
        pattern_brand: p.pattern_brand,
        project_type: p.project_type,
        yardage_needed: p.yardage_needed,
        notes: p.notes,
        difficulty: p.difficulty
      });
    }

    const y = results.data[0];
    const response = {
      yarn_id: y.yarn_id,
      yarn_name: y.yarn_name,
      yarn_brand: y.yarn_brand,
      weight: y.weight,
      yardage: y.yardage,
      color: y.color,
      fiber_type: y.fiber_type,
      matching_patterns: patternsArray
    };

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

    // treat the data
    const yarnArray = [];
    for (let y of results.data) {
      yarnArray.push({
        yarn_id: y.yarn_id,
        yarn_name: y.yarn_name,
        yarn_brand: y.yarn_brand,
        yardage: y.yardage,
        color: y.color,
        fiber_type: y.fiber_type,
      });
    }

    const p = results.data[0];
    const response = {
      pattern_id: p.pattern_id,
      pattern_name: p.pattern_name,
      pattern_brand: p.pattern_brand,
      project_type: p.project_type,
      yardage_needed: p.yardage_needed,
      notes: p.notes,
      difficulty: p.difficulty,
      matching_yarn: yarnArray
    };

    // Send the response
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST yarn


module.exports = router;
