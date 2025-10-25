package com.expense.tracker.service;

import com.expense.tracker.model.Expense;
import com.expense.tracker.storage.FileStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExpenseService {
    @Autowired
    private FileStorage fileStorage;

    private List<Expense> expenses;

    public ExpenseService() {
        expenses = new ArrayList<>();
    }

    public List<Expense> getAllExpenses() {
        if (expenses.isEmpty()) {
            expenses = fileStorage.loadExpenses();
        }
        return expenses;
    }

    public Expense addExpense(Expense expense) {
        expense.setId(expenses.size() + 1);
        expenses.add(expense);
        fileStorage.saveExpenses(expenses);
        return expense;
    }

    public Expense updateExpense(int id, Expense newExpense) {
        for (Expense e : expenses) {
            if (e.getId() == id) {
                e.setTitle(newExpense.getTitle());
                e.setCategory(newExpense.getCategory());
                e.setAmount(newExpense.getAmount());
                e.setDate(newExpense.getDate());
                fileStorage.saveExpenses(expenses);
                return e;
            }
        }
        return null;
    }

    public boolean deleteExpense(int id) {
        boolean removed = expenses.removeIf(e -> e.getId() == id);
        if (removed) fileStorage.saveExpenses(expenses);
        return removed;
    }
}
