import React from 'react';
import PropTypes from 'prop-types';
// import Cards from '../cards/Cards';
// import GitHub from '../github/GitHub';
// import Contentful from '../contentful/Contentful';
import Header from '../header/Header';
// import styles from './App.scss';

const App = ({ title }) => (
     <div className="teste">
    {/*     <GitHub />
         <h1>{title}</h1>
         <Cards />
         <Contentful/>*/}
         <Header/>
     </div>

);

App.propTypes = {
    title: PropTypes.string.isRequired
};

export default App;
