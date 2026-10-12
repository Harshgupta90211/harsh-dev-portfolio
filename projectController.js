const projects = require('../data/projects');

 public
const getProjects = (req, res, next) => {
  try {
    const { category } = req.query;

    if (category && category.toLowerCase() !== 'all') {
      const filtered = projects.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return res.status(200).json({
        success: true,
        count: filtered.length,
        data: filtered
      });
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

 
const getProjectById = (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id, 10);

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format. ID must be an integer.'
      });
    }

    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${projectId} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

 
const createProject = (req, res, next) => {
  try {
    const { title, category, description, technologies, liveDemoUrl, githubUrl } = req.body;

    // Validation
    if (!title || !description || !technologies) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields: title, description, and technologies.'
      });
    }

    if (!Array.isArray(technologies) || technologies.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Technologies must be a non-empty array of strings.'
      });
    }

    // Auto-generate next sequential ID
    const nextId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

    const newProject = {
      id: nextId,
      title: title.trim(),
      category: category ? category.trim() : 'General',
      description: description.trim(),
      technologies,
      liveDemoUrl: liveDemoUrl || '#',
      githubUrl: githubUrl || '#',
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject
    });
  } catch (error) {
    next(error);
  }
};

 
const updateProject = (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id, 10);

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format. ID must be an integer.'
      });
    }

    const index = projects.findIndex((p) => p.id === projectId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${projectId} not found.`
      });
    }

    const { title, category, description, technologies, liveDemoUrl, githubUrl } = req.body;

    // Partial update: only update fields provided in request body
    if (title !== undefined) projects[index].title = title.trim();
    if (category !== undefined) projects[index].category = category.trim();
    if (description !== undefined) projects[index].description = description.trim();
    if (technologies !== undefined && Array.isArray(technologies)) {
      projects[index].technologies = technologies;
    }
    if (liveDemoUrl !== undefined) projects[index].liveDemoUrl = liveDemoUrl;
    if (githubUrl !== undefined) projects[index].githubUrl = githubUrl;

    projects[index].updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: projects[index]
    });
  } catch (error) {
    next(error);
  }
};

 
const deleteProject = (req, res, next) => {
  try {
    const projectId = parseInt(req.params.id, 10);

    if (isNaN(projectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid project ID format. ID must be an integer.'
      });
    }

    const index = projects.findIndex((p) => p.id === projectId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${projectId} not found.`
      });
    }

    const [deletedProject] = projects.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
      data: deletedProject
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
