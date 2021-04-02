import React from "react";

export default (props) => {
    return <>{
        <footer>
            <div className="container">
                <div className="columns">
                    <div className="column is-one-fourth">
                        <h3>LEARN</h3>
                        <ul>
                            <li>The Story</li>
                            <li>How-to Videos</li>
                            <li>FAQ</li>
                            <li>eBook Downloads</li>
                            <li>Online Courses</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="column is-one-fourth">
                    <h3>JOIN FOR FREE</h3>
                        <p>Join thousands already earning rewards, saving money, and growing their  business.</p>
                    </div>
                    <div className="column is-one-fourth">
                        <h3>CONTACT</h3>
                        <p>1-310-555-1212</p>
                        <br></br>
                        <p>Mon - Fri, 7AM - 4PM Pacific</p>
                    </div>
                    <div className="column is-one-fourth">
                        <h3>FOLLOW US</h3>    
                        <ul className="pdp-share">
                    <li>
                    <a 
                        target="_blank"
                        href="https://www.facebook.com/CreditKeyB2B"
                        rel="noopener noreferrer"
                    >
                        <img src="/images/social/facebook.png" />

                    </a>
                    </li>
                    <li>
                    <a target="_blank"
                        href="https://twitter.com/getcreditkey"
                        rel="noopener noreferrer"
                    >
                       <img src="/images/social/twitter.png" />
                    </a>
                    </li>
                    <li>
                    <a target="_blank"
                        href="https://www.linkedin.com/company/credit-key"
                        rel="noopener noreferrer"
                    >
                        <img src="/images/social/instagram.png" />
                    </a>
                    </li>
                    <li>
                    <a target="_blank"
                        href="#"
                        rel="noopener noreferrer"
                    >
                        <img src="/images/social/pintrest.png" />
                    </a>
                    </li>
                    <li>
                    <a target="_blank"
                        href="#"
                        rel="noopener noreferrer"
                    >
                        <img src="/images/social/youtube.png" />
                    </a>
                    </li>
                    <li>
                    <a target="_blank"
                        href="#"
                        rel="noopener noreferrer"
                    >
                        <img src="/images/social/linkedin.png" />
                    </a>
                    </li>
                </ul>
                    </div>
                </div>
            </div>
        </footer>
    }</>;
}

