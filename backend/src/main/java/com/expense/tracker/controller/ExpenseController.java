package com.expense.tracker.controller;

import com.expense.tracker.model.Expense;
import com.expense.tracker.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final ExpenseRepository repo;

    public ExpenseController(ExpenseRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Expense> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense) {
        return repo.save(expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
