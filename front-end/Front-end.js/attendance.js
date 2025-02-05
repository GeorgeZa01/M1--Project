fetch("../data/attendance.json")
  .then((response) => response.json())
  .then((data) => {
    const contentDiv = document.getElementById("content");

    data.attendanceAndLeave.forEach((employee) => {
      const employeeSection = document.createElement("div");
      employeeSection.classList.add("mb-5");
      employeeSection.innerHTML = `
        <h2>${employee.name} (ID: ${employee.employeeId})</h2>
        <h3>Attendance</h3>
        <table id="myTable" class="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${employee.attendance
              .map(
                (att) => `
                <tr>
                  <td>${att.date}</td>
                  <td>${att.status}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <br>
        <h3>Leave Requests</h3>
        <table id="leave-table" class="table table-striped table-bordered">
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
              .map(
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
        </table>
        <br>
        <hr width="10px">
      `;
      contentDiv.appendChild(employeeSection);
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
  });

// Approve Leave Function
function approveLeave(employeeId, leaveIndex) {
  const row = document.querySelector(`tr[data-employee-id="${employeeId}"][data-leave-index="${leaveIndex}"]`);
  const statusCell = row.querySelector(".leave-status");

  statusCell.textContent = "Approved";
  Swal.fire("Success", "Leave request approved.", "success");
}

// Deny Leave Function
function denyLeave(employeeId, leaveIndex) {
  const row = document.querySelector(`tr[data-employee-id="${employeeId}"][data-leave-index="${leaveIndex}"]`);
  const statusCell = row.querySelector(".leave-status");

  statusCell.textContent = "Denied";
  Swal.fire("Success", "Leave request denied.", "success");
}
