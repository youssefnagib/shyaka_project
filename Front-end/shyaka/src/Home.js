import Homeimage from "./home.jpg"
import Homeimage2 from "./OIP.jpeg"
import gifhappy from "./giphy.webp"

const Home = () => {
    return (
    <div>
        <header style={headerStyle}>
        <h1>SHYAKA</h1>
        <p>Your ultimate destination for Men's and Women's clothing</p>
        </header>

        {/* <div className="hero" style={heroStyle}>
        <h2>Stylish & Affordable Clothing</h2>
        </div> */}

        <div className="container" style={happystyle}>
    <h2 style={headingStyle}>New Year, New Look, New You!</h2>
    <img src={gifhappy} alt="Happy New Year Celebration" style={imgStyle} />
    <p style={paragraphStyle}>
        Happy New Year from Shyaka! Step into 2025 with confidence and style. 
        Discover our latest collection and start the year looking your best. 
        Let’s make this year your most fashionable one. <br />
        <strong style={strongStyle}>Shop now</strong> and celebrate in style!
    </p>
</div>


{/* 
        <section id="men" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Men's Wear</h2>
        <div className="products" style={productContainerStyle}>
            <div className="product" style={productStyle}>
            <img src="https://via.placeholder.com/300x20" alt="Men's Shirt" style={productImageStyle} />
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
        </section> */}

        {/* <section id="offers" style={sectionStyle}>
        <h2 className="section-title" style={sectionTitleStyle}>Special Offers</h2>
        <p style={centerTextStyle}>Get up to 50% off on selected items!</p>
        </section> */}


        <footer style={footerStyle}>

        <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
        </footer>
    </div>
    );
}
// style section
const headerStyle = {
    backgroundImage: `url(${Homeimage2})`,
    color: 'white',
    padding: '20px 10px',
    textAlign: 'center',
    height: "300px",
    textShadow: '0 2px 5px rgba(0, 0, 0, 1)',
};

const happystyle = {
    backgroundColor: '#f4f9ff',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    margin: '20px auto',
    maxWidth: '600px', // Centered and constrained width
};

const strongStyle = {
    color: '#d97706', // Highlighted call-to-action
    fontWeight: 'bold',
};
const paragraphStyle = {
    fontSize: '1rem',
    color: '#555', // Neutral text color for readability
    lineHeight: '1.6',
    margin: '10px 0',
};
const imgStyle = {
    width: '100%', // Responsive image size
    maxWidth: '300px', // Prevents image from becoming too large
    margin: '15px auto',
    display: 'block', // Centers the image
    borderRadius: '10px', // Smooth corners
};
const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2b6cb0', // Vibrant blue for festive vibes
    marginBottom: '10px',
};



const heroStyle = {
    backgroundImage: `url(${Homeimage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
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