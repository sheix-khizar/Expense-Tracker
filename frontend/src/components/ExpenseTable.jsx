import React from "react";

function ExpenseTable({ expenses, onDelete }) {
  if (expenses.length === 0)
    return (
      <p className="text-center text-gray-400 text-lg">
        No expenses recorded yet. Start adding some 💸
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-left">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Description</th>
            <th className="py-3 px-4 text-right">Amount ($)</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr
              key={exp.id || index}
              className="border-b border-gray-700 hover:bg-gray-800/70 transition-all"
            >
              <td className="py-3 px-4 text-gray-300">{exp.date}</td>
              <td className="py-3 px-4 text-gray-300">{exp.category}</td>
              <td className="py-3 px-4 text-gray-300">{exp.description}</td>
              <td className="py-3 px-4 text-right text-green-400 font-semibold">
                ${exp.amount}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => onDelete(exp.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-xs font-semibold transition-all transform hover:scale-105"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
