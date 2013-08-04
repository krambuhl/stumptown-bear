define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            year: "2001",
            story: "Behind every man now alive stand thirty ghosts, for that is the ratio by which the dead outnumber the living."
        }
    })
})
