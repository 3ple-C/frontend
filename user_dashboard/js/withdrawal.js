// DOM Elements
const withdrawalModal = document.getElementById("withdrawalConfirmationModal");
const openWithdrawalBtn = document.getElementById("openWithdrawalModalBtn");
const closeWithdrawalBtn = withdrawalModal.querySelector(".close");
const withdrawalForm = document.getElementById("withdrawalConfirmationForm");
const withdrawalProofInput = document.getElementById("withdrawalProof");
const withdrawalPreview = document.getElementById("withdrawalPreview");
const confirmWithdrawalBtn = document.getElementById("confirmWithdrawalBtn");
const API_URL = window.APP_CONFIG?.API_URL;

// Open modal
openWithdrawalBtn.addEventListener("click", () => {
    withdrawalModal.style.display = "block";
});

// Close modal
closeWithdrawalBtn.addEventListener("click", () => {
    withdrawalModal.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === withdrawalModal) {
        withdrawalModal.style.display = "none";
    }
});

// Preview proof file
withdrawalProofInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            withdrawalPreview.src = e.target.result;
            withdrawalPreview.style.display = "block";
        }
        reader.readAsDataURL(file);
    } else {
        withdrawalPreview.style.display = "none";
    }
});

// Form submission
withdrawalForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const amount = document.getElementById("withdrawalAmount").value;
    const walletAddress = document.getElementById("withdrawalWallet").value;
    const network = document.getElementById("network").value;
    const proofFile = withdrawalProofInput.files[0];

    // Validate
    if (!amount || !walletAddress || !network) {
        alert("Please fill all required fields");
        return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("walletAddress", walletAddress);
    formData.append("network", network);
    if (proofFile) formData.append("proof", proofFile);

    // Disable button and show loading
    confirmWithdrawalBtn.disabled = true;
    confirmWithdrawalBtn.innerHTML = '<span class="loading"></span> Processing...';

    try {
        const response = await fetch(`${API_URL}/transaction/withdraw`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert("Withdrawal request submitted successfully!");
            withdrawalModal.style.display = "none";
            withdrawalForm.reset();
            withdrawalPreview.style.display = "none";
        } else {
            throw new Error(result.message || "Withdrawal failed");
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error("Withdrawal Error:", error);
    } finally {
        confirmWithdrawalBtn.disabled = false;
        confirmWithdrawalBtn.textContent = "Confirm Withdrawal";
    }
});