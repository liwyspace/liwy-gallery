'use strict';

describe('liwy gallery test', function() {
    var React = require('react');
    var GalleryByReactApp, component;

    beforeEach(function(){
        var container = document.createElement('div');
        container.id = 'content';
        document.body.appendChild(container);

        GalleryByReactApp = require('components/liwy-gallery.js');
        component = React.createElement(GalleryByReactApp);
    });

    it('should create a new instance of GalleryByReactApp', function() {
        expect(component).toBeDefined();
    });
});
