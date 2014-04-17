define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Comments.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            console.log('coments init')
            this.render();
        },

         render: function () {
            var that = this;
            this.model.comments.fetch({
                error:function(){console.log('comments render error');},
                success: function (posts) {
                    console.log(posts.toJSON());
                    
                    that.$el.html(template({comments: posts.toJSON()}));
                }       
            });
            return this;
        }

    });

});