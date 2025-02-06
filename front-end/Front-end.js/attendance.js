fetch("http://localhost:3000/api/attendance")
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Add this to inspect the data structure
    const contentDiv = document.getElementById("content");

    data.attendanceAndLeave.forEach((employee) => {
      const employeeSection = document.createElement("div");
      employeeSection.classList.add("employee-section", "mb-5");

      const employeeName = document.createElement("h2");
      employeeName.textContent = `${employee.name} (ID: ${employee.employeeId})`;
      employeeSection.appendChild(employeeName);

      const attendanceTable = document.createElement("table");
      attendanceTable.classList.add("table", "table-bordered");
      attendanceTable.innerHTML = `
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${employee.attendance
            ?.map(
              (att) => `
              <tr>
                <td>${att.date}</td>
                <td>${att.status}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      `;
      employeeSection.appendChild(attendanceTable);

      if (employee.leaveRequests && employee.leaveRequests.length > 0) {
        const leaveRequestsHeading = document.createElement("h3");
        leaveRequestsHeading.textContent = "Leave Requests";
        employeeSection.appendChild(leaveRequestsHeading);

        const leaveTable = document.createElement("table");
        leaveTable.classList.add("table", "table-striped", "table-bordered");
        leaveTable.innerHTML = `
          <thead>
            <tr>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${employee.leaveRequests
              ?.map(
                (leave, index) => `
                <tr data-employee-id="${employee.employeeId}" data-leave-index="${index}">
                  <td>${leave.date}</td>
                  <td>${leave.reason}</td>
                  <td class="leave-status">${leave.status}</td>
                  <td>
                    <button class="btn btn-success btn-sm" onclick="approveLeave(${employee.employeeId}, ${index})">Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="denyLeave(${employee.employeeId}, ${index})">Deny</button>
                  </td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        `;
        employeeSection.appendChild(leaveTable);
      }

      const hr = document.createElement("hr");
      hr.style.width = "100%";
      employeeSection.appendChild(hr);

      contentDiv.appendChild(employeeSection);
    });
  })
  .catch((error) => {
    console.error("Error fetching the data from API:", error);
  });

// Fetch the employee names and populate the dropdown
window.onload = function () {
  fetch("http://localhost:3000/api/employees")
    .then((response) => response.json())
    .then((data) => {
      const employeeSelect = document.getElementById("employeeId");

      // Add employee names to the dropdown list
      data.employees.forEach((employee) => {
        const option = document.createElement("option");
        option.value = employee.employee_id; // Set the value as employee ID
        option.textContent = employee.name; // Display the employee name
        employeeSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching employees:", error);
    });
};

// Submit attendance form
document.getElementById("attendanceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const employeeId = document.getElementById("employeeId").value;
  const attendanceDate = document.getElementById("attendanceDate").value;
  const status = document.getElementById("status").value;

  // Send a POST request to the backend to add attendance
  fetch("http://localhost:3000/api/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employeeId,
      attendanceDate,
      status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert("Attendance added successfully!");
        // Optionally, refresh the attendance data or update the UI
      } else {
        alert("Error adding attendance");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding attendance");
    });
});


  
