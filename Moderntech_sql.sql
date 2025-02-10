Create Database modern_tech_solutions;

USE modern_tech_solutions;

CREATE TABLE Employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    employment_history TEXT NOT NULL,
    contact VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO Employees (employee_id, name, position, department, salary, employment_history, contact) VALUES
(1, 'Sibongile Nkosi', 'Software Engineer', 'Development', 70000, 'Joined in 2015, promoted to Senior in 2018', 'sibongile.nkosi@moderntech.com'),
(2, 'Lungile Moyo', 'HR Manager', 'HR', 80000, 'Joined in 2013, promoted to Manager in 2017', 'lungile.moyo@moderntech.com'),
(3, 'Thabo Molefe', 'Quality Analyst', 'QA', 55000, 'Joined in 2018', 'thabo.molefe@moderntech.com'),
(4, 'Keshav Naidoo', 'Sales Representative', 'Sales', 60000, 'Joined in 2020', 'keshav.naidoo@moderntech.com'),
(5, 'Zanele Khumalo', 'Marketing Specialist', 'Marketing', 58000, 'Joined in 2019', 'zanele.khumalo@moderntech.com'),
(6, 'Sipho Zulu', 'UI/UX Designer', 'Design', 65000, 'Joined in 2016', 'sipho.zulu@moderntech.com'),
(7, 'Naledi Moeketsi', 'DevOps Engineer', 'IT', 72000, 'Joined in 2017', 'naledi.moeketsi@moderntech.com'),
(8, 'Farai Gumbo', 'Content Strategist', 'Marketing', 56000, 'Joined in 2021', 'farai.gumbo@moderntech.com'),
(9, 'Karabo Dlamini', 'Accountant', 'Finance', 62000, 'Joined in 2018', 'karabo.dlamini@moderntech.com'),
(10, 'Fatima Patel', 'Customer Support Lead', 'Support', 58000, 'Joined in 2016', 'fatima.patel@moderntech.com');


CREATE TABLE Attendance (
    employee_id INT,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

INSERT INTO Attendance (employee_id, attendance_date, status) VALUES
(1, '2024-11-25', 'Present'),
(1, '2024-11-26', 'Absent'),
(1, '2024-11-27', 'Present'),
(1, '2024-11-28', 'Present'),
(1, '2024-11-29', 'Present'),

(2, '2024-11-25', 'Present'),
(2, '2024-11-26', 'Present'),
(2, '2024-11-27', 'Absent'),
(2, '2024-11-28', 'Present'),
(2, '2024-11-29', 'Present'),

(3, '2024-11-25', 'Present'),
(3, '2024-11-26', 'Present'),
(3, '2024-11-27', 'Present'),
(3, '2024-11-28', 'Absent'),
(3, '2024-11-29', 'Present'),

(4, '2024-11-25', 'Absent'),
(4, '2024-11-26', 'Present'),
(4, '2024-11-27', 'Present'),
(4, '2024-11-28', 'Present'),
(4, '2024-11-29', 'Present'),

(5, '2024-11-25', 'Present'),
(5, '2024-11-26', 'Present'),
(5, '2024-11-27', 'Absent'),
(5, '2024-11-28', 'Present'),
(5, '2024-11-29', 'Present'),

(6, '2024-11-25', 'Present'),
(6, '2024-11-26', 'Present'),
(6, '2024-11-27', 'Absent'),
(6, '2024-11-28', 'Present'),
(6, '2024-11-29', 'Present'),

(7, '2024-11-25', 'Present'),
(7, '2024-11-26', 'Present'),
(7, '2024-11-27', 'Present'),
(7, '2024-11-28', 'Absent'),
(7, '2024-11-29', 'Present'),

(8, '2024-11-25', 'Present'),
(8, '2024-11-26', 'Absent'),
(8, '2024-11-27', 'Present'),
(8, '2024-11-28', 'Present'),
(8, '2024-11-29', 'Present'),

(9, '2024-11-25', 'Present'),
(9, '2024-11-26', 'Present'),
(9, '2024-11-27', 'Present'),
(9, '2024-11-28', 'Absent'),
(9, '2024-11-29', 'Present'),

(10, '2024-11-25', 'Present'),
(10, '2024-11-26', 'Present'),
(10, '2024-11-27', 'Absent'),
(10, '2024-11-28', 'Present'),
(10, '2024-11-29', 'Present');

CREATE TABLE Payroll (
    employee_id INT NOT NULL,
    hours_worked INT NOT NULL,
    leave_deductions INT NOT NULL,
    final_salary DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

-- Insert Payroll Data
INSERT INTO Payroll (employee_id, hours_worked, leave_deductions, final_salary) VALUES
(1, 160, 8, 69500),
(2, 150, 10, 79000),
(3, 170, 4, 54800),
(4, 165, 6, 59700),
(5, 158, 5, 57850),
(6, 168, 2, 64800),
(7, 175, 3, 71800),
(8, 160, 0, 56000),
(9, 155, 5, 61500),
(10, 162, 4, 57750);

CREATE TABLE Employee_Performance (
    performance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    review TEXT(250) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

INSERT INTO Employee_Performance (employee_id, review)
Values
	(1, 'Excellent team player'),
	(1, 'Great problem-solving skills'),
	(2, 'Great leadership'),
	(2, 'Organized team activities'),
	(3, 'Attention to detail'),
	(3, 'Timely bug reporting');
    
CREATE TABLE Employee_Reviews (
    review_id INT Auto_increment,
    employee_id INT NOT NULL,
    review TEXT(250) NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

INSERT INTO Employee_Reviews (employee_id, review) VALUES
(1, 'Excellent team player'),
(1, 'Great problem-solving skills'),
(2, 'Great leadership'),
(2, 'Organized team activities'),
(3, 'Attention to detail'),
(3, 'Timely bug reporting');


