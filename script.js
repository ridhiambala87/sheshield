/* ===========================================
   SheShield - Common JavaScript File
   Purpose: Shared JS for all pages
   Features covered:
     - Functions
     - Arrays & Objects
     - Loops
     - DOM Manipulation
     - addEventListener
     - JSON.parse / JSON.stringify
     - localStorage
     - Form validation
     - Alert messages
     - Button click events
     - Dark mode toggle
   =========================================== */

// =============================================
// 0. AUTHENTICATION — Login / Logout / Auth Check
//    Users stored in localStorage key: "ssUsers"
//    Current session: "ssCurrentUser"
// =============================================

/* Check if user is logged in — redirect to login if not */
function checkAuth() {
  var user = localStorage.getItem("ssCurrentUser");
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return JSON.parse(user);
}

/* Logout — clear session and go to login page */
function ssLogout() {
  if (confirm("Are you sure you want to logout?")) {
    console.log("SHESHIELD — User logged out:", new Date().toLocaleString());
    localStorage.removeItem("ssCurrentUser");
    window.location.href = "login.html";
  }
}

/* Show the logged-in user's name in the navbar */
function setupNavUserName() {
  var pill = document.getElementById("navUserName");
  if (!pill) return;
  var user = JSON.parse(localStorage.getItem("ssCurrentUser"));
  if (user) {
    pill.textContent = "👤 " + user.name;
  }
}

// =============================================
// 1. DARK MODE TOGGLE
//    Uses localStorage to remember preference
// =============================================

/* Function to apply dark mode based on saved value */
function applyDarkMode() {
  var saved = localStorage.getItem("darkMode"); // Get saved preference
  if (saved === "true") {
    document.body.classList.add("dark-mode");
    updateToggleText(true);
  } else {
    document.body.classList.remove("dark-mode");
    updateToggleText(false);
  }
}

/* Update the button text based on current mode */
function updateToggleText(isDark) {
  var btn = document.getElementById("darkToggleBtn");
  if (btn) {
    btn.textContent = isDark ? "☀ Light Mode" : "🌙 Dark Mode";
  }
}

/* Toggle dark mode on button click */
function toggleDarkMode() {
  var isDark = document.body.classList.toggle("dark-mode"); // Toggle class
  localStorage.setItem("darkMode", isDark); // Save to localStorage
  updateToggleText(isDark);
}

// =============================================
// 2. NAVBAR - Hamburger Menu (Mobile)
// =============================================

function toggleNavMenu() {
  var navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("open"); // Show or hide nav on mobile
  }
}

// =============================================
// 3. ACTIVE NAV LINK HIGHLIGHT
//    Loops through links, marks the current page
// =============================================

function setActiveNavLink() {
  var currentPage = window.location.pathname.split("/").pop(); // Get file name
  var links = document.querySelectorAll(".nav-links a"); // Get all nav links

  // Loop through each link and check if it matches current page
  for (var i = 0; i < links.length; i++) {
    var linkHref = links[i].getAttribute("href");
    if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
      links[i].classList.add("active"); // Add active class
    }
  }
}

// =============================================
// 4. FORM VALIDATION HELPER FUNCTIONS
//    Used on Contact and Report pages
// =============================================

/* Show an error message under a field */
function showError(fieldId, message) {
  var field = document.getElementById(fieldId);
  var errorEl = document.getElementById(fieldId + "Error");
  if (field) field.style.borderColor = "red";
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
  }
}

/* Clear error from a field */
function clearError(fieldId) {
  var field = document.getElementById(fieldId);
  var errorEl = document.getElementById(fieldId + "Error");
  if (field) field.style.borderColor = "";
  if (errorEl) {
    errorEl.textContent = "";
    errorEl.style.display = "none";
  }
}

/* Validate that a field is not empty */
function isNotEmpty(value) {
  return value.trim() !== ""; // Returns true if not empty
}

/* Validate email format using simple check */
function isValidEmail(email) {
  return email.includes("@") && email.includes("."); // Basic email check
}

/* Validate phone number (must be digits only, 10 chars) */
function isValidPhone(phone) {
  var digits = phone.replace(/\D/g, ""); // Remove non-digits
  return digits.length >= 10;
}

// =============================================
// 5. SHOW ALERT BOX (inline alert message)
// =============================================

