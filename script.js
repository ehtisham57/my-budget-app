// Get the budget form and expense form elements
const budgetForm = document.getElementById('budgetForm');
const expenseForm = document.getElementById('expenseForm');

// Get the total amount, spent amount, remaining amount, and expense list elements
const totalAmountElement = document.getElementById('totalAmount');
const spentAmountElement = document.getElementById('spentAmount');
const remainingAmountElement = document.getElementById('remainingAmount');
const expenseListElement = document.getElementById('expenseList');

// Initialize the budget and expenses variables
let budget = 0;
let expenses = [];

// Function to calculate the total spent amount
function calculateSpentAmount() {
  const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
  return totalSpent;
}

// Function to calculate the remaining amount
function calculateRemainingAmount() {
  const remainingAmount = budget - calculateSpentAmount();
  return remainingAmount;
}

// Function to update the summary section
function updateSummary() {
  totalAmountElement.textContent = `$${budget.toFixed(2)}`;
  spentAmountElement.textContent = `$${calculateSpentAmount().toFixed(2)}`;
  remainingAmountElement.textContent = `$${calculateRemainingAmount().toFixed(2)}`;
}

// Function to render the expense list
function renderExpenseList() {
  expenseListElement.innerHTML = '';
  expenses.forEach((expense, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${expense.category} - $${expense.amount.toFixed(2)}</span>
      <button class="edit" data-index="${index}">Edit</button>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    expenseListElement.appendChild(listItem);
  });
}

// Function to handle the budget form submission
function handleBudgetFormSubmit(event) {
  event.preventDefault();
  const budgetAmount = parseFloat(document.getElementById('budgetAmount').value);
  if (isNaN(budgetAmount) || budgetAmount <= 0) {
    alert('Please enter a valid budget amount.');
    return;
  }
  budget = budgetAmount;
  updateSummary();
  budgetForm.reset();
  saveToLocalStorage();
}

// Function to handle the expense form submission
function handleExpenseFormSubmit(event) {
  event.preventDefault();
  const expenseCategory = document.getElementById('expenseCategory').value;
  const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
  const expenseDate = document.getElementById('expenseDate').value;
  if (isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter a valid expense amount.');
    return;
  }
  const expense = { category: expenseCategory, amount: expenseAmount, date: expenseDate };
  expenses.push(expense);
  renderExpenseList();
  updateSummary();
  expenseForm.reset();
  saveToLocalStorage();
}

// Function to handle the edit or delete button click in the expense list
function handleExpenseListClick(event) {
  if (event.target.classList.contains('edit')) {
    const expenseIndex = event.target.dataset.index;
    // Handle edit functionality here
    console.log('Edit expense:', expenses[expenseIndex]);
  } else if (event.target.classList.contains('delete')) {
    const expenseIndex = event.target.dataset.index;
    expenses.splice(expenseIndex, 1);
    renderExpenseList();
    updateSummary();
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
    localStorage.setItem('budget', budget);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  
  // Function to load budget and expenses from local storage
  function loadFromLocalStorage() {
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = localStorage.getItem('expenses');
  
    if (savedBudget) {
      budget = parseFloat(savedBudget);
    }
  
    if (savedExpenses) {
      expenses = JSON.parse(savedExpenses);
    }
  }
  
  // Load budget and expenses from local storage on page load
  loadFromLocalStorage();
  
  // Update the summary section and expense list
  updateSummary();
  renderExpenseList();
  
  // Add event listeners to the budget form, expense form, and expense list
  budgetForm.addEventListener('submit', handleBudgetFormSubmit);
  expenseForm.addEventListener('submit', handleExpenseFormSubmit);
  expenseListElement.addEventListener('click', handleExpenseListClick);

  // ...

// Function to handle the edit or delete button click in the expense list
function handleExpenseListClick(event) {
    if (event.target.classList.contains('edit')) {
      const expenseIndex = event.target.dataset.index;
      const expense = expenses[expenseIndex];
      const newCategory = prompt('Enter new category:', expense.category);
      const newAmount = parseFloat(prompt('Enter new amount:', expense.amount));
      const newDate = prompt('Enter new date:', expense.date);
  
      if (newCategory && !isNaN(newAmount) && newDate) {
        expenses[expenseIndex] = {
          category: newCategory,
          amount: newAmount,
          date: newDate
        };
        renderExpenseList();
        updateSummary();
        saveToLocalStorage();
      }
    } else if (event.target.classList.contains('delete')) {
      const expenseIndex = event.target.dataset.index;
      expenses.splice(expenseIndex, 1);
      renderExpenseList();
      updateSummary();
      saveToLocalStorage();
    }
  }
  
  // ...
  
  // Update the summary section and expense list
  updateSummary();
  renderExpenseList();
    