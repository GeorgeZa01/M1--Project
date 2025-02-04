let modal; // Define modal in the global scope

async function validateLogin(event) {
  event.preventDefault(); // Prevent form submission and page refresh

  const uname = document.getElementById("uname").value;
  const pwd = document.getElementById("pwd").value;
  modal = document.querySelector(".modal");  // Initialize modal inside the function

  if (
    (uname === "employee" && pwd === "password") ||
    (uname === "hr" && pwd === "password")
  ) {
    await Swal.fire({
      title: "LOGIN Succesful!",
      text: "Click Ok to continue",
      icon: "success"
    });
    window.location.href = uname === "employee" ? "./Html/Timeoff.html" : "./Html/attendance_leave.html";
  } else {
    modal.style.display = "block";
    modal.style.justifyContent = "center";
    console.error("Invalid credentials"); // Debugging
  }
}

// closes modal
function dismissModal() {
  if (modal) {
    modal.style.display = 'none';  // hides modal
  }
}
