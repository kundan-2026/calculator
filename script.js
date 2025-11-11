const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.id;

        if (value === 'clear') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '0';
        } else if (value === 'equals') {
            if (previousInput && operator && currentInput) {
                try {
                    const result = eval(`${previousInput} ${operator} ${currentInput}`);
                    display.textContent = result;
                    currentInput = result.toString();
                    previousInput = '';
                    operator = '';
                } catch {
                    display.textContent = 'Error';
                    currentInput = '';
                }
            }
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(value)) {
            if (currentInput) {
                if (previousInput && operator) {
                    // Calculate intermediate result
                    try {
                        const result = eval(`${previousInput} ${operator} ${currentInput}`);
                        previousInput = result.toString();
                    } catch {
                        display.textContent = 'Error';
                        return;
                    }
                } else {
                    previousInput = currentInput;
                }
                operator = value === 'add' ? '+' : value === 'subtract' ? '-' : value === 'multiply' ? '*' : '/';
                currentInput = '';
            }
        } else {
            // Number or decimal
            if (value === 'decimal' && currentInput.includes('.')) return;
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});
