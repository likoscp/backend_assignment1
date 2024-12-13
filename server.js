const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.post('/calculate',  (req, res) => {
    const {weight, height, age, gender} = req.body;

    if (weight < 5 || height < 0.5 || age <= 0 || weight > 500 || height > 2.5 || age > 130)  {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <link rel="stylesheet" href="/style.css">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
            </head>
            <body>
                <h1>Error: Invalid input</h1>
                <p>Weight, height and age must be correct numbers.</p>
                <a href="/">Go back</a> 
            </body>
            </html>
        `);
    }

    let bmi = weight / (height * height);
    let result = ''
    let k;
    let adult_k = 1;
    let tip = ''
    

    if (gender === 'female') {
         k = 0.95;  
        bmi *= k; 
    } else if (gender === 'male') {
         k = 1.05; 
        bmi *= k; 
    }

    if (age < 18) {
        adult_k = 0.9;
        bmi *= adult_k;
    }

    
    if (bmi < 18.5){
        result = "Underweight"; 
        tip = 'Go to the doctor and eat more'
    }

    if (bmi >= 30){
        result = "Obesity"; 
        tip = 'Go to the doctor and eat less'
    }

    if (bmi >= 18.5 & bmi <= 24.9){
        result = "Normal"; 
        tip = 'Maybe you should go to the gym, but it`s good result'
    }

    if (bmi >= 25 & bmi <= 29.9){
        result = "Overweight"; 
        tip = 'Maybe you should go to the gym'
    }
    bmi = bmi.toFixed(2);
  res.send(`
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/style.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Your Parametres:</h1>
        <p>Your weight: ${weight}</p>
        <p>Your height: ${height}</p>
        <p>Your gender: ${gender}</p>
        <p>Your age: ${age}</p>
        <p>BMI formula for ${gender} and ${age}: (weight / (height * height) * ${k}) * ${adult_k}</p>
        <p>(${weight} / (${height} * ${height}) * ${k}) * ${adult_k} = ${bmi} </p>
        <br>
        <h1>BMI Results:</h1>
        <p>${result}</p>
        <p>${tip}</p>

        <a href="/">Go back</a> 
    </body>
    </html>
        `)
})

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

