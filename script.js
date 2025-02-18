// Fetch data from localStorage or initialize empty arrays/variables
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let budget = JSON.parse(localStorage.getItem('budget')) || 0;
let budgetMonth = JSON.parse(localStorage.getItem('budgetMonth')) || '';

// Function to update the UI with expenses and total amount
function updateUI() {
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    // Clear the list before updating
    expenseList.innerHTML = '';

    // Calculate the total amount
    let total = 0;
    expenses.forEach((expense, index) => {
        total += expense.amount;

        const listItem = document.createElement('li');
        listItem.innerHTML = `${expense.name} - ₹${expense.amount} (${expense.category}) - ${expense.date} <button class="delete-expense" data-index="${index}">Delete</button>`;
        expenseList.appendChild(listItem);
    });

    totalAmount.textContent = total;

    // Store updated expenses and budget in localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('budgetMonth', JSON.stringify(budgetMonth));
}

// Add new expense
document.getElementById('add-expense').addEventListener('click', () => {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;

    // Validate the inputs
    if (name && amount && date) {
        expenses.push({ name, amount, date, category });
        updateUI();

        // Clear the input fields after adding the expense
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        document.getElementById('expense-date').value = '';
    } else {
        alert("Please fill in all the fields.");
    }
});

// Delete an expense
document.getElementById('expense-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-expense')) {
        const expenseIndex = event.target.getAttribute('data-index');
        expenses.splice(expenseIndex, 1); // Remove the expense from the array
        updateUI(); // Update the UI and localStorage
    }
});

// Set the budget
document.getElementById('set-budget').addEventListener('click', () => {
    const budgetInput = document.getElementById('monthly-budget').value;
    const budgetMonthInput = document.getElementById('budget-month').value;

    if (budgetInput && budgetMonthInput) {
        budget = parseFloat(budgetInput);
        budgetMonth = budgetMonthInput;
        updateUI();
    } else {
        alert("Please enter a valid budget and select a month.");
    }
});

// Navigate to the report page
document.getElementById('view-report').addEventListener('click', () => {
    window.location.href = 'report.html';
});
