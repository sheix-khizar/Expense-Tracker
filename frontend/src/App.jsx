import React, { useState, useEffect } from "react";
import { getExpenses, addExpense, deleteExpense } from "./services/api";
import ExpenseTable from "./components/ExpenseTable";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newExpense.date || !newExpense.amount)
      return alert("Please fill in all required fields!");
    await addExpense(newExpense);
    setNewExpense({ date: "", category: "", description: "", amount: "" });
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center px-5 py-10 font-inter text-gray-200">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
          💰 Expense Tracker
        </h1>
        <p className="text-gray-400 mt-2 text-lg tracking-wide">
          Manage your daily spending efficiently and elegantly
        </p>
      </header>

      {/* Add Expense Form */}
      <section className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/20 mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">
          ➕ Add New Expense
        </h2>

        <form
          onSubmit={handleAdd}
          className="flex flex-wrap items-center gap-4 justify-between"
        >
          <input
            type="date"
            className="w-[160px] bg-gray-800/60 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            className="flex-1 bg-gray-800/60 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="flex-1 bg-gray-800/60 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-[140px] bg-gray-800/60 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-[1.03]"
          >
            + Add Expense
          </button>
        </form>
      </section>

      {/* Expense Table */}
      <section className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-blue-900/20">
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">
          📊 Expense Overview
        </h2>
        <ExpenseTable expenses={expenses} onDelete={handleDelete} />
      </section>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400 font-semibold">
            Sheix Muhammad Khizar
          </span>{" "}
          — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