/* Show a success or error alert inside the page */
function showAlert(elementId, message, type) {
  var alertEl = document.getElementById(elementId);
  if (alertEl) {
    alertEl.textContent = message;
    alertEl.className = "alert-box " + type; // success or error
    alertEl.style.display = "block";

    // Automatically hide the alert after 4 seconds
    setTimeout(function () {
      alertEl.style.display = "none";
    }, 4000);
  }
}

// =============================================
// 6. CONTACT FORM - Validation & Submission
// =============================================

function setupContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return; // Exit if form not on this page

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop normal form submit

    var isValid = true;

    // Get field values
    var name = document.getElementById("contactName").value;
    var email = document.getElementById("contactEmail").value;
    var subject = document.getElementById("contactSubject").value;
    var message = document.getElementById("contactMessage").value;

    // Clear all previous errors
    clearError("contactName");
    clearError("contactEmail");
    clearError("contactSubject");
    clearError("contactMessage");

    // Validate Name
    if (!isNotEmpty(name)) {
      showError("contactName", "Name is required.");
      isValid = false;
    }

    // Validate Email
    if (!isNotEmpty(email)) {
      showError("contactEmail", "Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("contactEmail", "Please enter a valid email address.");
      isValid = false;
    }

    // Validate Subject
    if (!isNotEmpty(subject)) {
      showError("contactSubject", "Subject is required.");
      isValid = false;
    }

    // Validate Message
    if (!isNotEmpty(message)) {
      showError("contactMessage", "Message cannot be empty.");
      isValid = false;
    } else if (message.length < 10) {
      showError("contactMessage", "Message must be at least 10 characters.");
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      showAlert("contactAlert", "✓ Thank you! Your message has been sent successfully.", "success");
      form.reset(); // Clear the form
    } else {
      showAlert("contactAlert", "✗ Please fix the errors above and try again.", "error");
    }
  });
}

// =============================================
// 7. REPORT INCIDENT FORM
//    Saves reports to localStorage as JSON array
// =============================================

// Array to store all reports (loaded from localStorage)
var savedReports = [];

/* Load existing reports from localStorage */
function loadReports() {
  var data = localStorage.getItem("sheshieldReports"); // Get saved data
  if (data) {
    savedReports = JSON.parse(data); // Parse JSON string to array
  } else {
    savedReports = []; // Empty array if no data
  }
}

/* Save reports array to localStorage */
function saveReports() {
  var jsonString = JSON.stringify(savedReports); // Convert array to JSON string
  localStorage.setItem("sheshieldReports", jsonString); // Store in localStorage
}

/* Display saved reports in the table */
function displayReports() {
  var tbody = document.getElementById("reportsBody");
  if (!tbody) return;

  tbody.innerHTML = ""; // Clear existing rows

  // If no reports, show a message
  if (savedReports.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#999;">No reports submitted yet.</td></tr>';
    return;
  }

  // Loop through each report and create a table row
  for (var i = 0; i < savedReports.length; i++) {
    var report = savedReports[i]; // Each report is an object
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + report.date + "</td>" +
      "<td>" + report.type + "</td>" +
      "<td>" + report.location + "</td>" +
      "<td>" + report.status + "</td>";
    tbody.appendChild(row); // Add row to table body
  }
}

/* Setup the Report Incident form */
function setupReportForm() {
  var form = document.getElementById("reportForm");
  if (!form) return; // Exit if not on this page

  loadReports();    // Load any existing reports
  displayReports(); // Show them in the table

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var isValid = true;

    // Get field values
    var name = document.getElementById("reportName").value;
    var incidentType = document.getElementById("reportType").value;
    var location = document.getElementById("reportLocation").value;
    var description = document.getElementById("reportDesc").value;

    // Clear old errors
    clearError("reportName");
    clearError("reportType");
    clearError("reportLocation");
    clearError("reportDesc");

    // Validate fields
    if (!isNotEmpty(name)) {
      showError("reportName", "Your name is required.");
      isValid = false;
    }

    if (incidentType === "") {
      showError("reportType", "Please select an incident type.");
      isValid = false;
    }

    if (!isNotEmpty(location)) {
      showError("reportLocation", "Location is required.");
      isValid = false;
    }

    if (!isNotEmpty(description)) {
      showError("reportDesc", "Description is required.");
      isValid = false;
    } else if (description.length < 15) {
      showError("reportDesc", "Please provide more detail (at least 15 characters).");
      isValid = false;
    }

    // If valid, create a new report object and save it
    if (isValid) {
      var today = new Date();
      var dateStr = today.toLocaleDateString("en-IN"); // Format date

      // Create a report object with fields
      var newReport = {
        date: dateStr,
        name: name,
        type: incidentType,
        location: location,
        description: description,
        status: "Submitted"
      };

      savedReports.push(newReport); // Add to array
      saveReports(); // Save to localStorage
      displayReports(); // Update the table

      // Show the newly submitted report in console
      console.log("--- New Report Submitted ---");
      console.log("Report Object:", newReport);
      console.log("All Reports So Far:", savedReports);
      console.table(savedReports);

      showAlert("reportAlert", "✓ Your report has been submitted and saved successfully!", "success");
      form.reset(); // Clear form
    } else {
      showAlert("reportAlert", "✗ Please fix the errors above.", "error");
    }
  });

  // Clear all saved reports button
  var clearBtn = document.getElementById("clearReportsBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      var confirmed = confirm("Are you sure you want to delete all saved reports?");
      if (confirmed) {
        savedReports = []; // Empty the array
        saveReports();     // Update localStorage
        displayReports();  // Refresh table
        alert("All reports have been cleared.");
      }
    });
  }
}

