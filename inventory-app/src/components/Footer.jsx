import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Smart Inventory</h3>
                    <p>Revolutionizing inventory management with AI-powered solutions.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                        <a href="#" aria-label="GitHub">⚡</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Features</h4>
                    <ul>
                        <li>Real-time Tracking</li>
                        <li>AI Assistant</li>
                        <li>Smart Analytics</li>
                        <li>Status Management</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li>Documentation</li>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>API Reference</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 Smart Inventory. Built with React & AI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;