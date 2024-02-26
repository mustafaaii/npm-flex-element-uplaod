"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Svg_1 = tslib_1.__importDefault(require("./Svg"));
require("./flx.error.css");
var Error = function (_a) {
    var type = _a.type;
    var ErrorHead = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { "data-error-icon": true },
                react_1.default.createElement(Svg_1.default, { icon: "hammer" })),
            react_1.default.createElement("div", { "data-error-title": true },
                "Flex Element ",
                react_1.default.createElement("span", { "data-text-color": true, style: { marginLeft: "4px" } }, " Upload")),
            react_1.default.createElement("div", { "data-error-text": true }, "Upload element indicates the following deficiencies")));
    };
    switch (type) {
        case "type_not_selected": return (react_1.default.createElement("div", { className: "flx" },
            react_1.default.createElement("div", { "data-error-container": true },
                react_1.default.createElement("div", { "data-error-body": true },
                    react_1.default.createElement(ErrorHead, null),
                    react_1.default.createElement("div", { "data-error-item": true },
                        react_1.default.createElement("div", { "data-error-item-icon": true },
                            react_1.default.createElement(Svg_1.default, { icon: "hammer" })),
                        react_1.default.createElement("div", { "data-error-item-title": true },
                            "Type must be declared for ",
                            react_1.default.createElement("b", null, "<Upload />"),
                            ". What do you want to do ?")),
                    react_1.default.createElement("div", { "data-error-info": true },
                        react_1.default.createElement("pre", null,
                            react_1.default.createElement("code", null,
                                react_1.default.createElement("span", { style: { color: "#00f56e" } }, "<Select"),
                                react_1.default.createElement("span", { style: { color: "#ff6574", marginLeft: "8px", marginRight: "8px" } }, " single OR multiple"),
                                react_1.default.createElement("span", { style: { color: "#00f56e" } }, "/>"))))))));
        case "response_not_install": return (react_1.default.createElement("div", { className: "flx" },
            react_1.default.createElement("div", { "data-error-container": true },
                react_1.default.createElement("div", { "data-error-body": true },
                    react_1.default.createElement(ErrorHead, null),
                    react_1.default.createElement("div", { "data-error-item": true },
                        react_1.default.createElement("div", { "data-error-item-icon": true },
                            react_1.default.createElement(Svg_1.default, { icon: "hammer" })),
                        react_1.default.createElement("div", { "data-error-item-title": true },
                            "Response must be declared for ",
                            react_1.default.createElement("b", null, "<Upload />"),
                            ". What do you want to do ?")),
                    react_1.default.createElement("div", { "data-error-info": true },
                        react_1.default.createElement("pre", null,
                            react_1.default.createElement("code", null,
                                react_1.default.createElement("span", { style: { color: "#00f56e" } }, "<Select"),
                                react_1.default.createElement("span", { style: { color: "#ff6574", marginLeft: "8px", marginRight: "8px" } }, "response={(e)=>{}}"),
                                react_1.default.createElement("span", { style: { color: "#00f56e" } }, "/>"))))))));
        default:
            return "";
    }
};
exports.default = Error;
//# sourceMappingURL=Error.js.map