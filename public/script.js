// JavaScript for Netball Thing

document.addEventListener('DOMContentLoaded', function() {
    // Auto-calculate totals when scores change
    const team1Scores = document.querySelectorAll('.team1-score');
    const team2Scores = document.querySelectorAll('.team2-score');
    const team1Total = document.getElementById('team1Total');
    const team2Total = document.getElementById('team2Total');

    function calculateTotal(scoreInputs) {
        let total = 0;
        scoreInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            total += value;
        });
        return total;
    }

    function updateTotals() {
        const team1TotalScore = calculateTotal(team1Scores);
        const team2TotalScore = calculateTotal(team2Scores);
        
        team1Total.textContent = team1TotalScore;
        team2Total.textContent = team2TotalScore;
    }

    // Add event listeners to all score inputs
    [...team1Scores, ...team2Scores].forEach(input => {
        input.addEventListener('input', updateTotals);
        input.addEventListener('change', updateTotals);
    });

    // Set today's date as default if no date is set
    const dateInput = document.getElementById('gameDate');
    if (!dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Form validation
    const form = document.getElementById('netballForm');
    form.addEventListener('submit', function(e) {
        const gameDate = dateInput.value;
        if (!gameDate) {
            e.preventDefault();
            alert('Please select a game date.');
            dateInput.focus();
            return;
        }

        // Check if at least one player name is filled
        const allPlayerInputs = document.querySelectorAll('input[type="text"]:not(#gameDate)');
        const hasAnyPlayer = Array.from(allPlayerInputs).some(input => input.value.trim() !== '');
        
        if (!hasAnyPlayer) {
            e.preventDefault();
            alert('Please enter at least one player name.');
            return;
        }
    });

    // Auto-focus functionality
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    // If it's the last input, submit the form
                    form.submit();
                }
            }
        });
    });

    // Initialize totals on page load
    updateTotals();

    // Add some interactive feedback
    const playerInputs = document.querySelectorAll('input[type="text"]:not(#gameDate)');
    playerInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.backgroundColor = '#f8f9fa';
            this.parentElement.style.transition = 'background-color 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.backgroundColor = '';
        });
    });

    // Clear form functionality (optional - can be added as a button)
    window.clearForm = function() {
        if (confirm('Are you sure you want to clear all data?')) {
            form.reset();
            updateTotals();
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    };
});
