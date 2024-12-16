const { spawn } = require('child_process');
const { dirname, join } = require('path');

// Function to run the Python script
const runPythonFunction = async (foodtype, spice, diet) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const __filename = module.filename; // Fallback for __filename
            const __dirname = dirname(__filename);
            const pythonScriptPath = join(__dirname, 'rec.py'); // Path to Python script

            const pythonProcess = spawn('python', [pythonScriptPath, foodtype, spice, diet]);
            let output = '';

            // Capture Python script's output
            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            // Capture errors from Python script
            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            // Handle Python process closure
            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(output.trim());
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });
        });

        console.log('Result:', result); // Log the result
        return result;
    } catch (error) {
        console.error('Error running Python script:', error);
    }
};

// Test the function
// runPythonFunction('fastfood', 'medium', 'veg');

// Export the function for use in other files
module.exports = {runPythonFunction};

