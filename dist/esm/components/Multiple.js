import { __awaiter, __generator, __spreadArray } from "tslib";
import React, { useEffect, useRef, useState } from "react";
import "./flx.multiple-upload.css";
import Svg from "./Svg";
import axios from "axios";
var Multiple = function (_a) {
    var _b = _a.placeholder, placeholder = _b === void 0 ? { icon: React.createElement(Svg, { icon: 'image' }), text: "Upload File", button: "Upload Files" } : _b, response = _a.response, selected = _a.selected, _c = _a.api, api = _c === void 0 ? { ssr: false, url: "" } : _c, _d = _a.settings, settings = _d === void 0 ? {
        imageInfo: false,
        preview: false,
        limit: 5,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    } : _d;
    var fileRef = useRef(null);
    var _e = useState(false), Upload = _e[0], setUpload = _e[1];
    var _f = useState(0), width = _f[0], setWidth = _f[1];
    var _g = useState([]), DataFile = _g[0], setDataFile = _g[1];
    var _h = useState(""), Highlight = _h[0], setHighlight = _h[1];
    var _j = useState(false), UploadResult = _j[0], setUploadResult = _j[1];
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
            case "image/jpeg": return "JPEG";
            case "image/png": return "PNG";
            case "image/gif": return "GIF";
            case "image/bmp": return "BMP";
            case "image/tiff": return "TIFF";
            case "image/webp": return "WEBP";
            case "image/svg+xml": return "SVG";
            case "audio/mpeg": return "MPEG";
            case "audio/wav": return "WAV";
            case "audio/ogg": return "OGG";
            case "video/mp4": return "MP4";
            case "video/mpeg": return "MPEG";
            case "video/webm": return "WEBM";
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
    var onUnique = function (e) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < e; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };
    var onDrop = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var files, newData, resultFilter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    files = e.dataTransfer.files;
                    if (!files) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(Array.from(files).map(function (f) { return __awaiter(void 0, void 0, void 0, function () {
                            var id, blob, item, eUnits, eSize, tSize, typeResult, image_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        id = onUnique(4);
                                        blob = URL.createObjectURL(f);
                                        eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
                                        eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
                                        tSize = 0;
                                        if (eUnits === "MB") {
                                            tSize = eSize * 1024 * 1024;
                                        }
                                        if (eUnits === "KB") {
                                            tSize = eSize * 1024;
                                        }
                                        typeResult = settings.imageType.filter(function (d) { return (d === f.type); });
                                        if (typeResult.length === 0) {
                                            item = { id: id, error: 1, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                                        }
                                        else {
                                            if (f.size > tSize) {
                                                item = { id: id, error: 3, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                                            }
                                            else {
                                                item = { id: id, error: 0, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                                            }
                                        }
                                        if (!onTypeControl(f.type)) return [3 /*break*/, 2];
                                        image_1 = new Image();
                                        image_1.src = blob;
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                image_1.onload = function () {
                                                    var getPixel = settings.imagePixel.split("X");
                                                    if (parseInt(getPixel[0]) < image_1.width || parseInt(getPixel[1]) < image_1.height) {
                                                        item.pixel = "".concat(image_1.width, "X").concat(image_1.height);
                                                        item.error = 2;
                                                    }
                                                    else {
                                                        item.pixel = "".concat(image_1.width, "X").concat(image_1.height);
                                                        item.error = 0;
                                                    }
                                                    resolve();
                                                };
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, item];
                                }
                            });
                        }); }))];
                case 1:
                    newData = _a.sent();
                    resultFilter = newData.slice(0, settings.limit);
                    setDataFile(__spreadArray(__spreadArray([], DataFile, true), resultFilter, true));
                    _a.label = 2;
                case 2:
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onClick = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var item, _loop_1, blob, t, tSize, getPixel, setPixel, i, resultFile, resultFilter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    item = [];
                    _loop_1 = function (i) {
                        var id, eUnits, eSize, typeResult;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    id = onUnique(4);
                                    blob = URL.createObjectURL(e.target.files[i]);
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            var img = new Image();
                                            img.src = blob;
                                            img.onload = function () { resolve("".concat(img.width, "X").concat(img.height)); };
                                        })];
                                case 1:
                                    t = _b.sent();
                                    eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
                                    eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
                                    tSize = 0;
                                    if (eUnits === "MB") {
                                        tSize = eSize * 1024 * 1024;
                                    }
                                    if (eUnits === "KB") {
                                        tSize = eSize * 1024;
                                    }
                                    typeResult = settings.imageType.filter(function (d) { return (d === e.target.files[i].type); });
                                    if (typeResult.length === 0) {
                                        item[i] = { id: id, error: 1, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                                    }
                                    else {
                                        getPixel = settings.imagePixel.split("X");
                                        setPixel = t.split("X");
                                        if (parseInt(getPixel[0]) < parseInt(setPixel[0]) || parseInt(getPixel[1]) < parseInt(setPixel[1])) {
                                            item[i] = { id: id, error: 2, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                                        }
                                        else {
                                            if (e.target.files[i].size > tSize) {
                                                item[i] = { id: id, error: 3, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                                            }
                                            else {
                                                item[i] = { id: id, error: 0, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                                            }
                                        }
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < e.target.files.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    resultFile = __spreadArray(__spreadArray([], DataFile, true), item, true);
                    resultFilter = resultFile.slice(0, settings.limit);
                    setDataFile(resultFilter);
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var onDelete = function (e) {
        var resultFile = DataFile.filter(function (d) { return (d.id !== e); });
        setDataFile(resultFile);
    };
    var onUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, fd, i, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = new FormData();
                    fd = [];
                    DataFile.forEach(function (item, index) {
                        fd[index] = { image: item.blob, size: item.size, type: item.type, pixel: item.pixel };
                    });
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < DataFile.length)) return [3 /*break*/, 4];
                    data.append('flx_file', DataFile[i].file);
                    return [4 /*yield*/, axios.post(api.url, data)];
                case 2:
                    result = (_a.sent()).data;
                    if (result.status === true) {
                        if (DataFile[i].file !== "") {
                            fd[i] = { image: result.file, size: DataFile[i].size, type: DataFile[i].type, pixel: DataFile[i].pixel };
                        }
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (fileRef === null || fileRef === void 0 ? void 0 : fileRef.current) {
                        fileRef.current.value = '';
                        fileRef.current.disabled = false;
                    }
                    setUpload(false);
                    setWidth(0);
                    response(fd);
                    setDataFile([]);
                    return [2 /*return*/];
            }
        });
    }); };
    var ErrorControl = function () {
        var result = (DataFile || []).filter(function (d) { return (d.error !== 0); });
        if (result.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    useEffect(function () {
        if (UploadResult) {
            setTimeout(function () {
                setUploadResult(false);
            }, 2000);
        }
    }, [UploadResult]);
    useEffect(function () {
        var animationId;
        if (Upload) {
            var start_1 = performance.now();
            var animate_1 = function (time) {
                var elapsed = time - start_1;
                var progress = Math.min(1, elapsed / (1000 * DataFile.length));
                setWidth(progress * 100);
                if (Upload && api.ssr && (progress * 100) === 100) {
                    onUpload();
                }
                if (progress < 1) {
                    animationId = requestAnimationFrame(animate_1);
                }
            };
            animationId = requestAnimationFrame(animate_1);
        }
        return function () {
            cancelAnimationFrame(animationId);
        };
    }, [Upload]);
    useEffect(function () {
        if (!api.ssr) {
            response(DataFile);
        }
    }, [api.ssr, DataFile]);
    useEffect(function () {
        if (selected) {
            setDataFile(function (prevDataBlob) {
                return (selected || []).map(function (d, x) {
                    return { id: prevDataBlob.length + x, error: 0, blob: d["image"], size: d["size"], type: d["type"], pixel: d["pixel"] };
                });
            });
        }
    }, [selected]);
    return (React.createElement("div", { className: "flx" },
        React.createElement("div", { "data-mu": "loader", style: { width: "".concat(width, "%") } }),
        React.createElement("div", { "data-mu": "container", onDragOver: function (e) { onDragOver(e); }, onDrop: function (e) { onDrop(e); } },
            (DataFile || []).map(function (d, x) {
                return (React.createElement("div", { "data-mu": "item", style: { backgroundImage: "url(".concat(d.blob, ")") }, key: "data-mu-item-".concat(x) },
                    React.createElement("div", { "data-mu": "item-close", className: 'active', onClick: function () { onDelete(d["id"]); } },
                        React.createElement(Svg, { icon: "close" })),
                    d["error"] === 0 &&
                        React.createElement("div", { "data-mu": "item-info", className: settings.imageInfo === true ? "active" : "" },
                            React.createElement("div", { "data-mu": "item-info-item" }, d["size"]),
                            React.createElement("div", { "data-mu": "item-info-item" }, d["type"]),
                            React.createElement("div", { "data-mu": "item-info-item" }, d["pixel"]),
                            React.createElement("div", { "data-mu": "item-info-item-icon", onClick: function () { setHighlight(d.blob); } },
                                React.createElement(Svg, { icon: "zoom" }))),
                    d["error"] === 1 &&
                        React.createElement("div", { "data-mu": "item-info-error" }, "Image Type Incorrect"),
                    d["error"] === 2 &&
                        React.createElement("div", { "data-mu": "item-info-error" }, "Image Pixel Incorrect"),
                    d["error"] === 3 &&
                        React.createElement("div", { "data-mu": "item-info-error" }, "Image Size Incorrect")));
            }),
            React.createElement("div", { "data-mu": "item-empty", onClick: function () { fileRef === null || fileRef === void 0 ? void 0 : fileRef.current.click(); } },
                React.createElement("div", null,
                    React.createElement("div", { "data-mu": "item-empty-icon", style: { textAlign: "center" } }, placeholder.icon),
                    React.createElement("div", { "data-mu": "item-empty-text", style: { textAlign: "center" } }, placeholder.text)),
                React.createElement("input", { ref: fileRef, type: "file", onChange: onClick, multiple: true, hidden: true }))),
        React.createElement("div", { "data-mu": "button-container" },
            React.createElement("div", { "data-mu": "button-body", className: api.ssr && DataFile.length > 0 ? "active" : "" },
                React.createElement("div", { "data-mu": "button", className: ErrorControl() === false ? "disabled" : "", onClick: function () { ErrorControl() === true && setUpload(true); } }, placeholder.button))),
        React.createElement("div", { "data-go": "highlight-container", className: Highlight !== "" ? "active" : "", onClick: function () { setHighlight(""); } },
            React.createElement("div", { "data-go": "highlight-body", className: Highlight !== "" ? "active" : "", style: { backgroundImage: "url(".concat(Highlight, ")") } },
                React.createElement("div", { "data-go": "highlight-close", onClick: function () { setHighlight(""); } },
                    React.createElement(Svg, { icon: "close" }))))));
};
export default Multiple;
//# sourceMappingURL=Multiple.js.map