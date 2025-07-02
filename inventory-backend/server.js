const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-app.onrender.com'] // Replace with your actual frontend URL
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inventory')
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
    });

// MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
});

// Groq AI setup
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Item Schema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['IN STOCK', 'LOW STOCK', 'ORDERED', 'DISCONTINUED'],
        default: 'IN STOCK'
    },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Routes
// Get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new item
app.post('/api/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update item
app.put('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete item
app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Search items
app.get('/api/items/search', async (req, res) => {
    try {
        const { q } = req.query;
        const items = await Item.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
                { status: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Chat with AI
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const items = await Item.find();

        const context = `You are an inventory assistant. Here's the current inventory data: ${JSON.stringify(items, null, 2)}. 
    Help the user with inventory-related questions. Keep responses short and helpful.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: context },
                { role: "user", content: message }
            ],
            model: "llama3-70b-8192",
            temperature: 0.7,
            max_tokens: 200,
        });

        res.json({ response: completion.choices[0]?.message?.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});