// =============================================
// 8. TIPS PAGE - Show/Hide Tip Details
// =============================================

function setupTipsToggle() {
  var toggleButtons = document.querySelectorAll(".tip-toggle-btn");

  // Add click event to each toggle button using a loop
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener("click", function () {
      var targetId = this.getAttribute("data-target"); // Get target div id
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Toggle visibility
        if (targetEl.style.display === "none" || targetEl.style.display === "") {
          targetEl.style.display = "block";
          this.textContent = "Hide ▲";
        } else {
          targetEl.style.display = "none";
          this.textContent = "Read More ▼";
        }
      }
    });
  }
}

// =============================================
// 9. EMERGENCY CONTACTS - Quick Dial Alert
// =============================================

function setupEmergencyButtons() {
  var dialButtons = document.querySelectorAll(".dial-btn");

  // Loop and add click event to each dial button
  for (var i = 0; i < dialButtons.length; i++) {
    dialButtons[i].addEventListener("click", function () {
      var number = this.getAttribute("data-number");
      var name = this.getAttribute("data-name");
      alert("Calling " + name + ": " + number + "\n\nIn a real device, this would dial the number. Stay safe!");
    });
  }
}

// =============================================
// 10. HOME PAGE - Animated Welcome Counter
//     Simple DOM manipulation example
// =============================================

function setupHomeAnimations() {
  var statsEl = document.getElementById("statsSection");
  if (!statsEl) return;

  // Array of stat objects
  var stats = [
    { id: "stat1", target: 1250, label: "Women Helped" },
    { id: "stat2", target: 30, label: "Safety Tips" },
    { id: "stat3", target: 15, label: "Emergency Contacts" }
  ];

  // Loop through stats and animate count
  for (var i = 0; i < stats.length; i++) {
    (function (stat) { // IIFE to capture each stat
      var el = document.getElementById(stat.id);
      if (!el) return;

      var count = 0;
      var step = Math.ceil(stat.target / 50); // How much to add each step

      var timer = setInterval(function () {
        count += step;
        if (count >= stat.target) {
          count = stat.target; // Don't exceed target
          clearInterval(timer);
        }
        el.textContent = count + "+"; // Update DOM
      }, 30);
    })(stats[i]);
  }
}

// =============================================
// 11. RUN EVERYTHING ON PAGE LOAD
// =============================================

/* This runs when the page is fully loaded */
window.addEventListener("load", function () {
  checkAuth();           // Redirect to login if not logged in
  setupNavUserName();    // Show logged-in user name in navbar
  applyDarkMode();       // Apply saved dark mode preference
  setActiveNavLink();    // Highlight active page in navbar
  setupContactForm();    // Setup contact form (only on contact.html)
  setupReportForm();     // Setup report form (only on report.html)
  setupTipsToggle();     // Setup tips toggle (only on tips.html)
  setupEmergencyButtons(); // Setup dial buttons (only on emergency.html)
  setupHomeAnimations(); // Animate stats (only on index.html)

  // Add click event for dark mode toggle button
  var darkBtn = document.getElementById("darkToggleBtn");
  if (darkBtn) {
    darkBtn.addEventListener("click", toggleDarkMode);
  }

  // Add click event for hamburger menu button
  var hamburgerBtn = document.getElementById("hamburgerBtn");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleNavMenu);
  }
});
