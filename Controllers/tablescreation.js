const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';

// Singleton MongoDB client
class MongoDBSingleton {
    constructor() {
        if (!MongoDBSingleton.instance) {
            this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoDBSingleton.instance = this;
        }

        return MongoDBSingleton.instance;
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
        return this.client.db('yourDatabaseName');
    }
}

const mongoSingleton = new MongoDBSingleton();

// Route to fetch data from MongoDB and render the table
app.get('/', async (req, res) => {
    try {
        const db = await mongoSingleton.connect();
        const collection = db.collection('yourCollectionName');
        const data = await collection.find().toArray();
        const table = generateTable(data);
        res.send(table);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Function to generate the HTML table
function generateTable(data) {
    let table = '<table><thead><tr>';

    // Create headers from keys in the first document
    for (let key in data[0]) {
        table += `<th>${key}</th>`;
    }
    table += '</tr></thead><tbody>';

    // Fill in the table with data
    data.forEach((doc) => {
        table += '<tr>';
        for (let key in doc) {
            table += `<td>${doc[key]}</td>`;
        }
        table += '</tr>';
    });

    table += '</tbody></table>';

    return table;
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
