// Function to handle login form submission
async function validateLogin(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the username and password from input fields
  const username = document.getElementById('uname').value;
  const password = document.getElementById('pwd').value;

  try {
    // Send login request to the backend API
    const response = await fetch('http://localhost:3030/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Successful login
      Swal.fire({
        title: 'Login Successful!',
        text: `Welcome, ${data.role}`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirect to a dashboard or home page after login
        window.location.href = '/dashboard'; // Replace with the desired URL
      });
    } else {
      // If login fails, show error modal
      showErrorModal();
    }
  } catch (error) {
    console.error('Error during login:', error);
    showErrorModal();
  }
}

// Show error modal
function showErrorModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
}

// Dismiss the error modal
function dismissModal() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
}
