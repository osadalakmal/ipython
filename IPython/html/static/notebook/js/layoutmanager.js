// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

define([
    'base/js/namespace',
    'jquery',
], function(IPython, $) {
    "use strict";

    var LayoutManager = function () {
        this.bind_events();
        this.pager = undefined;
    };

    LayoutManager.prototype.bind_events = function () {
        $(window).resize($.proxy(this.do_resize,this));
    };

    LayoutManager.prototype.app_height = function() {
        var win = $(window);
        var w = win.width();
        var h = win.height();
        var header_height;
        if ($('div#header').css('display') === 'none') {
            header_height = 0;
        } else {
            header_height = $('div#header').outerHeight(true);
        }
        var menubar_height;
        if ($('div#menubar-container').css('display') === 'none') {
            menubar_height = 0;
        } else {
            menubar_height = $('div#menubar-container').outerHeight(true);
        }
        return h-header_height-menubar_height; // content height
    };

    LayoutManager.prototype.do_resize = function () {
        var app_height = this.app_height();  // content height

        $('#ipython-main-app').height(app_height);  // content+padding+border height
        if (this.pager) {
            var pager_height = this.pager.percentage_height*app_height;
            var pager_splitter_height = $('div#pager_splitter').outerHeight(true);
            $('div#pager').outerHeight(pager_height);
            if (this.pager.expanded) {
                $('div#notebook').outerHeight(app_height-pager_height-pager_splitter_height);
            } else {
                $('div#notebook').outerHeight(app_height-pager_splitter_height);
            }    
        }
    };

    // Backwards compatability.
    IPython.LayoutManager = LayoutManager;

    return {'LayoutManager': LayoutManager};
});
