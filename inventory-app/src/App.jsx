import { useState, useEffect } from 'react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import SearchFilter from './components/SearchFilter';
import ChatBot from './components/ChatBot';
import Hero from './components/Hero';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showChatBot, setShowChatBot] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/items`);
      const data = await response.json();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (itemData) => {
    try {
      const response = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const newItem = await response.json();
      setItems([...items, newItem]);
      setFilteredItems([...items, newItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (itemData) => {
    try {
      const response = await fetch(`${API_URL}/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const updatedItem = await response.json();
      const updatedItems = items.map(item =>
        item._id === editingItem._id ? updatedItem : item
      );
      setItems(updatedItems);
      setFilteredItems(updatedItems);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/api/items/${id}`, {
        method: 'DELETE',
      });
      const updatedItems = items.filter(item => item._id !== id);
      setItems(updatedItems);
      setFilteredItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleFilter = (status) => {
    if (status === 'ALL') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.status === status);
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inventory Management</h1>
        <button
          className={`chat-toggle-btn ${showChatBot ? 'active' : ''}`}
          onClick={() => setShowChatBot(!showChatBot)}
        >
          🤖 {showChatBot ? 'Hide AI Chat' : 'AI Assistant'}
        </button>
      </header>

      <Hero />

      <div className="app-content">
        <div className="main-content">
          <InventoryForm
            onSubmit={editingItem ? handleUpdateItem : handleAddItem}
            editingItem={editingItem}
            onCancel={() => setEditingItem(null)}
          />

          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
          />

          <InventoryList
            items={filteredItems}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
          />
        </div>

        {showChatBot && (
          <div className="chat-sidebar">
            <ChatBot />
          </div>
        )}

        {!showChatBot && (
          <button
            className="floating-chat-btn"
            onClick={() => setShowChatBot(true)}
            title="Open AI Assistant"
          >
            🤖
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;