"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useFormBuilder = function () {
    var _a = (0, react_1.useState)([]), sections = _a[0], setSections = _a[1];
    var addSection = function (title) {
        setSections(__spreadArray(__spreadArray([], sections, true), [{ id: Date.now().toString(), title: title, fields: [] }], false));
    };
    var addField = function (sectionId, field) {
        setSections(sections.map(function (section) {
            return section.id === sectionId ? __assign(__assign({}, section), { fields: __spreadArray(__spreadArray([], section.fields, true), [field], false) }) : section;
        }));
    };
    return { sections: sections, addSection: addSection, addField: addField };
};
exports.default = useFormBuilder;
