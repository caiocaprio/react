import React from 'react';
import PropTypes from 'prop-types';
// import Cards from '../cards/Cards';
// import GitHub from '../github/GitHub';
import Contentful from '../contentful/Contentful';
import Header from '../header/Header';


const App = ({ title }) => (
     <div className="teste">

         <Header/>
         {/* <h1>{title}</h1>
         <Cards /> */}
        <div className="container">
            <Contentful/>
        </div>
     </div>

);

App.propTypes = {
    title: PropTypes.string.isRequired
};

export default App;
