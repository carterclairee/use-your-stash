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

    const yarnName = await db (
      `SELECT name FROM yarn WHERE id = ${req.params.id};`
    );

    if (!results.data.length) {
      return res.send({
        message: "No patterns in the library match this yarn.",
        name: yarnName.data[0].name
      })
    }
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

// POST yarn and update the junction table. I decided to update the yarn_pattern table at the same time as posting so that the matching patterns would be immediately available, but I'm not sure if this is the most efficient method.
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

    // Check if there are any matching patterns
    const matchingPatterns = await db(
        `SELECT id FROM patterns WHERE yarn_weight = "${weight}";`
    );

    if (matchingPatterns.data.length > 0) {
    await db(
      `INSERT INTO yarn_patterns (yarn_id, pattern_id)
      SELECT ${newYarnId}, id
      FROM patterns 
      WHERE yarn_weight = "${weight}";`
    )};

    // Send the full, updated list back
    const results = await db(
      "SELECT * FROM yarn ORDER BY name ASC;"
    );

    // 201 message to show it was created
    res.status(201).send(results.data);

  } catch (error) {
    console.error("Error details:", error);
    res.status(500).send({ error: error.message });
}
});

// POST pattern and update the junction table with matching yarns
router.post("/patterns", async function(req, res, next) {
  const {name, brand, project_type, yardage_needed, yarn_weight, notes, difficulty} = req.body;

  try {
    // Insert the new pattern
    await db(
      `INSERT INTO patterns (name, brand, project_type, yardage_needed, yarn_weight, notes, difficulty) VALUES ("${name}", "${brand}", "${project_type}", "${yardage_needed}", "${yarn_weight}", "${notes}", "${difficulty}");`
    );

    // Get the most recently inserted pattern (the highest id since id is auto-incremented)
    const updatedList = await db(
      "SELECT * FROM patterns ORDER BY id DESC;"
    );

    const newPatternId = updatedList.data[0].id;

    // Check if there are any matching yarns
    const matchingYarn = await db(
      `SELECT id FROM yarn WHERE weight = "${yarn_weight}";`
    );

    // Update the junction table based on matching weights IF there are matching yarns
    if (matchingYarn.data.length > 0) {
    await db(
      `INSERT INTO yarn_patterns (yarn_id, pattern_id)
      SELECT id, ${newPatternId}
      FROM yarn 
      WHERE weight = "${yarn_weight}";`
    );
    };

    // Send the full, updated list back
    const results = await db(
      "SELECT * FROM patterns ORDER BY name ASC;"
    );

    // 201 message to show it was created
    res.status(201).send(results.data);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE yarn
router.delete("/yarn/:id", async function (req, res, next) {
  const {id} = req.params;
  try {
    // Need to first delete yarn from the junction table
    // Check if the yarn exists in the junction table
    const yarnExists = await db(`SELECT yarn_id FROM yarn_patterns WHERE yarn_id = ${id};`);

    // If it exists, delete records
    if (yarnExists.data.length) {
      await db(`DELETE from yarn_patterns WHERE yarn_id = ${id};`);
    }

    // Now delete from the yarn table
    await db(`DELETE from yarn WHERE id = ${id};`);
    // Send updated list back
    const results = await db("SELECT * FROM yarn ORDER BY name ASC;"
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
});

// DELETE pattern
router.delete("/patterns/:id", async function (req, res, next) {
  const {id} = req.params;
  try {
    // Need to first delete from the junction table
    // Check if the pattern exists in the junction table
    const patternExists = await db(`SELECT pattern_id FROM yarn_patterns WHERE pattern_id = ${id};`);

    // If it exists, delete records
    if (patternExists.data.length) {
      await db(`DELETE from yarn_patterns WHERE pattern_id = ${id};`);
    }

    // Now delete from the pattern table
    await db(`DELETE from patterns WHERE id = ${id};`);
    // Send updated list back
    const results = await db("SELECT * FROM patterns ORDER BY name ASC;"
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// I'd like to use the PUTs below, but I'm having a hard time getting the yarn yardage one to work. The UPDATE works if the DELETE is commented out, and vice versa, but they don't work at the same time. I spent too much time trying to get them to work, so I'm just going to move on to the front end and figure them out someday.

// // PUT a new yardage to yarn; don't want user to change anything other than yardage
// router.put("/yarn/:id", async function (req, res, next) {
//   const {id} = req.params;
//   const {yardage} = req.body;

//   // This is more of a patch instead of a put, but I'm not as familiar with that one so I will maybe refactor later when I have time
//   try {
//     await db(`UPDATE yarn SET yardage = "${yardage}" WHERE id = "${id}";`);

//     // Add to the yarns_pattern table, if needed, based on new yardage
//     // AND NOT EXISTS only returns true if there are no matching records already in the yarn_patterns table. If it returns FALSE, the insert will not execute

//     // Check if there are patterns to add
//     const patternsToAdd = await db(
//       `SELECT p.id from patterns AS p
//       WHERE p.yardage_needed <= "${yardage}"
//       AND NOT EXISTS (
//         SELECT 1 FROM yarn_patterns AS yp
//         WHERE yp.yarn_id = ${id} AND yp.pattern_id = p.id);`
//     );

//     // Add patterns only if there are some that need to be added
//     if (patternsToAdd.data.length > 0) {
//       await db(
//         `INSERT INTO yarn_patterns (yarn_id, pattern_id)
//         SELECT ${id}, p.id
//         FROM patterns AS p
//         WHERE p.yardage_needed <= 
//           (SELECT yardage FROM yarn WHERE id = ${id})
//         AND NOT EXISTS (
//           SELECT 1 FROM yarn_patterns AS yp
//           WHERE yp.yarn_id = ${id} AND yp.pattern_id = p.id);`
//       );
//     };

//     // Delete from the yarns_pattern table, if needed, based on new yardage
//     const patternsToDelete = await db(
//       `SELECT p.id FROM patterns AS p WHERE p.yardage_needed > "${yardage}";`
//     );

//     if (patternsToDelete.data.length > 0) {
//       await db(
//         `DELETE FROM yarn_patterns
//         WHERE yarn_id = ${id}
//         AND pattern_id IN (
//           SELECT p.id FROM patterns AS p
//           WHERE p.yardage_needed > 
//             (SELECT yardage FROM yarn WHERE id = ${id}));`
//       );
//     };
    
//     // Send updated list of yarns back
//     const results = await db("SELECT * FROM yarn ORDER BY name ASC;"
//     );
//     res.send(results.data);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
// }
// });

// // PUT new notes to a pattern; don't want user to change anything else
// router.put("/patterns/:id", async function (req, res, next) {
//   const {id} = req.params;
//   const {notes} = req.body;

//   // This is more of a patch instead of a put, but I'm not as familiar with that one so I will maybe refactor later when I have time
//   try {
//     await db(`UPDATE patterns SET notes = "${notes}" WHERE id = "${id}";`);
    
//     // Send updated list back
//     const results = await db("SELECT * FROM patterns ORDER BY name ASC;"
//     );
//     res.send(results.data);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
// }
// });

module.exports = router;
