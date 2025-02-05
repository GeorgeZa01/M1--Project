async function validateLogin(event) {
  event.preventDefault(); // Prevent default form submission

  const uname = document.getElementById("uname").value;
  const pwd = document.getElementById("pwd").value;
  const modal = document.querySelector(".modal");

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: uname, password: pwd }),
    });

    const data = await response.json();

    if (response.ok) {
      await Swal.fire({
        title: "LOGIN Successful!",
        text: "Click Ok to continue",
        icon: "success"
      });

      // Redirect based on user role
      redirectUser(data.role);
    } else {
      modal.style.display = "block";
      modal.style.justifyContent = "center";
      console.error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Redirect the user based on role
function redirectUser(role) {
  if (role === "employee") {
    window.location.href = "./Html/Timeoff.html";
  } else {
    window.location.href = "./Html/attendance_leave.html";
  }
}

function dismissModal() {
  document.querySelector(".modal").style.display = "none";
}

document.getElementById("login-form").addEventListener("submit", validateLogin);
