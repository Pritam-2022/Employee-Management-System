package com.EMS.SpringBoot_BackEnd.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EMS.SpringBoot_BackEnd.exception.ResourceNotFoundException;
import com.EMS.SpringBoot_BackEnd.model.Employee;
import com.EMS.SpringBoot_BackEnd.repository.EmployeeRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController 
{
	@Autowired
	private EmployeeRepository empRepo;
	
	// Get list of all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees()
	{
		return empRepo.findAll();
	}
	
	// Create employee REST API
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee emp)
	{
		return empRepo.save(emp);
	}
	
	// Get employee by ID REST API
	@GetMapping("/employees/{ID}")
	public ResponseEntity<Employee> getEmployeeByID(@PathVariable Long ID)
	{
		Employee emp = empRepo.findById(ID).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id : " + ID));
		return ResponseEntity.ok(emp);
	}
	
	// Update employee by ID REST API
	@PutMapping("/employees/{ID}")
	public ResponseEntity<Employee> updateEmployeeByID(@PathVariable Long ID, @RequestBody Employee empDetails)
	{
		Employee emp = empRepo.findById(ID).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id : " + ID));
		
		emp.setFirstName(empDetails.getFirstName());
		emp.setLastName(empDetails.getLastName());
		emp.setEmailID(empDetails.getEmailID());
		
		Employee updatedEmp = empRepo.save(emp);
		return ResponseEntity.ok(updatedEmp);
	}
	
	// Delete employee by ID REST API 
	@DeleteMapping("/employees/{ID}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long ID)
	{
		Employee emp = empRepo.findById(ID).orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id : " + ID));
		
		empRepo.delete(emp);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
	}
}
