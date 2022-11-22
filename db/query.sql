SELECT e.id, e.first_name, e.last_name, r.title, d.dept, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name 
FROM employee e 
JOIN roles r ON r.id = e.role_id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee AS m ON e.manager_id = m.id