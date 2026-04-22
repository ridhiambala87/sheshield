SheShield - Women's Safety Website
A multi-page women's safety awareness website built as a final semester college project using only HTML, CSS, and JavaScript (no frameworks).

Project Overview
SheShield is an educational web platform that empowers women with safety knowledge, emergency contacts, and a tool to report incidents. The website is fully responsive and works on desktop, tablet, and mobile browsers.

Features
6 fully working pages with smooth navigation
Form validation for contact and report forms
Dark mode toggle with preference saved in browser
Animated stats counter on the home page
Expandable safety tips with show/hide details
Emergency dial buttons that open the phone dialer on mobile
Incident report form that saves data in browser localStorage
Console logging of submitted reports for easy debugging
Responsive design for all screen sizes
Beginner-friendly commented code for easy learning
Project Structure
SheShield/
├── index.html              ← Home page
├── style.css               ← All shared styles
├── script.js               ← All shared JavaScript
├── tips.html               ← Safety Tips page
├── emergency.html          ← Emergency Contacts page
├── report.html             ← Report Incident page
├── about.html              ← About page
├── contact.html            ← Contact page
└── images/                 ← Folder with all images
    ├── home.png
    ├── tips.png
    ├── emergency.png
    ├── report.png
    ├── about.png
    └── contact.png

How to Run
Option 1: Direct Browser
Download all files into one folder
Double-click index.html to open in browser
Option 2: VS Code with Live Server (Recommended)
Open the project folder in VS Code
Install the Live Server extension
Right-click on index.html → Open with Live Server
The website opens automatically in your browser
Live Server is recommended because it allows localStorage to work properly.

Design
Color Palette: Purple (#6a0dad), Pink (#ff69b4), White
Font: System default (Segoe UI / Arial)
Layout: CSS Grid and Flexbox
Theme: Light mode (default) and Dark mode
JavaScript Concepts Used
This project demonstrates many core JavaScript concepts:

Concept	Where Used
Variables (var, let, const)	Throughout script.js
Functions	All pages
Arrays	Reports list, emergency contacts
Objects	Each report and contact
Loops (for, forEach)	Displaying reports and tips
DOM Manipulation	Updating page content dynamically
addEventListener	Buttons, forms, hamburger menu
Form Validation	Report and Contact forms
Alerts and confirms	User feedback
localStorage	Saving reports and dark mode
JSON.parse / JSON.stringify	Storing arrays of objects
Conditional statements	Validation logic
String methods	Email validation
setInterval / setTimeout	Animated counter
Console.log / console.table	Debugging report submissions
Pages
Home (index.html) — Welcome banner, mission, animated stats, awareness section
Safety Tips (tips.html) — Categorized tips with expandable details
Emergency Contacts (emergency.html) — Important helpline numbers with click-to-dial
Report Incident (report.html) — Form to report incidents (saved in browser)
About (about.html) — Project info and team section
Contact (contact.html) — Contact form and FAQ section
Dark Mode
Click the Dark Mode button in the navbar to toggle between light and dark themes. Your choice is saved in localStorage and remembered the next time you open the site.

Report Incident Form
Fill the form and click Submit Report
The report is saved in your browser's localStorage
All past reports appear in the table below the form
Press F12 → Console tab to see report data printed
Click Clear All Reports to delete all saved reports
Technologies Used
HTML5 — Page structure
CSS3 — Styling, Flexbox, Grid, Variables, Transitions
JavaScript (ES5/ES6) — All interactivity and logic
localStorage API — Browser-based data storage
JSON — Data format for storage
Project Information
Project Title: SheShield - Women's Safety Website
Type: Final Semester Viva Project
Course: Bachelor of Computer Science (BCA / B.Tech / BSc)
Year: 2025
Frameworks: None (pure HTML, CSS, JS)
What I Learned
Building multi-page websites with shared CSS and JS files
Form validation using JavaScript
Working with localStorage to persist user data
DOM manipulation and event handling
Responsive design using CSS Grid and Flexbox
Theme toggling and saving user preferences
Working with JSON data structures
Acknowledgements
This project was created for educational purposes to spread awareness about women's safety. Thanks to the resources and tutorials that made this possible.

Important Helplines (India)
Women Helpline: 1091
Police: 100
Ambulance: 102
National Emergency: 112
Made with 💜 for women's safety awareness
