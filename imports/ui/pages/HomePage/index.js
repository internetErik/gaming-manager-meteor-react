import React from 'react';

import HeadingPrimary from '../../components/HeadingPrimary';

const HomePage = ({ currentUser }) => (
<main className="home-page grid-container">
  <HeadingPrimary
    text={`Welcome ${ currentUser.username }`}
  />
  <hr />
  <section className="p20-0 m20-0">
    <a
      href="https://docs.google.com/document/d/1fhU4Yi9iTAPeSsHforCmueETGnhwSMLu3P_VXZPjkkY/edit?usp=sharing"
      target="_blank"
    >
    D&amp;D Mechanics (Google Doc)
    </a>
  </section>
</main>
)

export default HomePage;
