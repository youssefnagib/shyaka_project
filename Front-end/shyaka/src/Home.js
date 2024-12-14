const Home = () => {
    return (
    <div>
        <header style={headerStyle}>
        <h1>SHYAKA</h1>
        <p>Your ultimate destination for Men's and Women's clothing</p>
        </header>

        <div className="hero" style={heroStyle}>
        <h2>Stylish & Affordable Clothing</h2>
        </div>

        <section id="men" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Men's Wear</h2>
        <div className="products" style={productContainerStyle}>
            <div className="product" style={productStyle}>
            <img src="https://via.placeholder.com/300x200" alt="Men's Shirt" style={productImageStyle} />
            <h3>Men's Shirt</h3>
            <p>500LE</p>
            </div>
            <div className="product" style={productStyle}>
            <img src="https://via.placeholder.com/300x200" alt="Men's Trousers" style={productImageStyle} />
            <h3>Men's Trousers</h3>
            <p>700LE</p>
            </div>
        </div>
        </section>

        <section id="women" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Women's Wear</h2>
        <div className="products" style={productContainerStyle}>
            <div className="product" style={productStyle}>
            <img src="https://via.placeholder.com/300x200" alt="Women's Dress" style={productImageStyle} />
            <h3>Women's Dress</h3>
            <p>800LE</p>
            </div>
            <div className="product" style={productStyle}>
            <img src="https://via.placeholder.com/300x200" alt="Women's Top" style={productImageStyle} />
            <h3>Women's Top</h3>
            <p>600LE</p>
            </div>
        </div>
        </section>

        <section id="offers" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Special Offers</h2>
        <p style={centerTextStyle}>Get up to 50% off on selected items!</p>
        </section>

        <section id="contact" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Contact Us</h2>
        <p style={centerTextStyle}>
            Email: <a href="mailto:shyaka@fashionhub.com">shyaka@fashionhub.com</a>
        </p>
        <p style={centerTextStyle}>Phone: 01010182368</p>
        </section>

        <footer style={footerStyle}>
        <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
        </footer>
    </div>
    );
}

// Inline styles for the React component
const headerStyle = {
    backgroundColor: '#979687',
    color: 'white',
    padding: '20px 10px',
    textAlign: 'center',
};

const heroStyle = {
    background: 'url("https://via.placeholder.com/1200x600/92c952") no-repeat center center/cover',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
};

const sectionStyle = {
    padding: '20px',
};

const sectionTitleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
};

const productContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
};

const productStyle = {
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    width: '30%',
    textAlign: 'center',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(176, 177, 167, 0.1)',
};

const productImageStyle = {
    maxWidth: '100%',
    borderRadius: '5px',
};

const centerTextStyle = {
    textAlign: 'center',
};

const footerStyle = {
    backgroundColor: '#a8a2a2',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    marginTop: '20px',
};

export default Home