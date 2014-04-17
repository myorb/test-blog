define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        Comments = Backbone.Model.extend({

            urlRoot: "http://localhost/TestBlog/server/comments",

            

        }),

        CommentsCollection = Backbone.Collection.extend({

            model: Comments,

            url: "http://localhost/TestBlog/server/comments",

        });

    return {
        Comments: Comments,
        CommentsCollection: CommentsCollection
    };

});