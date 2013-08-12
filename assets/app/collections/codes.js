define([
    "backbone",
    "app/models/codeModel"
], function(Backbone, CodeModel) {
    return Backbone.Collection.extend({
        model: CodeModel,
        url : "assets/data/code.json"
    })
})