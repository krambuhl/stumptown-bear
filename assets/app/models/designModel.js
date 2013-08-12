define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: "Project",
            description: "Responsibilities",
            
            images: [{ src: "http://stream.stumptownbear.com/portfolio/wt-today/overview.jpg" }]
        }
    })
})