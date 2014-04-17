define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "home": "home",
            "post/:id": "postDetails",
            "post/:id/edit": "editPost",
            "new": "editPost",
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        postDetails: function (id) {
        
            require(["app/models/jsonp/post", "app/views/Post", "app/views/Comments"], function (models,PostView,CommentsView) {
                var post = new models.Posts({id: id});
                post.fetch({
                    success: function (data) {
                        slider.slidePage(new PostView({model: data}).$el);
                        $('.comments').html(new CommentsView({model: data}).$el);
                    }
                });
            });
        },
        editPost: function(id){
            console.log (id+" edit");
        },


        reports: function (id) {
            require(["app/models/employee", "app/views/Reports"], function (models, ReportsView) {
                var employee = new models.Employee({id: id});
                employee.fetch({
                    success: function (data) {
                        slider.slidePage(new ReportsView({model: data}).$el);
                    }
                });
            });
        }

    });

});