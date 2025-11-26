// newsletter.js for the Newsletter on every page

document.getElementById("newsletter-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVTL0HsAJohp8DsD0cTuFtblFxR7yR_5zDjdaMQcLlUbeRgbjKbYVkeGvp9vBiSqoq/exec"; // google sheets web app deployment url
    const form = e.target;
    const emailInput = form.querySelector("input[name='email']");
    const successDiv = document.getElementById("newsletter-success");
    const errorDiv = document.getElementById("newsletter-error");

    successDiv.style.display = "none";
    errorDiv.style.display = "none";

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorDiv.textContent = "Please enter a valid email address.";
        errorDiv.style.display = "block";
        emailInput.focus();
        return;
    }

    // Form-encoded POST
    const formData = new URLSearchParams();
    formData.append("email", email);

    try {
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        // parse response safely
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            throw new Error("Invalid server response");
        }

        if (data.success) {
            form.reset();
            successDiv.style.display = "block";
        } else {
            errorDiv.textContent = data.error || "There was a problem subscribing. Please try again.";
            errorDiv.style.display = "block";
        }
    } catch (err) {
        console.error(err);
        errorDiv.textContent = "Network error. Please try again later.";
        errorDiv.style.display = "block";
    }
});
