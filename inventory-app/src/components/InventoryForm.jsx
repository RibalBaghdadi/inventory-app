import { useState, useEffect } from 'react';
import './InventoryForm.css';

const InventoryForm = ({ onSubmit, editingItem, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        category: '',
        description: '',
        status: 'IN STOCK'
    });

    useEffect(() => {
        if (editingItem) {
            setFormData({
                name: editingItem.name,
                quantity: editingItem.quantity,
                category: editingItem.category,
                description: editingItem.description || '',
                status: editingItem.status
            });
        } else {
            setFormData({
                name: '',
                quantity: '',
                category: '',
                description: '',
                status: 'IN STOCK'
            });
        }
    }, [editingItem]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.quantity || !formData.category) {
            alert('Please fill in all required fields');
            return;
        }

        onSubmit({
            ...formData,
            quantity: parseInt(formData.quantity)
        });

        if (!editingItem) {
            setFormData({
                name: '',
                quantity: '',
                category: '',
                description: '',
                status: 'IN STOCK'
            });
        }
    };

    return (
        <div className="inventory-form">
            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity *</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="IN STOCK">In Stock</option>
                        <option value="LOW STOCK">Low Stock</option>
                        <option value="ORDERED">Ordered</option>
                        <option value="DISCONTINUED">Discontinued</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItem && (
                        <button type="button" className="btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default InventoryForm;