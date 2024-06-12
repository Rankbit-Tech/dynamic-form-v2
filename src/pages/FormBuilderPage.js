"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FormBuilderTemplate_1 = require("@components/templates/FormBuilderTemplate");
var useFormStore_1 = require("@store/useFormStore");
var inputFieldConstants_1 = require("@constants/inputFieldConstants");
var core_1 = require("@dnd-kit/core");
var FormBuilderPage = function () {
    var addField = (0, useFormStore_1.useFormStore)().addField;
    var handleDragEnd = function (event) {
        var active = event.active, over = event.over;
        if (over) {
            var sectionId = over.id;
            var newField = inputFieldConstants_1.default[active.id].construct();
            addField(sectionId, newField);
        }
    };
    return (<core_1.DndContext onDragEnd={handleDragEnd}>
            <FormBuilderTemplate_1.default />
        </core_1.DndContext>);
};
exports.default = FormBuilderPage;
