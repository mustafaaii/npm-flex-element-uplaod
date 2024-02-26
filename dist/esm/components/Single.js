import { __awaiter, __generator } from "tslib";
import axios from "axios";
import Svg from "./Svg";
import "./flx.single-upload.css";
import React, { useEffect, useRef, useState } from "react";
var Single = function (_a) {
    var _b = _a.placeholder, placeholder = _b === void 0 ? { icon: React.createElement(Svg, { icon: 'image' }), text: "Upload File", button: "Upload Files" } : _b, response = _a.response, selected = _a.selected, _c = _a.api, api = _c === void 0 ? { ssr: false, url: "" } : _c, _d = _a.settings, settings = _d === void 0 ? {
        imageInfo: false,
        preview: false,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    } : _d;
    var fileRef = useRef(null);
    var _e = useState(false), Upload = _e[0], setUpload = _e[1];
    var _f = useState({ error: 0, status: false, size: "", type: "", pixel: "" }), FileInfo = _f[0], setFileInfo = _f[1];
    var _g = useState(""), Blob = _g[0], setBlob = _g[1];
    var _h = useState(""), File = _h[0], setFile = _h[1];
    var _j = useState(false), Status = _j[0], setStatus = _j[1];
    var _k = useState(false), UploadResult = _k[0], setUploadResult = _k[1];
    var _l = useState(false), Highlight = _l[0], setHighlight = _l[1];
    var onFileType = function (type) {
        switch (type) {
            case "text/html": return "Html";
            case "text/css": return "Css";
            case "text/javascript": return "Javascript";
            case "application/json": return "Json";
            case "application/xml": return "Xml";
            case "application/pdf": return "Pdf";
            case "application/msword": return "Doc";
            case "application/vnd.ms-excel": return "Xls";
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "Docx";
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": return "Xlsx";
            case "application/zip": return "Zip";
            case "application/x-zip-compressed": return "Zip";
            case "image/jpeg": return "jpeg";
            case "image/png": return "png";
            case "image/gif": return "gif";
            case "image/bmp": return "bmp";
            case "image/tiff": return "tiff";
            case "image/webp": return "webp";
            case "image/svg+xml": return "Svg";
            case "audio/mpeg": return "mpeg";
            case "audio/wav": return "wav";
            case "audio/ogg": return "ogg";
            case "video/mp4": return "mp4";
            case "video/mpeg": return "mpeg";
            case "video/webm": return "webm";
            default: return "";
        }
    };
    var onFileSize = function (byte) {
        var units = ['B', 'KB', 'MB', 'GB'];
        var unitIndex = 0;
        var size = byte;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return size.toFixed(2) + '' + units[unitIndex];
    };
    var onDragOver = function (e) {
        e.preventDefault();
    };
    var onTypeControl = function (type) {
        switch (type) {
            case "image/jpeg": return true;
            case "image/png": return true;
            case "image/gif": return true;
            case "image/bmp": return true;
            case "image/tiff": return true;
            case "image/webp": return true;
            case "image/svg+xml": return true;
            default: return false;
        }
    };
    var onFile = function (e, t) {
        e.preventDefault();
        var reader = new FileReader();
        setFileInfo({ error: 0, status: false, size: "", type: "", pixel: "" });
        var file = t === "onDrop" ? e.dataTransfer.files[0] : e.target.files[0];
        if (file) {
            var blob = URL.createObjectURL(file);
            if (onTypeControl(file.type)) {
                reader.onload = function (event) {
                    var image = new Image();
                    image.src = event.target.result;
                    image.onload = function () {
                        setBlob(blob);
                        var eTypes = settings.imageType.filter(function (d) { return (d === file.type); });
                        var eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
                        var eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
                        var tSize = 0;
                        if (eUnits === "MB") {
                            tSize = eSize * 1024 * 1024;
                        }
                        if (eUnits === "KB") {
                            tSize = eSize * 1024;
                        }
                        if (eTypes.length === 0) {
                            setFileInfo({ error: 1, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: "".concat(image.width, "X").concat(image.height) });
                        }
                        else {
                            var getPixel = settings.imagePixel.split("X");
                            if (parseInt(getPixel[0]) < image.width || parseInt(getPixel[1]) < image.height) {
                                setFileInfo({ error: 2, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: "".concat(image.width, "X").concat(image.height) });
                            }
                            else {
                                if (file.size > tSize) {
                                    setFileInfo({ error: 3, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: "".concat(image.width, "X").concat(image.height) });
                                }
                                else {
                                    setFileInfo({ error: 0, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: "".concat(image.width, "X").concat(image.height) });
                                }
                            }
                        }
                        setStatus(true);
                    };
                };
                reader.readAsDataURL(file);
            }
            setFile(file);
            if (!api.ssr) {
                response(file);
            }
        }
        if (fileRef === null || fileRef === void 0 ? void 0 : fileRef.current) {
            fileRef.current.value = "";
        }
    };
    var onUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new FormData();
                    data.append('flx_file', File);
                    return [4 /*yield*/, axios.post(api.url, data)];
                case 1:
                    result = (_a.sent()).data;
                    if (result.status === true) {
                        setUploadResult(true);
                        response({ image: result.file, size: FileInfo.size, type: FileInfo.type, pixel: FileInfo.pixel });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (Upload && api.ssr) {
            onUpload();
        }
    }, [Upload]);
    useEffect(function () {
        if (UploadResult) {
            setTimeout(function () {
                setUploadResult(false);
                setFileInfo({ error: 0, status: false, size: "", type: "", pixel: "" });
                setStatus(false);
                setUpload(false);
                setFile("");
                setBlob("");
            }, 2000);
        }
    }, [UploadResult]);
    useEffect(function () {
        if (selected) {
            setBlob(selected["image"]);
            setFileInfo({ error: 0, status: true, size: selected["size"], type: selected["type"], pixel: selected["pixel"] });
            setStatus(true);
        }
    }, [selected]);
    return (React.createElement("div", { className: "flx" },
        React.createElement("div", { "data-su": "container", onDragOver: function (e) { onDragOver(e); }, onDrop: function (e) { onFile(e, "onDrop"); }, onClick: function () { Status === false && (fileRef === null || fileRef === void 0 ? void 0 : fileRef.current.click()); } },
            React.createElement("div", { "data-su": "body", className: UploadResult === true ? "disbled" : "", style: { backgroundImage: "url(".concat(Blob, ")") } },
                React.createElement("div", { "data-su": "placeholder", className: Status === false ? "active" : "" },
                    React.createElement("div", null,
                        React.createElement("div", { "data-su": "placeholder-icon" }, placeholder.icon),
                        React.createElement("div", { "data-su": "placeholder-text" }, placeholder.text))),
                React.createElement("input", { ref: fileRef, type: "file", onChange: function (e) { onFile(e, "onClick"); }, hidden: true }),
                React.createElement("div", { "data-su": "close-icon", className: Status === true ? "active" : "", onClick: function () { setStatus(false); setBlob(""); } },
                    React.createElement("svg", { viewBox: "0 0 512 512" },
                        React.createElement("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", strokeMiterlimit: "10", strokeWidth: "32" }),
                        React.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "32", d: "M320 320L192 192M192 320l128-128" })))),
            React.createElement("div", { "data-su": "info" },
                React.createElement("div", { "data-su": "info-body", className: settings.imageInfo && Status === true ? "active" : "" },
                    FileInfo["error"] === 0 &&
                        React.createElement(React.Fragment, null,
                            React.createElement("div", { "data-su": "item" },
                                React.createElement("span", { "data-su": "weight-600" },
                                    " ",
                                    FileInfo["size"])),
                            React.createElement("div", { "data-su": "item" },
                                React.createElement("span", { style: { fontWeight: "600" } }),
                                React.createElement("span", { "data-su": "weight-600" },
                                    " ",
                                    FileInfo["type"])),
                            React.createElement("div", { "data-su": "item" },
                                React.createElement("span", { "data-su": "weight-600" },
                                    " ",
                                    FileInfo["pixel"])),
                            settings.preview &&
                                React.createElement("div", { "data-su": "item-icon", onClick: function () { setHighlight(true); } },
                                    React.createElement(Svg, { icon: "zoom" }))),
                    FileInfo["error"] === 1 &&
                        React.createElement("div", { "data-su": "item-error" }, "The file type you selected is not compatible."),
                    FileInfo["error"] === 2 &&
                        React.createElement("div", { "data-su": "item-error" },
                            "The file pixel you selected is larger than ",
                            settings.imagePixel,
                            "."),
                    FileInfo["error"] === 3 &&
                        React.createElement("div", { "data-su": "item-error" },
                            "The file size you selected is larger than ",
                            settings.imageSize,
                            "."))),
            React.createElement("div", { "data-su": "success-upload", className: UploadResult === true ? "active" : "" },
                React.createElement(Svg, { icon: "check" }))),
        React.createElement("div", { "data-su": "button-container" },
            React.createElement("div", { "data-su": "button-body", className: api.ssr === true && File !== "" ? "active" : "" },
                React.createElement("div", { "data-su": "button", onClick: function () { FileInfo.error === 0 && setUpload(true); } }, placeholder.button))),
        React.createElement("div", { "data-go": "highlight-container", className: Highlight === true ? "active" : "", onClick: function () { setHighlight(false); } },
            React.createElement("div", { "data-go": "highlight-body", className: Highlight === true ? "active" : "", style: { backgroundImage: "url(".concat(Blob, ")") } },
                React.createElement("div", { "data-go": "highlight-close", onClick: function () { setHighlight(false); } },
                    React.createElement(Svg, { icon: "close" }))))));
};
export default Single;
//# sourceMappingURL=Single.js.map