define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Posts = Backbone.Model.extend({

            urlRoot: "http://localhost/TestBlog/server/posts",
            
            initialize: function () {
                this.comments = new PostsCollection();
                this.comments.url = this.urlRoot + "/" + this.id + "/comments";
            }
            

        }),

        PostsCollection = Backbone.Collection.extend({

            model: Posts,

            url: "http://localhost/TestBlog/server/posts",

        });

    return {
        Posts: Posts,
        PostsCollection: PostsCollection
    };

});