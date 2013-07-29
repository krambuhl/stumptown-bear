define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: "Project",
            subTitle: "Responsibilities",
            
            images: [
                "http://stream.stumptownbear.com/portfolio/wt-today/overview.jpg",
                "http://stream.stumptownbear.com/portfolio/wt-today/webtrends.jpg"
            ]
        }
    })
})