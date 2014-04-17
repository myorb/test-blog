define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        PostsListView    = require('app/views/PostsList'),
        models              = require('app/models/jsonp/post'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.postsList = new models.PostsCollection;
            this.postsList.fetch({reset: true, data: {}});
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new PostsListView({collection: this.postsList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress",
            "click span.edit":    "editepost",
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.postsList.fetch({reset: true, data: {title: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        },
        editepost: function(event){
            console.log('edite');
        }

    });

});