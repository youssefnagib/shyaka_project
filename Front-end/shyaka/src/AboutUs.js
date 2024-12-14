import React from 'react';
import './AboutUs.css'; // Separate CSS file for styling
import nagibImage from "./nagib.jpg";
import AlxImage from "./alx.jpg";

const AboutUs = () => {
    return (
        <div>
            <header className="about-header">
                <h1>About Us</h1>
                <p>Your trusted partner in fashion and style.</p>
            </header>
            <section className="about-section">
                <h2 className="section-title">Who We Are</h2>
                <p>
                    At Shyaka, we believe that fashion is a form of self-expression. Our mission is to provide
                    high-quality, stylish, and affordable clothing for both men and women. Established in 2024,
                    we have grown to become a trusted name in the fashion industry, offering a wide range of products
                    that cater to all tastes and occasions.
                </p>
                <p>
                    Our vision is to inspire confidence and individuality through fashion, and our team is dedicated to
                    making sure every customer feels their best in what they wear.
                </p>
            </section>
            <section className="team-section">
                <h2 className="section-title">Meet Our Team</h2>
                <div className="team">
                    <div className="team-member">
                        <img src={nagibImage} alt="Youssef Nagib" />
                        <h3>Youssef Nagib</h3>
                        <p>Creative Director</p>
                    </div>
                    <div className="team-member">
                        <img src={AlxImage} alt="alx" />
                        <h3>ALX</h3>
                        <p>Supported By</p>
                    </div>
                </div>
            </section>
            <footer className="about-footer">
                <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
