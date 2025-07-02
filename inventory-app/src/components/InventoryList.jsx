import './InventoryList.css';

const InventoryList = ({ items, onEdit, onDelete }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'IN STOCK': return 'status-in-stock';
            case 'LOW STOCK': return 'status-low-stock';
            case 'ORDERED': return 'status-ordered';
            case 'DISCONTINUED': return 'status-discontinued';
            default: return '';
        }
    };

    if (items.length === 0) {
        return (
            <div className="inventory-list">
                <div className="empty-state">
                    <h3>No items found</h3>
                    <p>Add some items to your inventory or adjust your search filters.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="inventory-list">
            <div className="list-header">
                <h2>Inventory Items ({items.length})</h2>
            </div>

            <div className="items-grid">
                {items.map((item) => (
                    <div key={item._id} className="item-card">
                        <div className="item-header">
                            <h3 className="item-name">{item.name}</h3>
                            <span className={`status-badge ${getStatusClass(item.status)}`}>
                                {item.status}
                            </span>
                        </div>

                        <div className="item-details">
                            <div className="detail-row">
                                <span className="label">Category:</span>
                                <span className="value">{item.category}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Quantity:</span>
                                <span className="value">{item.quantity}</span>
                            </div>
                            {item.description && (
                                <div className="detail-row">
                                    <span className="label">Description:</span>
                                    <span className="value">{item.description}</span>
                                </div>
                            )}
                        </div>

                        <div className="item-actions">
                            <button
                                className="btn-edit"
                                onClick={() => onEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => onDelete(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryList;