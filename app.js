// Listen for submit

document.getElementById('tip-form').addEventListener('submit', function(event) {
  // Hide results
  // document.getElementById('results').style.display = 'none';
  // // Show loader
  // document.querySelector('.loader').style.display = 'block';
  setTimeout(calculateResults, 1000);

  event.preventDefault();
});

function calculateResults() {
  // UI vars
  const uiAmount = document.getElementById('amount');
  const uiTip = document.getElementById('tip');
  const uiParty = document.getElementById('party');
  const uiTotalBill = document.getElementById('total-bill');
  const uiTotalTip = document.getElementById('total-tip');
  const uiTotalPerPerson = document.getElementById('amount-per-person');

  const loader = document.querySelector('.container-loader');
  const results = document.getElementById('results');

  // Calculations
  const total = parseFloat(uiAmount.value);
  const tip = parseFloat((uiTip.value / 100) * total);
  const people = uiParty.value;
  const billTotal = total + tip;

  const amountPerPerson = parseFloat(billTotal / uiParty.value);

  // Check for positive values
  if (total < 1 || tip < 1 || people < 1) {
    showError('Please check your numbers');

    // Compute tip  amounts
  } else if (isFinite(billTotal)) {
    uiTotalBill.value = billTotal.toFixed(2);

    uiTotalTip.value = tip.toFixed(2);
    uiTotalPerPerson.value = amountPerPerson.toFixed(2);
    loader.style.display = 'block';
    setTimeout(() => {
      loader.style.opacity = 0;
      loader.style.display = 'none';

      results.style.display = 'block';
      setTimeout(() => {
        results.style.opacity = 1;
      }, 50);
    }, 4000);

    // clear input values
    // uiAmount.value = '';
    // uiTip.value = '';
    // uiParty.value = '';

  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide loader
  document.querySelector('.container-loader').style.display = 'none';
  // Show results
  document.getElementById('results').style.display = 'none';
  //Create div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card-body');
  const heading = document.querySelector('.heading');
  // Add class
  errorDiv.className = 'alert alert-danger';
  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
