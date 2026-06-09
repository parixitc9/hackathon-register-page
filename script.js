// =========================================================
// 🔴 PASTE YOUR NEW GOOGLE WEB APP URL HERE 🔴
// =========================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwGYYPLDrRVlFDj2HyRMAgnzW13cuOG22ITeRRgjJEPxGgwqeLTxcXw-xUkLlWNC2gh/exec';

// Dynamic Form Logic
const teamSizeSelect = document.getElementById('teamSize');
const membersContainer = document.getElementById('dynamicMembersContainer');

function updateMemberFields() {
    const size = parseInt(teamSizeSelect.value);
    membersContainer.innerHTML = ''; // Clear existing

    // Start loop at 2 (since Leader is Member 1)
    for (let i = 2; i <= size; i++) {
        const html = `
<div class="member-block">
  <h4>Team Member ${i}</h4>
  <div class="form-group">
    <input type="text" name="member${i}_name" class="form-control" placeholder="Full Name" required>
  </div>
  <div class="form-group">
    <input type="email" name="member${i}_email" class="form-control" placeholder="Email Address" required>
  </div>
  <div class="form-group" style="margin-bottom:0;">
    <input type="tel" name="member${i}_phone" class="form-control" placeholder="Phone Number" required>
  </div>
</div>
`;
        membersContainer.insertAdjacentHTML('beforeend', html);
    }
}

// Listen for changes and trigger on load
teamSizeSelect.addEventListener('change', updateMemberFields);
updateMemberFields();

// Submission Logic
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const statusMessage = document.getElementById('statusMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusMessage.className = 'status-msg';

    const formData = new FormData(form);

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
        .then(() => {
            form.reset();
            updateMemberFields(); // reset dynamic fields back to default 2 members
            statusMessage.textContent = 'Registration successful! Check your email for confirmation.';
            statusMessage.className = 'status-msg success';
            submitBtn.textContent = 'Complete Registration';
            submitBtn.disabled = false;
        })
        .catch((error) => {
            statusMessage.textContent = 'Something went wrong. Please try again.';
            statusMessage.className = 'status-msg error';
            submitBtn.textContent = 'Complete Registration';
            submitBtn.disabled = false;
            console.error('Error!', error.message);
        });
});