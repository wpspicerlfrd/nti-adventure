// Function to download the certificate as an image or trigger a print save
function downloadCertificateImage() {
    window.print(); // Triggers the tablet's built-in print-to-PDF / save functionality
}

// Function to silently email you in the background (using a free endpoint like Formspree)
// Replace 'YOUR_FORMSPREE_ENDPOINT_ID' with a free form ID from formspree.io if you want background emails
function sendBackgroundReport() {
    let reportData = {
        student: "EJ Spicer",
        totalTime: document.getElementById('cert-time').innerText,
        stamps: JSON.stringify(dayCompletionTimestamps)
    };

    // Optional: If you set up a free form endpoint on Formspree (e.g., https://formspree.io/f/yourhash), 
    // it will post the completion data straight to your inbox silently!
    const formspreeUrl = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT_ID"; 

    fetch(formspreeUrl, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(reportData)
    }).then(response => {
        if (response.ok) {
            alert("Success! Progress report sent straight to Dad's email!");
        } else {
            alert("Report generated successfully! (Note: Configure Formspree URL in app.js for background email delivery, or use 'Download Certificate').");
        }
    }).catch(error => {
        // Fallback if offline or endpoint isn't hooked up yet
        alert("Certificate successfully locked in! You can tap 'Download Certificate' to save a PDF copy to the tablet.");
    });
}

function returnToMapFromCert() {
    document.getElementById('certificate-modal').classList.add('hidden');
}
