// DOM Elements
const modal = document.getElementById("orderConfirmationModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("orderConfirmationForm");
const idPhotoInput = document.getElementById("idPhoto");
const idPreview = document.getElementById("idPreview");
const confirmBtn = document.getElementById("confirmOrderBtn");

// Get the API URL
const API_URL = window.APP_CONFIG.API_URL;

// Debug: Verify API URL is loaded
console.log("[DEBUG] API_URL:", API_URL);
if (!API_URL) {
    console.error("[ERROR] API_URL is not defined in window.APP_CONFIG");
}

// Open modal when button is clicked
openBtn.addEventListener("click", () => {
    console.log("[DEBUG] Opening modal");
    modal.style.display = "block";
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
    console.log("[DEBUG] Closing modal via X button");
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        console.log("[DEBUG] Closing modal via outside click");
        modal.style.display = "none";
    }
});

// Preview ID photo when selected
idPhotoInput.addEventListener("change", function () {
    console.log("[DEBUG] ID photo selected");
    const file = this.files[0];

    if (file) {
        console.log("[DEBUG] File details:", {
            name: file.name,
            type: file.type,
            size: file.size
        });

        // Validate file type
        if (!file.type.match('image.*')) {
            console.error("[ERROR] Invalid file type selected");
            alert("Please select an image file");
            this.value = ''; // Clear the input
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            console.log("[DEBUG] File read successfully");
            idPreview.src = e.target.result;
            idPreview.style.display = "block";
        }
        reader.onerror = function () {
            console.error("[ERROR] Failed to read file");
            alert("Error loading image. Please try another file.");
        }
        reader.readAsDataURL(file);
    }
});

// Form submission handler
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("[DEBUG] Form submission started");

    // Get form values
    const amount = document.getElementById("orderAmount").value;
    const walletAddress = document.getElementById("walletAddress").value;
    const idPhotoFile = idPhotoInput.files[0];

    console.log("[DEBUG] Form values:", {
        amount,
        walletAddress,
        idPhotoFile: idPhotoFile ? {
            name: idPhotoFile.name,
            type: idPhotoFile.type,
            size: idPhotoFile.size
        } : null
    });

    // Validate inputs
    if (!amount || !walletAddress || !idPhotoFile) {
        const missingFields = [];
        if (!amount) missingFields.push("amount");
        if (!walletAddress) missingFields.push("wallet address");
        if (!idPhotoFile) missingFields.push("ID photo");

        console.error("[ERROR] Missing required fields:", missingFields);
        alert(`Please fill all fields. Missing: ${missingFields.join(", ")}`);
        return;
    }

    // Validate amount is a positive number
    if (isNaN(amount) || parseFloat(amount) <= 0) {
        console.error("[ERROR] Invalid amount:", amount);
        alert("Please enter a valid positive amount");
        return;
    }

    // Validate wallet address format (basic check)
    if (walletAddress.length < 20) {
        console.error("[ERROR] Wallet address seems too short:", walletAddress);
        alert("Please enter a valid wallet address");
        return;
    }

    // Create FormData for the API request
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("walletAddress", walletAddress);
    formData.append("idPhoto", idPhotoFile);

    console.log("[DEBUG] FormData prepared for API request");

    // Disable button and show loading state
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<span class="loading"></span> Processing...';
    console.log("[DEBUG] Button state changed to loading");

    // In the form submission handler, update the API request part:
    try {
        console.log("[DEBUG] Starting API request to:", `${API_URL}/api/transactions/deposits`);

        // Get the bearer token from sessionStorage
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            console.error("[ERROR] No authentication token found");
            alert("Please login first");
            return;
        }

        const response = await fetch(`${API_URL}/api/transactions/deposits`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "amount": amount,
                "method": "crypto", // or "bank_transfer" based on your needs
                // Note: The API spec doesn't include wallet_address or idPhoto
                // You may need to either:
                // 1. Add these to your API endpoint
                // 2. Handle them separately
                // 3. Use method-specific fields
            }),
        });

        console.log("[DEBUG] API response status:", response.status);

        const result = await response.json().catch(err => {
            console.error("[ERROR] Failed to parse JSON response:", err);
            return { error: "Invalid server response" };
        });

        if (response.ok) {
            console.log("[SUCCESS] Deposit initiated successfully");
            alert("Deposit initiated successfully!");
            modal.style.display = "none";
            form.reset();
            idPreview.style.display = "none";

            // Optional: Refresh transactions list or balance
        } else {
            const errorMsg = result.message || result.error || "Failed to initiate deposit";
            console.error("[ERROR] API returned error:", errorMsg);
            throw new Error(errorMsg);
        }
    } catch (error) {
        console.error("[ERROR] API request failed:", error);
        const userMessage = error.message.includes("Failed to fetch")
            ? "Network error. Please check your connection."
            : error.message;
        alert(`Error: ${userMessage}`);
    } finally {
        // Reset button state
        confirmBtn.disabled = false;
        confirmBtn.textContent = "Confirm Order";
        console.log("[DEBUG] Form submission process completed");
    }
});