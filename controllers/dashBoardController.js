// Import necessary models
const Interview = require("../models/interview");
const Student = require("../models/student");

// Controller function for the dashboard route
module.exports.dashboard = async function (req, res) {
  try {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // Populate all students with their associated interviews
      let students = await Student.find({}).populate("interviews");

      // Populate all interviews with their associated students
      let interviews = await Interview.find({}).populate("students.student");

      // Render the dashboard view and pass data to it
      return res.render("dashboard", {
        title: "Dashboard",
        all_students: students,
        all_interviews: interviews,
      });
    } else {
      // If the user is not authenticated, redirect to the home page
      return res.redirect("/");
    }
  } catch (err) {
    // Handle any errors and log them
    console.log(err);
    // Redirect the user back in case of an error
    return res.redirect("back");
  }
};
