📦 Smart Inventory Management System
A modern, AI-powered inventory management application built with the MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with an intelligent chatbot using Groq AI.
Show Image
✨ Features

📊 Complete Inventory Management: Add, edit, delete, and track inventory items
🏷️ Smart Categorization: Organize items by categories with detailed descriptions
📈 Status Tracking: Monitor stock levels (In Stock, Low Stock, Ordered, Discontinued)
🔍 Advanced Search & Filter: Find items by name, category, or status instantly
🤖 AI Assistant: Groq-powered chatbot for inventory insights and support
📱 Responsive Design: Works perfectly on desktop, tablet, and mobile
🎨 Modern UI: Clean, professional interface with smooth animations
⚡ Real-time Updates: Live inventory tracking and updates

🛠️ Tech Stack
Frontend

React 18 with Vite for fast development
Modern CSS with responsive design
Fetch API for HTTP requests
Component-based architecture

Backend

Node.js & Express.js for robust server
MongoDB with Mongoose ODM
Groq AI (llama3-70b-8192) for intelligent chatbot
CORS enabled for cross-origin requests

AI Integration

Groq SDK for natural language processing
Context-aware responses based on inventory data
Real-time chat interface

🚀 Quick Start
Prerequisites

Node.js (v16 or higher)
MongoDB (local installation or MongoDB Atlas)
Groq API key (free at https://console.groq.com)

Installation

Clone the repository
bash
git clone https://github.com/RibalBaghdadi/inventory-app.git


Setup Backend
bash
cd inventory-backend
npm install

Setup Frontend
bashcd ../inventory-app
npm install


Configuration

Backend Environment Variables
Create .env file in inventory-backend folder:
envMONGODB_URI=mongodb://localhost:27017/inventory used mongodb atlas
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
NODE_ENV=development

Frontend Environment Variables
Create .env file in inventory-app folder:
envVITE_API_URL=http://localhost:5000

Get Groq API Key

Visit https://console.groq.com
Create a free account
Generate an API key
Add it to your backend .env file



Running the Application

Start Backend Server
bash
cd inventory-backend
npm run dev
Server will run on http://localhost:5000
Start Frontend Application
bash
cd inventory-app
npm run dev
App will open at http://localhost:5173

📋 API Endpoints
Items Management

GET /api/items - Get all inventory items
POST /api/items - Create new item
PUT /api/items/:id - Update existing item
DELETE /api/items/:id - Delete item
GET /api/items/search?q=term - Search items

AI Chat

POST /api/chat - Send message to AI assistant

🎯 Usage Guide
Adding Items

Fill out the inventory form with item details
Select appropriate status (In Stock, Low Stock, Ordered, Discontinued)
Click "Add Item" to save

Managing Inventory

Search: Use the search bar to find items by name, category, or status
Filter: Use status dropdown to filter items by their current status
Edit: Click the "Edit" button on any item card
Delete: Click the "Delete" button to remove items

AI Assistant

Click the "🤖 AI Assistant" button in the header or the floating chat button
Ask questions about your inventory:

"How many items are in low stock?"
"Show me all electronics"
"What's the total quantity of office supplies?"
"Which items need to be reordered?"