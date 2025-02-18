// Retrieve expenses and budget from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const budget = JSON.parse(localStorage.getItem('budget')) || 0;
const budgetMonth = JSON.parse(localStorage.getItem('budgetMonth')) || '';

// Function to update the report page with total expenses, remaining budget, and category breakdown
function updateReport() {
    const monthlyTotal = document.getElementById('monthly-total');
    const remainingBudget = document.getElementById('remaining-budget');
    const categoryList = document.getElementById('category-list');

    // Filter expenses for the selected month
    const currentMonthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() + 1 === parseInt(budgetMonth.split('-')[1]) && expenseDate.getFullYear() === parseInt(budgetMonth.split('-')[0]);
    });

    // Calculate monthly total and category breakdown
    let monthlyTotalAmount = 0;
    let categoryData = {
        Food: 0,
        Entertainment: 0,
        Transportation: 0,
        Other: 0
    };

    currentMonthExpenses.forEach(expense => {
        monthlyTotalAmount += expense.amount;
        categoryData[expense.category] += expense.amount;
    });

    // Display monthly total and remaining budget
    monthlyTotal.textContent = monthlyTotalAmount;
    remainingBudget.textContent = budget - monthlyTotalAmount;

    // Display category breakdown
    categoryList.innerHTML = ''; // Clear previous categories
    for (let category in categoryData) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${category}: ₹${categoryData[category]}`;
        categoryList.appendChild(listItem);
    }

    // Change the total color based on the budget
    if (budget > 0) {
        if (monthlyTotalAmount > budget) {
            monthlyTotal.style.color = 'red';
        } else {
            monthlyTotal.style.color = 'green';
        }
    }
}

// Update the report when the page loads
updateReport();

// Navigate back to the main page
document.getElementById('back-home').addEventListener('click', () => {
    window.location.href = 'index.html';
});
