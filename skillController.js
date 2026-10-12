const skills = require('../data/skills');

/**
 * @desc    Get all skills
 * @route   GET /api/skills
 * @access  Public
 */
const getSkills = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single skill category by ID
 * @route   GET /api/skills/:id
 * @access  Public
 */
const getSkillById = (req, res, next) => {
  try {
    const skillId = parseInt(req.params.id, 10);

    if (isNaN(skillId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID format. ID must be an integer.'
      });
    }

    const skill = skills.find((s) => s.id === skillId);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: `Skill category with ID ${skillId} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new skill category
 * @route   POST /api/skills
 * @access  Public
 */
const createSkill = (req, res, next) => {
  try {
    const { category, icon, description, items } = req.body;

    if (!category || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide category name and a non-empty items array.'
      });
    }

    const nextId = skills.length > 0 ? Math.max(...skills.map((s) => s.id)) + 1 : 1;

    const newSkill = {
      id: nextId,
      category: category.trim(),
      icon: icon || '⚡',
      description: description ? description.trim() : '',
      items
    };

    skills.push(newSkill);

    res.status(201).json({
      success: true,
      message: 'Skill category created successfully.',
      data: newSkill
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a skill category by ID
 * @route   PUT /api/skills/:id
 * @access  Public
 */
const updateSkill = (req, res, next) => {
  try {
    const skillId = parseInt(req.params.id, 10);

    if (isNaN(skillId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID format. ID must be an integer.'
      });
    }

    const index = skills.findIndex((s) => s.id === skillId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Skill category with ID ${skillId} not found.`
      });
    }

    const { category, icon, description, items } = req.body;

    if (category !== undefined) skills[index].category = category.trim();
    if (icon !== undefined) skills[index].icon = icon;
    if (description !== undefined) skills[index].description = description.trim();
    if (items !== undefined && Array.isArray(items)) {
      skills[index].items = items;
    }

    res.status(200).json({
      success: true,
      message: 'Skill category updated successfully.',
      data: skills[index]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a skill category by ID
 * @route   DELETE /api/skills/:id
 * @access  Public
 */
const deleteSkill = (req, res, next) => {
  try {
    const skillId = parseInt(req.params.id, 10);

    if (isNaN(skillId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID format. ID must be an integer.'
      });
    }

    const index = skills.findIndex((s) => s.id === skillId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Skill category with ID ${skillId} not found.`
      });
    }

    const [deletedSkill] = skills.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Skill category deleted successfully.',
      data: deletedSkill
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};
