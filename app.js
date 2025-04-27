import express from 'express'; // Importing express
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import your Google API library

const app = express();
const port = 3000; // Port for the server

// Middleware to parse JSON requests (if needed)
app.use(express.json()); // If you need to handle JSON requests

// Your API key and Google Generative AI setup
const genAI = new GoogleGenerativeAI("Your API key");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Route to get content from the Google API and send it to the frontend
app.get('/generate-content', async (req, res) => {
  const prompt = req.query.prompt || "Explain what Express.js does briefly"; // Updated default prompt
  try {
    // Call the API to generate content
    const result = await model.generateContent(prompt);
    const apiResponse = result.response.text(); // Get the text response
    
    // Send the response back as plain text
    res.set('Content-Type', 'text/plain');
    res.send(apiResponse);
  } catch (error) {
    // Handle any errors
    res.status(500).send('An error occurred while generating content.');
  }
});

// Serve static files (like HTML, CSS, JS) from the public folder
app.use(express.static('public'));

// Start the Express server
// Previous log message
app.listen(port, () => {
  console.log(`Your server is up and running at http://localhost:${port}`);
});







