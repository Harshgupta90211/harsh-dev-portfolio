import re
def verify_portfolio():
    live_demo = "https://harshgupta90211.github.io/Student_Toolkit/"
    github_repo = "https://github.com/Harshgupta90211/Student_Toolkit"
    print("Checking portfolio/index.html...")
    with open("C:/Users/ww/.gemini/antigravity/scratch/portfolio/index.html", "r", encoding="utf-8") as f:
        html = f.read()
    assert live_demo in html, "Live demo link missing in index.html"
    assert github_repo in html, "GitHub repo link missing in index.html"
    assert 'href="https://harshgupta90211.github.io/Student_Toolkit/" class="btn btn-sm btn-primary live-demo-btn" target="_blank" rel="noopener noreferrer"' in html
    assert 'href="https://github.com/Harshgupta90211/Student_Toolkit" class="btn btn-sm btn-secondary" target="_blank" rel="noopener noreferrer"' in html
    print("index.html: Verified correctly with target='_blank' and rel='noopener noreferrer'.")
    print("\nChecking portfolio/backend/data/projects.js...")
    with open("C:/Users/ww/.gemini/antigravity/scratch/portfolio/backend/data/projects.js", "r", encoding="utf-8") as f:
        backend_js = f.read()
    assert f'liveDemoUrl: "{live_demo}"' in backend_js, "liveDemoUrl mismatch in backend/data/projects.js"
    assert f'githubUrl: "{github_repo}"' in backend_js, "githubUrl mismatch in backend/data/projects.js"
    print("backend/data/projects.js: Verified correctly with updated liveDemoUrl and githubUrl.")
    print("\nChecking portfolio/frontend/src/components/Projects.jsx...")
    with open("C:/Users/ww/.gemini/antigravity/scratch/portfolio/frontend/src/components/Projects.jsx", "r", encoding="utf-8") as f:
        jsx = f.read()
    assert 'href={project.liveDemoUrl}' in jsx, "href={project.liveDemoUrl} missing in Projects.jsx"
    assert 'href={project.githubUrl}' in jsx, "href={project.githubUrl} missing in Projects.jsx"
    assert 'target="_blank"' in jsx
    assert 'rel="noopener noreferrer"' in jsx
    print("Projects.jsx: Verified correctly with dynamic link bindings.")
    print("\nSUCCESS: All portfolio files verified!")
if __name__ == "__main__":
    verify_portfolio()
