'use strict';

// import React from 'react';  //ES6
// import ReactDom from 'react-dom';
var React = require('react');
var ReactDom = require('react-dom');


// class LiwyGallery extends React.Component{  //ES6
//     render() {
//         return (
//             <div>Hello world!</div>
//         );
//     }
// };

var LiwyGallery = React.createClass({
    render: function() {
        return <div>Hello world!</div>;
    }
});

ReactDom.render(
    <LiwyGallery />,
    document.getElementById('content')
);

// export default LiwyGallery;  //ES6
module.exports = LiwyGallery;