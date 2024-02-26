"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
require("./flx.global.upload.css");
var Single_1 = tslib_1.__importDefault(require("./Single"));
var Multiple_1 = tslib_1.__importDefault(require("./Multiple"));
var Error_1 = tslib_1.__importDefault(require("./Error"));
var Svg_1 = tslib_1.__importDefault(require("./Svg"));
var SelectComponents = {
    single: Single_1.default,
    multiple: Multiple_1.default,
};
var Upload = function (_a) {
    var multiple = _a.multiple, single = _a.single, response = _a.response, _b = _a.selected, selected = _b === void 0 ? "" : _b, _c = _a.type, type = _c === void 0 ? [] : _c, _d = _a.api, api = _d === void 0 ? {
        ssr: false,
        url: "",
    } : _d, _e = _a.placeholder, placeholder = _e === void 0 ? {
        icon: "",
        text: "",
        button: ""
    } : _e, _f = _a.settings, settings = _f === void 0 ? {
        imageInfo: false,
        preview: false,
        limit: 5,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    } : _f;
    if (!multiple && !single) {
        return react_1.default.createElement(Error_1.default, { type: 'type_not_selected' });
    }
    else if (typeof response !== "function") {
        return react_1.default.createElement(Error_1.default, { type: 'response_not_install' });
    }
    else {
        var Component;
        if (multiple) {
            Component = SelectComponents["multiple"];
        }
        else {
            Component = SelectComponents["single"];
        }
        return react_1.default.createElement(Component, { api: api, type: type, selected: selected, settings: {
                imageInfo: settings.imageInfo || false,
                preview: settings.preview || false,
                limit: settings.limit || 5,
                imageType: settings.imageType || ["image/png"],
                imageSize: settings.imageSize || "3MB",
                imagePixel: settings.imagePixel || "1080X1080"
            }, response: response, placeholder: {
                icon: placeholder.icon || react_1.default.createElement(Svg_1.default, { icon: 'image' }),
                text: placeholder.text || "Upload File",
                button: placeholder.button || "Upload Files"
            } });
    }
};
exports.default = Upload;
//# sourceMappingURL=Upload.js.map