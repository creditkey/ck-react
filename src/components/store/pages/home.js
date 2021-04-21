import React from "react";
// import Page from "../page";

export default () => {
  return (
    <div className="homepage-wrapper">
      <main>
      <div className="columns is-multiline">
        <div className="column is-full">
          <img alt="banner1" src="/images/banners/home-page-banner1.jpg" />
        </div>
        <div className="column is-one-third">
          <img alt="banner2" src="/images/banners/home-page-banner2.jpg" />
        </div>
        <div className="column is-two-thirds">
          <img alt="banner3" src="/images/banners/home-page-banner3.jpg" />
        </div>
      </div>
        <div className="has-text-centered mt-6">
          <h2>Shop by Category</h2>
        </div>
      <div className="columns shop-by-cat">
        <div className="column is-one-third card">
          <div class="media">
            <figure class="media-left">
              <p class="image">
                <img alt="supplies" src="/images/supplies.png" />
                </p>
              </figure>
              <div>
                <div>
                <h3><a href="/store/tabletop">Supplies</a></h3>
                  <ul>
                    <li>Ice Trays </li>
                    <li>Freon Tanks</li>
                    <li>Racks &amp; Shelves</li>
                    <li>Sprockets</li>
                  </ul>
                </div>
              </div>
          </div>     
        </div>
        <div className="column is-one-third card">
          <div class="media">
            <figure class="media-left">
              <p class="image">
                <img alt="equipment" src="/images/equipment.png" />
                </p>
              </figure>
              <div>
                <div>
                <h3><a href="/store/ice-machines">Equipment</a></h3>
                  <ul>
                    <li>Automatic Equipment</li>
                    <li>Ice Machines</li>
                    <li>Chest Freezers</li>
                    <li>Walk-Ins</li>
                  </ul>
                </div>
              </div>
          </div>  
        
        </div>
        <div className="column is-one-third card">
          <div class="media">
            <figure class="media-left">
              <p class="image">
                <img alt="packages" src="/images/packages.png" />
                </p>
              </figure>
              <div>
                <div>
                <h3><a href="/store/disposables">Packages</a></h3>
                  <ul>
                    <li>Starter &amp; DIY Kits</li>
                    <li>Mega Shop</li>
                    <li>Dust Collection</li>
                    <li>Insulation Kits</li>
                  </ul>
                </div>
              </div>
          </div> 
        </div>
      </div>
  
      </main>
    </div>
  );
};
