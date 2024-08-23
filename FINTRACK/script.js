document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.getElementById('continue-button');
    const slider = document.getElementById('slider');
    const contentSections = document.querySelectorAll('.content-section');
    const walletButton = document.getElementById('wallet-button');
    const cardsButton = document.getElementById('cards-button');
    const sendButton = document.getElementById('send-button');
    const earnButton = document.getElementById('earn-button');
    const receiveButton = document.getElementById('receive-button');
    const moreButton = document.getElementById('more-button');
    const currencySelector = document.getElementById('currency-selector');
    const balanceDisplay = document.getElementById('balance');
    const trackerForm = document.getElementById('tracker-form');
    const totalIncomeDisplay = document.getElementById('total-income');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const trackerBalanceDisplay = document.getElementById('tracker-balance');
    const createCardButton = document.getElementById('create-card-button');
    const cardList = document.getElementById('card-list');

    // Slide to content when continue button is clicked
    continueButton.addEventListener('click', function () {
        slider.style.transform = 'translateX(-50%)';
    });

    // Handle currency change
    currencySelector.addEventListener('change', function () {
        updateBalanceDisplay();
    });

    // Update balance display based on selected currency
    function updateBalanceDisplay() {
        const currency = currencySelector.value;
        let balance = parseFloat(balanceDisplay.innerText);
        if (currency === 'USD') {
            balanceDisplay.innerText = (balance * 1).toFixed(2); // Example conversion
        } else if (currency === 'XAF') {
            balanceDisplay.innerText = (balance * 600).toFixed(2); // Example conversion
        }
    }

    // Handle tracker form submission
    trackerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const description = document.getElementById('transaction-description').value;
        const amount = parseFloat(document.getElementById('transaction-amount').value);
        const type = document.getElementById('transaction-type').value;

        addTransaction(description, amount, type);
        updateTrackerSummary();
    });

    // Add transaction to tracker
    function addTransaction(description, amount, type) {
        let totalIncome = parseFloat(totalIncomeDisplay.innerText);
        let totalExpenses = parseFloat(totalExpensesDisplay.innerText);

        if (type === 'income') {
            totalIncome += amount;
        } else if (type === 'expense') {
            totalExpenses += amount;
        }

        totalIncomeDisplay.innerText = totalIncome.toFixed(2);
        totalExpensesDisplay.innerText = totalExpenses.toFixed(2);
    }

    // Update tracker summary
    function updateTrackerSummary() {
        const totalIncome = parseFloat(totalIncomeDisplay.innerText);
        const totalExpenses = parseFloat(totalExpensesDisplay.innerText);
        const balance = totalIncome - totalExpenses;

        trackerBalanceDisplay.innerText = balance.toFixed(2);
    }

    // Handle navigation buttons
    walletButton.addEventListener('click', function () {
        showSection('balance-section');
    });

    cardsButton.addEventListener('click', function () {
        showSection('card-section');
    });

    sendButton.addEventListener('click', function () {
        showSection('send-section');
    });

    earnButton.addEventListener('click', function () {
        showSection('earn-section');
    });

    receiveButton.addEventListener('click', function () {
        showSection('receive-section');
    });

    moreButton.addEventListener('click', function () {
        showSection('more-section');
    });

    // Show specific section
    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');
    }

    // Handle card creation
    createCardButton.addEventListener('click', function () {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = `Card ${cardList.children.length + 1}`;
        cardList.appendChild(card);
    });

    // Initialize the balance display
    updateBalanceDisplay();
});
