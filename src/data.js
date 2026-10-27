export const LINKS = { github: 'https://github.com/kashyapsharma07', linkedin: 'https://linkedin.com/in/kashyapsharma01', email: 'kashyaps1304@gmail.com', resume: '/Kashyap_Sharma_Resume.pdf' }
export const chapters = ['AI Systems', 'Full-stack Applications', 'Security & Automation', 'Computer Vision']
export const projects = [
  {
    cat: 'RAG AI Platform', title: 'Multi-Department Institutional AI Chatbots', kind: 'chat',
    desc: 'Three tailored AI chatbots for engineering, commerce, and pharmaceutical institutes, designed to answer admissions, fees, lab, and academic-policy questions.',
    tags: ['Python', 'Flask', 'React 19', 'Vite', 'RAG', 'Gemini API', 'Groq API', 'SSE', 'Web Speech API'],
    results: ['Indexed 160+ knowledge-base topics', 'Built Gemini-to-Groq automated failover', 'Delivered sub-second query responses', 'Added voice input/output, quick FAQ chips, feedback, and a mobile-first UI', 'Reduced administrative inquiries by 70%'],
    study: 'Each institute (CKPCET, CKPCMC, CKPIPSR) has its own knowledge base. Answers stream to the React UI over Server-Sent Events. Gemini is the primary model; if it fails, requests fail over automatically to Groq. Retrieval and generation latency are logged as structured JSON.'
  },
  {
    cat: 'Computer Vision', title: 'AI-Powered CCTV Surveillance for Industrial Safety', kind: 'cctv',
    desc: 'Real-time industrial safety monitoring using CCTV footage and YOLOv8 to detect helmets, safety vests, and people in hazardous zones.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit'],
    results: ['Achieved 92% mAP', 'Built live video processing and annotated detection views', 'Added automated alerts and compliance analytics', 'Reduced manual safety audits by 70%'],
    study: 'Built during the Intel AI for Manufacturing program. A YOLOv8 model detects helmets, vests and personnel; a Streamlit dashboard shows annotated frames, raises alerts for supervisors and summarises compliance.'
  },
  {
    cat: 'Full-stack Web Application', title: 'Job Application Tracker', kind: 'dash',
    desc: 'A role-based application tracking platform that helps users organize job applications, reminders, résumés, and performance analytics.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'JWT', '2FA', 'PHPMailer', 'Cron Jobs', 'Google Drive'],
    results: ['Role-based access for Superadmin, Admin, and User', 'JWT authentication and two-factor authentication', 'Password reset flows and secure email handling', 'Automated backups and reminders', 'Analytics for applications, companies, timelines, and success rates'],
    study: 'A relational MySQL schema covers applications, résumés and reminders. Cron jobs send email reminders and back up the database to Google Drive. The dashboard charts status, company-wise results and timelines.'
  }]
export const skills = [
  ['AI & Machine Learning', 'RAG, Gemini API, Groq API, NLP, Sentence Transformers, Vector Search, YOLOv8, OpenCV, Scikit-learn, Streamlit'],
  ['Frontend', 'React 19, Vite, JavaScript, HTML, CSS, Responsive Design, AJAX, Web Speech API'],
  ['Backend', 'Python, Flask, PHP, Laravel, REST APIs, JWT, RBAC, 2FA, PHPMailer, Cron Jobs'],
  ['Data', 'MySQL, SQLite, SQL, JSON, Database design'],
  ['Tools', 'Git, GitHub, Postman, Linux, VS Code, Jupyter Notebook, Gunicorn, Render']]
export const timeline = [
  { t: 'AI for Manufacturing', o: 'Intel Corporation and Gujarat Technological University', d: 'Apr 2025 – Jul 2025', p: ['Completed a 16-week AI program', 'Developed a YOLOv8 CCTV safety compliance system', 'Worked with computer vision pipelines and deployment concepts'] },
  { t: 'PHP Developer Internship', o: 'Jemistry Info Solutions LLP', d: 'Jan 2026 – May 2026', p: ['Developed full-stack PHP 8 and MySQL applications', 'Implemented RBAC, JWT authorization, 2FA, password reset, REST APIs, AJAX, and automated backups', 'Contributed to resolving 10+ security vulnerabilities'] },
  { t: 'Bachelor of Engineering, Computer Engineering', o: 'Gujarat Technological University', d: 'Sept 2022 – May 2026', p: ['CGPA: 8.50 / 10.00'] }]
