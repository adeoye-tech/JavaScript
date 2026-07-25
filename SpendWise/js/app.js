const transactionList = 
document.getElementById("transaction-list");
const emptyState = 
document.getElementById("empty-state");
const loading = 
document.getElementById("loading");
function renderTransactions(list = transactions) {
    transactionList.innerHTML = "";
    if (list.length === 0) {
        emptyState.style.display = "block";

    }
    else {
        emptyState.style.display = "none"
    }

    list.forEach(function(transaction) {
        const card = 
        document.createElement("div");
        card.classList.add("transaction-card");
        card.dataset.id = transaction.id;
        card.innerHTML = `
        <h3>${transaction.description}</h3>
        <p>#${transaction.amount}</p>
        <p>${transaction.type}</p>
        <small>${transaction.date}</small>

        <button class="edit-btn" data-id = "${transaction.id}">
        Edit
        </button>

        <button class="delete-btn" data-id = "${transaction.id}">
        Delete
        </button>
        `;
        transactionList.appendChild(card);

    });

    }
    
    

    transactionList.addEventListener("click",
        function(event) {
            const card = 
            event.target.closest(".transaction-card");
            if (!card) {
                return;
            } 
            if 
            (event.target.classList.contains("edit-btn")) {
                const id = 
                    Number(card.dataset.id);
                    const transactionToEdit = 
                    transactions.find(function(transaction) {
                        return transaction.id === id;
                    });
                    description.value = 
                    transactionToEdit.description;
                    amount.value = transactionToEdit.amount;
                    type.value = transactionToEdit.type;
                    date.value = transactionToEdit.date;

                    editTransactionId = id;
                    }
                   if
                   (event.target.classList.contains("delete-btn")) {
                    
                    const id = 
                    Number(card.dataset.id);

                    const updatedTransactions = 
                    transactions.filter(function(transaction) {
                        return transaction.id !== id;
                    });
                    transactions.length = 0;
                    transactions.push(...updatedTransactions);
                    renderTransactions();
                    updateSummary();

                    localStorage.setItem(
                        "transactions",
                        JSON.stringify(transactions)
                    )
                }
            });




const expenseForm = 
document.getElementById("expense-form");

const description = 
document.getElementById("description");

const amount = 
document.getElementById("amount");

const type = 
document.getElementById("type");

const date = 
document.getElementById("date");

const totalBalance = 
document.getElementById("balance");
const totalIncome = 
document.getElementById("income");
const totalExpenses = 
document.getElementById("expenses");
const allBtn = 
document.getElementById("all-btn");
const incomeBtn = 
document.getElementById("income-btn");
const incomeBar = 
document.getElementById("income-bar");
const expenseBar = 
document.getElementById("expense-bar");
const expenseBtn = 
document.getElementById("expense-btn");

const exportBtn = 
document.getElementById("export-btn");
const newestBtn =
document.getElementById("newest-btn");

const oldestBtn =
document.getElementById("oldest-btn");

const highestBtn =
document.getElementById("highest-btn");

const lowestBtn =
document.getElementById("lowest-btn");

const themeBtn = 
document.getElementById("theme-btn");
const submitButton = 
document.querySelector("#expense-form button")
const filterButtons = 
document.querySelectorAll(".filter-buttons button");
const search = 
document.getElementById("search");

search.addEventListener("input",
        function() {
            const searchValue = 
            search.value.toLowerCase();
            const filteredTransactions = 
            transactions.filter(function(transaction) {
                return transaction.description
                .toLowerCase()
                .includes(searchValue);
            });
            renderTransactions(filteredTransactions);
        });

        allBtn.addEventListener("click",
            function() {
                renderTransactions();

                });
                incomeBtn.addEventListener("click",
                    function() {
                        const incomeTransactions = 
                        transactions.filter(function(transaction) {
                    return transaction.type ===
                    "income";
                        });

                
                renderTransactions(incomeTransactions);
            });
    
            expenseBtn.addEventListener ("click",
                function() {
                    const expenseTransactions = 
                    transactions.filter(function(transaction) {
                        return transaction.type ===
                        "expense";
                    });
                    renderTransactions(expenseTransactions);
                });
                exportBtn.addEventListener("click",
                    function() {
                        const data = 
                        JSON.stringify(transactions,null,2);

                       const blob = new Blob([data], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "transactions.json";

    link.click();

    URL.revokeObjectURL(url);

});

    newestBtn.addEventListener("click", function () {

    transactions.sort(function (a, b) {

        return new Date(b.date) - new Date(a.date);

    });

    renderTransactions();
    updateSummary();

});
    highestBtn.addEventListener("click", function () {

    transactions.sort(function (a, b) {

        return b.amount - a.amount;

    });

    renderTransactions();
    updateSummary();

});

oldestBtn.addEventListener("click", function () {

    transactions.sort(function (a, b) {

        return new Date(a.date) - new Date(b.date);

    });

    renderTransactions();
    updateSummary();

});

lowestBtn.addEventListener("click", function () {

    transactions.sort(function (a, b) {

        return a.amount - b.amount;

    });

    renderTransactions();
    updateSummary();

});
    
themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme","dark");

    } else {

        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme","light");

    }

});


                 
            


function updateSummary() {
    let income = 0;
    let expenses = 0;
    transactions.forEach(function(transaction){
        if (transaction.type ==="income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });
    const balance = income-expenses;
    totalIncome.textContent = `#${income}`;
    totalExpenses.textContent = `#${expenses}`;
    totalBalance.textContent  = `#${balance}`;

    const total = income + expenses;

if(total > 0){

    incomeBar.style.width =
   ` ${(income/total)*100}%`;

    expenseBar.style.width =
    `${(expenses/total)*100}%`;

}else{

    incomeBar.style.width = "0%";

    expenseBar.style.width = "0%";

}
}


const savedTransactions = 
localStorage.getItem("transactions");

const transactions = savedTransactions
? JSON.parse(savedTransactions)
: [];

let editTransactionId = null;

expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Validation
    if (description.value.trim() === "") {
        alert("Please enter a description.");
        return;
    }

    if (amount.value === "" || Number(amount.value) <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (date.value === "") {
        alert("Please select a date.");
        return;
    }

    // Edit Transaction
    if (editTransactionId !== null) {

        const transactionToUpdate = transactions.find(function (transaction) {
            return transaction.id === editTransactionId;
        });

        transactionToUpdate.description = description.value;
        transactionToUpdate.amount = Number(amount.value);
        transactionToUpdate.type = type.value;
        transactionToUpdate.date = date.value;

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );

        renderTransactions();
        updateSummary();

        editTransactionId = null;

        expenseForm.reset();

        return;
    }

    // Add Transaction
    const newTransaction = {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value),
        type: type.value,
        date: date.value
    };

    transactions.push(newTransaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    renderTransactions();
    updateSummary();

    expenseForm.reset();

});

const savedTheme = 
localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️ Light Mode";
}

loading.style.display = "block";

setTimeout(function () {

    loading.style.display = "none";

    renderTransactions();

    updateSummary();

}, 1000);


