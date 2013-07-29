define([
    "backbone",
    "app/models/designModel"
], function(Backbone, DesignModel) {
    return Backbone.Collection.extend({
        model: DesignModel,
        url : "assets/data/design.json"
    })
})