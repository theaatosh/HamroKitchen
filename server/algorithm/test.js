import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const runPythonFunction = async (foodtype, spice, diet) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const pythonScriptPath = join(__dirname, 'rec.py');
            // console.log("Python Script Path:", pythonScriptPath);
            const pythonProcess = spawn('python', [pythonScriptPath, foodtype, spice, diet]);

            let output = '';

            pythonProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    // console.log("Recommended Dishes:", output.trim());
                    resolve(output.trim());
                } else {
                    reject(new Error(`Python process exited with code ${code}`));
                }
            });
        });

        console.log('Result:', result); // Final result from the Python script
    } catch (error) {
        console.error('Error running Python script:', error);
    }
};

runPythonFunction('fastfood', 'medium', 'veg');