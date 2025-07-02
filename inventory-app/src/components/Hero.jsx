import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-image">
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern warehouse with inventory management"
                />
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">Smart Inventory Management</h1>
                        <p className="hero-subtitle">
                            Streamline your inventory with AI-powered insights. Track, manage, and optimize your stock levels with ease.
                        </p>
                        <div className="hero-features">
                            <div className="feature">
                                <span className="feature-icon">📦</span>
                                <span>Real-time Tracking</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">🤖</span>
                                <span>AI Assistant</span>
                            </div>
                            <div className="feature">
                                <span className="feature-icon">📊</span>
                                <span>Smart Analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;