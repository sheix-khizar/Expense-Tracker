package com.expense.tracker.storage;

import com.expense.tracker.model.Expense;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.*;

@Component
public class FileStorage {
    private static final String FILE_PATH = "src/main/resources/expenses.csv";

    public List<Expense> loadExpenses() {
        List<Expense> expenses = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 5) {
                    Expense e = new Expense(
                            Integer.parseInt(data[0]),
                            data[1], data[2],
                            Double.parseDouble(data[3]),
                            data[4]);
                    expenses.add(e);
                }
            }
        } catch (IOException e) {
            System.out.println("No data file found yet. A new one will be created.");
        }
        return expenses;
    }

    public void saveExpenses(List<Expense> expenses) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_PATH))) {
            for (Expense e : expenses) {
                bw.write(e.getId() + "," + e.getTitle() + "," + e.getCategory() + "," + e.getAmount() + "," + e.getDate());
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
