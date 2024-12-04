let transactions = [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");

// Update the balance, income, and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((sum, value) => sum + value, 0);

  const expense = amounts
    .filter(amount => amount < 0)
    .reduce((sum, value) => sum + value, 0);

  const balance = income + expense;

  balanceEl.textContent = `$${balance.toFixed(2)}`;
  incomeEl.textContent = `$${income.toFixed(2)}`;
  expenseEl.textContent = `$${Math.abs(expense).toFixed(2)}`;
}

// Add a transaction to the list
function addTransaction(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction", transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
    ${transaction.description}
    <span>${transaction.amount > 0 ? "+" : ""}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button onclick="deleteTransaction(${transaction.id})">x</button>
  `;

  transactionList.appendChild(li);
}

// Delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  render();
}

// Render all transactions
function render() {
  transactionList.innerHTML = "";
  transactions.forEach(addTransaction);
  updateValues();
}

// Handle form submission
transactionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || isNaN(amount)) {
    alert("Please fill out all fields.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount
  };

  transactions.push(transaction);
  render();

  // Clear form inputs
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
});

// Initialize the app
render();
