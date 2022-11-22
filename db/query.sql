SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.dept, m.first_name, m.last_name
FROM employee e 
JOIN roles r ON r.id = e.role_id
JOIN department d ON r.department_id = d.id
LEFT JOIN employee AS m ON e.manager_id = m.id