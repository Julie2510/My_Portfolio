document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // STEP 2: Grab References & Log Them
  // ==========================================
  const form = document.getElementById('regform');
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm-password');
  const genderInput = document.getElementById('gender');
  const dobInput = document.getElementById('dob');
  const countryInput = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const bioInput = document.getElementById('bio');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');
  const genderError = document.getElementById('genderError');
  const dobError = document.getElementById('dobError');
  const countryError = document.getElementById('countryError');
  const phoneError = document.getElementById('phoneError');
  const bioError = document.getElementById('bioError');

  const successMsg = document.getElementById('successMsg');
  const memberList = document.getElementById('memberList');
  const memberCount = document.getElementById('count');
  const emptyNote = document.getElementById('emptyNote');
  const themeBtn = document.getElementById('theme');

  // Log to console to confirm elements are found
  console.log({
    form, nameInput, emailInput, passwordInput, confirmInput,
    genderInput, dobInput, countryInput, phoneInput, bioInput,
    nameError, emailError, passwordError, confirmError, genderError,
    dobError, countryError, phoneError, bioError,
    successMsg, memberList, memberCount, emptyNote, themeBtn
  });

  // Track total member count
  let currentCount = 0;

  function updateCounter(amount) {
    currentCount += amount;
    memberCount.textContent = currentCount;

    // Toggle empty list note
    if (currentCount > 0) {
      if (emptyNote) emptyNote.style.display = 'none';
    } else {
      if (emptyNote) emptyNote.style.display = 'block';
    }
  }

  // ==========================================
  // STEP 3 & 4: Capture Submit & Validate Fields
  // ==========================================
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Full name is required.';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    // Validate Email
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required.';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    // Validate Password
    if (passwordInput.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      isValid = false;
    } else {
      passwordError.textContent = '';
    }

    // Validate Confirm Password
    if (confirmInput.value !== passwordInput.value || confirmInput.value === '') {
      confirmError.textContent = 'Passwords do not match.';
      isValid = false;
    } else {
      confirmError.textContent = '';
    }

    // Validate Gender
    if (genderInput.value === '') {
      genderError.textContent = 'Please select a gender.';
      isValid = false;
    } else {
      genderError.textContent = '';
    }

    // Validate Date of Birth
    if (dobInput.value === '') {
      dobError.textContent = 'Date of birth is required.';
      isValid = false;
    } else {
      dobError.textContent = '';
    }

    // Validate Country
    if (countryInput.value.trim() === '') {
      countryError.textContent = 'Country is required.';
      isValid = false;
    } else {
      countryError.textContent = '';
    }

    // Validate Phone
    if (phoneInput.value.trim() === '') {
      phoneError.textContent = 'Phone number is required.';
      isValid = false;
    } else {
      phoneError.textContent = '';
    }

    // Validate Bio
    if (bioInput.value.trim() === '') {
      bioError.textContent = 'Bio cannot be blank.';
      isValid = false;
    } else {
      bioError.textContent = '';
    }

    // ==========================================
    // STEP 6, 7 & 8: Register Member, Update Counter, Success & Reset
    // ==========================================
    if (isValid) {
      // Create new list item (DOM creation)
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="member-details">
          <strong>${nameInput.value}</strong> (${emailInput.value}) — <em>${countryInput.value}</em>
        </div>
        <button type="button" class="delete-btn">Remove</button>
      `;
      memberList.appendChild(li);

      // Update counter
      updateCounter(1);

      // Show success message and reset form
      successMsg.textContent = 'Member registered successfully!';
      successMsg.classList.remove('hidden');
      form.reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 3000);
    }
  });

  // ==========================================
  // STEP 5: Clear Errors As User Fixes Them
  // ==========================================
  nameInput.addEventListener('input', () => { if (nameInput.value.trim()) nameError.textContent = ''; });
  emailInput.addEventListener('input', () => { if (emailInput.value.trim()) emailError.textContent = ''; });
  passwordInput.addEventListener('input', () => { if (passwordInput.value.length >= 6) passwordError.textContent = ''; });
  confirmInput.addEventListener('input', () => { if (confirmInput.value === passwordInput.value) confirmError.textContent = ''; });
  genderInput.addEventListener('change', () => { if (genderInput.value) genderError.textContent = ''; });
  dobInput.addEventListener('change', () => { if (dobInput.value) dobError.textContent = ''; });
  countryInput.addEventListener('input', () => { if (countryInput.value.trim()) countryError.textContent = ''; });
  phoneInput.addEventListener('input', () => { if (phoneInput.value.trim()) phoneError.textContent = ''; });
  bioInput.addEventListener('input', () => { if (bioInput.value.trim()) bioError.textContent = ''; });

  // ==========================================
  // STEP 9: Remove a Member (Event Delegation)
  // ==========================================
  memberList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const liItem = e.target.closest('li');
      liItem.remove();
      updateCounter(-1);
    }
  });

  // ==========================================
  // STEP 10: Dark Mode Toggle
  // ==========================================
  themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeBtn.textContent = 'Light Mode';
    } else {
      themeBtn.textContent = 'Dark Mode';
    }
  });

});