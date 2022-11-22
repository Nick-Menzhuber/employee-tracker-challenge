SELECT r.id, r.title, d.dept, r.salary 
FROM roles r
JOIN department d ON r.department_id = d.id