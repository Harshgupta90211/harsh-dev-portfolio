 /**
 * Centralized API Service for communicating with the Express Backend
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all projects (with optional category filter)
 * GET /api/projects
 */
export const fetchProjects = async (category = 'All') => {
  try {
    const url = category && category !== 'All'
      ? `${API_BASE_URL}/projects?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/projects`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch projects (Status: ${response.status})`);
    }

    return data.data;
  } catch (error) {
    console.error('API Error in fetchProjects:', error);
    throw error;
  }
};

/**
 * Fetch all skills categorized
 * GET /api/skills
 */
export const fetchSkills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch skills (Status: ${response.status})`);
    }

    return data.data;
  } catch (error) {
    console.error('API Error in fetchSkills:', error);
    throw error;
  }
};

/**
 * Send contact form message to Formspree
 * POST https://formspree.io/f/xyekjodw
 */
export const sendContactMessage = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/xyekjodw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.errors && data.errors.length > 0
        ? data.errors.map((e) => (e.field ? `${e.field.charAt(0).toUpperCase() + e.field.slice(1)}: ` : '') + e.message).join(', ')
        : (data.message || 'Failed to submit contact message.');
      throw new Error(errorMsg);
    }

    return {
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      ...data,
    };
  } catch (error) {
    console.error('Error in sendContactMessage:', error);
    throw error;
  }
};
