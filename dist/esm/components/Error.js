import React from "react";
import Svg from "./Svg";
import "./flx.error.css";
var Error = function (_a) {
    var type = _a.type;
    var ErrorHead = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { "data-error-icon": true },
                React.createElement(Svg, { icon: "hammer" })),
            React.createElement("div", { "data-error-title": true },
                "Flex Element ",
                React.createElement("span", { "data-text-color": true, style: { marginLeft: "4px" } }, " Upload")),
            React.createElement("div", { "data-error-text": true }, "Upload element indicates the following deficiencies")));
    };
    switch (type) {
        case "type_not_selected": return (React.createElement("div", { className: "flx" },
            React.createElement("div", { "data-error-container": true },
                React.createElement("div", { "data-error-body": true },
                    React.createElement(ErrorHead, null),
                    React.createElement("div", { "data-error-item": true },
                        React.createElement("div", { "data-error-item-icon": true },
                            React.createElement(Svg, { icon: "hammer" })),
                        React.createElement("div", { "data-error-item-title": true },
                            "Type must be declared for ",
                            React.createElement("b", null, "<Upload />"),
                            ". What do you want to do ?")),
                    React.createElement("div", { "data-error-info": true },
                        React.createElement("pre", null,
                            React.createElement("code", null,
                                React.createElement("span", { style: { color: "#00f56e" } }, "<Select"),
                                React.createElement("span", { style: { color: "#ff6574", marginLeft: "8px", marginRight: "8px" } }, " single OR multiple"),
                                React.createElement("span", { style: { color: "#00f56e" } }, "/>"))))))));
        case "response_not_install": return (React.createElement("div", { className: "flx" },
            React.createElement("div", { "data-error-container": true },
                React.createElement("div", { "data-error-body": true },
                    React.createElement(ErrorHead, null),
                    React.createElement("div", { "data-error-item": true },
                        React.createElement("div", { "data-error-item-icon": true },
                            React.createElement(Svg, { icon: "hammer" })),
                        React.createElement("div", { "data-error-item-title": true },
                            "Response must be declared for ",
                            React.createElement("b", null, "<Upload />"),
                            ". What do you want to do ?")),
                    React.createElement("div", { "data-error-info": true },
                        React.createElement("pre", null,
                            React.createElement("code", null,
                                React.createElement("span", { style: { color: "#00f56e" } }, "<Select"),
                                React.createElement("span", { style: { color: "#ff6574", marginLeft: "8px", marginRight: "8px" } }, "response={(e)=>{}}"),
                                React.createElement("span", { style: { color: "#00f56e" } }, "/>"))))))));
        default:
            return "";
    }
};
export default Error;
//# sourceMappingURL=Error.js.map