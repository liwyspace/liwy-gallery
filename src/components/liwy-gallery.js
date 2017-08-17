'use strict';

// import React from 'react';  //ES6
// import ReactDom from 'react-dom';
var React = require('react');
var ReactDom = require('react-dom');

//css
require('normalize.css');
require('styles/main.scss');



// // 获取图片相关的数据
// var imageDatas = require('../data/imageDatas.json');

// // 利用自执行函数， 将图片名信息转成图片URL路径信息
// imageDatas = (function genImageURL(imageDatasArr) {
//     for (var i = 0, j = imageDatasArr.length; i < j; i++) {
//         var singleImageData = imageDatasArr[i];

//         singleImageData.imageURL = require('images/' + singleImageData.fileName);

//         imageDatasArr[i] = singleImageData;
//     }

//     return imageDatasArr;
// })(imageDatas);




//舞台组件
// class LiwyGallery extends React.Component{  //ES6
//     render() {
//         return (
//             <div style={{color:'#ff0000',fontSize:'20px'}}>Hello world!</div>
//         );
//     }
// };
var LiwyGallery = React.createClass({
    render: function() {
        return (
        	<section className="stage">
        		<section className="img-sec"></section>
        		<section className="controller-nav"></section>
        	</section>
        );
    }
});

ReactDom.render(
    <LiwyGallery />,
    document.getElementById('content')
);

// export default LiwyGallery;  //ES6
module.exports = LiwyGallery;