document.addEventListener('DOMContentLoaded', async function () {
    // DOM Elements
    const withdrawForm = document.querySelector('form.py-5');
    const destinationInput = document.getElementById('destination');
    const amountInput = document.getElementById('amount');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const maxAmountNote = document.querySelector('small'); // Element showing max withdrawable amount
    const API_URL = window.APP_CONFIG?.API_URL;
    const FIXED_FEE = 1.00; // Fixed USDT network fee

    // Current user balance
    let userBalance = 0;

    // Initialize the form
    async function initWithdrawalForm() {
        try {
            // Fetch user balance
            const response = await fetch(`${API_URL}/account/balance`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                userBalance = data.balance;
                // Update the UI with max withdrawable amount (balance - fee)
                maxAmountNote.textContent = `Maximum amount withdrawable: ${(userBalance - FIXED_FEE).toFixed(2)} USDT`;
            } else {
                throw new Error(data.message || 'Failed to fetch balance');
            }
        } catch (error) {
            console.error('Balance check error:', error);
            alert(`Error: ${error.message}`);
        }
    }

    // Validate wallet address format
    function validateWalletAddress(address) {
        // Basic TRC20 address validation (starts with T and 33 chars)
        return /^T[a-zA-Z0-9]{33}$/.test(address);
    }

    // Validate amount
    function validateAmount(amount) {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return false;

        // Check if amount is positive and doesn't exceed balance (including fee)
        return numAmount > 0 && numAmount <= (userBalance - FIXED_FEE);
    }

    // Handle form submission
    withdrawForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const walletAddress = destinationInput.value.trim();
        const amount = amountInput.value.trim();

        // Validate inputs
        if (!validateWalletAddress(walletAddress)) {
            alert('Please enter a valid TRC20 wallet address (starts with T)');
            return;
        }

        if (!validateAmount(amount)) {
            alert(`Please enter a valid amount between 0 and ${(userBalance - FIXED_FEE).toFixed(2)} USDT`);
            return;
        }

        // Prepare withdrawal request data
        const withdrawalData = {
            walletAddress: walletAddress,
            amount: parseFloat(amount),
            fee: FIXED_FEE,
            network: 'TRC20',
            currency: 'USDT',
            status: 'pending' // Manual admin approval required
        };

        // Disable button and show loading state
        withdrawBtn.disabled = true;
        withdrawBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

        try {
            // Create withdrawal request (admin will manually approve)
            const response = await fetch(`${API_URL}transaction/withdrawal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(withdrawalData)
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message with manual approval note
                alert(`Withdrawal request submitted successfully!\n\nYour request for ${amount} USDT (including ${FIXED_FEE} USDT fee) has been queued for manual approval by our team. You'll receive a notification when processed.`);

                // Reset form
                withdrawForm.reset();

                // Refresh balance
                await initWithdrawalForm();
            } else {
                throw new Error(result.message || 'Withdrawal request failed');
            }
        } catch (error) {
            console.error('Withdrawal Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            // Reset button state
            withdrawBtn.disabled = false;
            withdrawBtn.textContent = 'Withdraw Now';
        }
    });

    // Add real-time validation
    destinationInput.addEventListener('input', function () {
        // Visual feedback for address validation
        if (validateWalletAddress(this.value.trim())) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });

    amountInput.addEventListener('input', function () {
        const amount = parseFloat(this.value) || 0;
        const isValid = validateAmount(this.value.trim());

        // Visual feedback for amount validation
        if (isValid) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }

        // Show total deduction (amount + fee)
        const totalDeduction = amount + FIXED_FEE;
        const feeNote = document.querySelector('.fee-note') || document.createElement('small');
        feeNote.className = 'fee-note text-muted';
        feeNote.textContent = `Total deduction: ${totalDeduction.toFixed(2)} USDT (${amount.toFixed(2)} + ${FIXED_FEE} USDT fee)`;

        if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('fee-note')) {
            this.parentNode.insertBefore(feeNote, this.nextElementSibling);
        }
    });

    // Initialize the form
    await initWithdrawalForm();
});