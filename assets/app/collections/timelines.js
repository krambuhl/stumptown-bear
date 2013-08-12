define([
    "backbone",
    "app/models/timelineModel"
], function(Backbone, TimelineModel) {
    return Backbone.Collection.extend({
        model: TimelineModel,
        url : "assets/data/timeline.json"
    })
})