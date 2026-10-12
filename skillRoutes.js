const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController');

// /api/skills
router.route('/')
  .get(getSkills)
  .post(createSkill);

// /api/skills/:id
router.route('/:id')
  .get(getSkillById)
  .put(updateSkill)
  .delete(deleteSkill);

module.exports = router;
