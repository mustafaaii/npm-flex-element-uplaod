import React from 'react';
import "./flx.global.upload.css";
import Single from './Single';
import Multiple from './Multiple';
import Error from './Error';
import Svg from './Svg';
var SelectComponents = {
    single: Single,
    multiple: Multiple,
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
        return React.createElement(Error, { type: 'type_not_selected' });
    }
    else if (typeof response !== "function") {
        return React.createElement(Error, { type: 'response_not_install' });
    }
    else {
        var Component;
        if (multiple) {
            Component = SelectComponents["multiple"];
        }
        else {
            Component = SelectComponents["single"];
        }
        return React.createElement(Component, { api: api, type: type, selected: selected, settings: {
                imageInfo: settings.imageInfo || false,
                preview: settings.preview || false,
                limit: settings.limit || 5,
                imageType: settings.imageType || ["image/png"],
                imageSize: settings.imageSize || "3MB",
                imagePixel: settings.imagePixel || "1080X1080"
            }, response: response, placeholder: {
                icon: placeholder.icon || React.createElement(Svg, { icon: 'image' }),
                text: placeholder.text || "Upload File",
                button: placeholder.button || "Upload Files"
            } });
    }
};
export default Upload;
//# sourceMappingURL=Upload.js.map