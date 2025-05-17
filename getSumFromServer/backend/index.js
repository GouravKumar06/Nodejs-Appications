const express = require('express');
const app = express();

const cors = require('cors');

app.use(
  cors({
    origin: "http://localhost:5500", // Replace with your frontend URL
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());


app.post('/sum', (req, res) => {
    
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Invalid input. Please provide two numbers.'
        });
    }
    const sum = num1 + num2;
    return res.status(200).json({
        success: true,
        message: 'Sum calculated successfully',
        sum: sum
    });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});