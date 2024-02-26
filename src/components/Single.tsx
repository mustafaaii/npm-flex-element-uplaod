import axios from "axios";
import Svg from "./Svg";
import "./flx.single-upload.css"
import React, { FC, useEffect, useRef, useState } from "react"
interface SingleSelectProps {
    response: (selected: any | undefined) => void;
    selected: any;
    placeholder: {
        icon: any
        text: string
        button: string
    };
    api: {
        ssr: boolean
        url: string
    }
    settings: {
        imageInfo: boolean;
        dragDrop: boolean;
        preview: boolean;
        imageType: any;
        imageSize: any
        imagePixel: any
    };
}
const Single: FC<SingleSelectProps> = ({
    placeholder = { icon: <Svg icon='image' />, text: "Upload File", button: "Upload Files" },
    response,
    selected,
    api = { ssr: false, url: "" },
    settings = {
        imageInfo: false,
        preview: false,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    }
}) => {
    const fileRef = useRef<any>(null);
    const [Upload, setUpload] = useState(false)
    const [FileInfo, setFileInfo] = useState<any>({ error: 0, status: false, size: "", type: "", pixel: "" });
    const [Blob, setBlob] = useState<string>("");
    const [File, setFile] = useState<any>("");
    const [Status, setStatus] = useState<boolean>(false);
    const [UploadResult, setUploadResult] = useState<boolean>(false)
    const [Highlight, setHighlight] = useState(false)

    const onFileType = (type: any) => {
        switch (type) {
            case "text/html": return "Html"
            case "text/css": return "Css"
            case "text/javascript": return "Javascript"
            case "application/json": return "Json"
            case "application/xml": return "Xml"
            case "application/pdf": return "Pdf"
            case "application/msword": return "Doc"
            case "application/vnd.ms-excel": return "Xls"
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "Docx"
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": return "Xlsx"
            case "application/zip": return "Zip"
            case "application/x-zip-compressed": return "Zip"
            case "image/jpeg": return "jpeg"
            case "image/png": return "png"
            case "image/gif": return "gif"
            case "image/bmp": return "bmp"
            case "image/tiff": return "tiff"
            case "image/webp": return "webp"
            case "image/svg+xml": return "Svg"
            case "audio/mpeg": return "mpeg"
            case "audio/wav": return "wav"
            case "audio/ogg": return "ogg"
            case "video/mp4": return "mp4"
            case "video/mpeg": return "mpeg"
            case "video/webm": return "webm"
            default: return "";
        }
    }
    const onFileSize = (byte: any) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let unitIndex = 0;
        let size = byte;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return size.toFixed(2) + '' + units[unitIndex];
    }
    const onDragOver = (e: any) => {
        e.preventDefault();
    };
    const onTypeControl = (type: string) => {
        switch (type) {
            case "image/jpeg": return true
            case "image/png": return true
            case "image/gif": return true
            case "image/bmp": return true
            case "image/tiff": return true
            case "image/webp": return true
            case "image/svg+xml": return true
            default: return false;
        }
    }
    const onFile = (e: any, t: string) => {
        e.preventDefault();
        const reader = new FileReader();
        setFileInfo({ error: 0, status: false, size: "", type: "", pixel: "" });
        var file = t === "onDrop" ? e.dataTransfer.files[0] : e.target.files[0];

        if (file) {
            var blob = URL.createObjectURL(file);
            if (onTypeControl(file.type)) {
                reader.onload = function (event: any) {
                    const image = new Image();
                    image.src = event.target.result;
                    image.onload = function () {
                        setBlob(blob);
                        const eTypes = settings.imageType.filter((d: any) => { return (d === file.type) })
                        const eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
                        const eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
                        var tSize: any = 0;
                        if (eUnits === "MB") {
                            tSize = eSize * 1024 * 1024
                        }
                        if (eUnits === "KB") {
                            tSize = eSize * 1024
                        }
                        if (eTypes.length === 0) {
                            setFileInfo({ error: 1, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: `${image.width}X${image.height}` })
                        } else {
                            const getPixel = settings.imagePixel.split("X")
                            if (parseInt(getPixel[0]) < image.width || parseInt(getPixel[1]) < image.height) {
                                setFileInfo({ error: 2, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: `${image.width}X${image.height}` })
                            }
                            else {
                                if (file.size > tSize) {
                                    setFileInfo({ error: 3, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: `${image.width}X${image.height}` })
                                }
                                else {
                                    setFileInfo({ error: 0, status: true, size: onFileSize(file.size), type: onFileType(file.type), pixel: `${image.width}X${image.height}` })
                                }
                            }
                        }
                        setStatus(true);
                    };
                };
                reader.readAsDataURL(file);
            }
            setFile(file)
            if (!api.ssr) {
                response(file)
            }
        }

        if (fileRef?.current) {
            fileRef.current.value = ""
        }

    };
    const onUpload = async () => {
        const data = new FormData();
        data.append('flx_file', File);
        var result = (await axios.post(api.url, data)).data
        if (result.status === true) {
            setUploadResult(true);
            response({ image: result.file, size: FileInfo.size, type: FileInfo.type, pixel: FileInfo.pixel })
        }
    }
    useEffect(() => {
        if (Upload && api.ssr) {
            onUpload()
        }
    }, [Upload])
    useEffect(() => {
        if (UploadResult) {
            setTimeout(() => {
                setUploadResult(false)
                setFileInfo({ error: 0, status: false, size: "", type: "", pixel: "" })
                setStatus(false);
                setUpload(false);
                setFile("");
                setBlob("")
            }, 2000);
        }
    }, [UploadResult])
    useEffect(() => {
        if (selected) {
            setBlob(selected["image"]);
            setFileInfo({ error: 0, status: true, size: selected["size"], type: selected["type"], pixel: selected["pixel"] })
            setStatus(true);
        }
    }, [selected])
    return (
        <div className="flx">
            <div data-su="container" onDragOver={(e: any) => { onDragOver(e) }} onDrop={(e: any) => { onFile(e, "onDrop") }} onClick={() => { Status === false && fileRef?.current.click() }}>
                <div data-su="body" className={UploadResult === true ? "disbled" : ""} style={{ backgroundImage: `url(${Blob})` }}>
                    <div data-su="placeholder" className={Status === false ? "active" : ""} >
                        <div>
                            <div data-su="placeholder-icon">
                                {placeholder.icon}
                            </div>
                            <div data-su="placeholder-text">
                                {placeholder.text}
                            </div>
                        </div>
                    </div>
                    <input ref={fileRef} type="file" onChange={(e: any) => { onFile(e, "onClick") }} hidden />
                    <div data-su="close-icon" className={Status === true ? "active" : ""} onClick={() => { setStatus(false); setBlob("") }}>
                        <svg viewBox="0 0 512 512">
                            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" />
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 320L192 192M192 320l128-128" />
                        </svg>
                    </div>
                </div>
                <div data-su="info">
                    <div data-su="info-body" className={settings.imageInfo && Status === true ? "active" : ""}>
                        {
                            FileInfo["error"] === 0 &&
                            <>
                                <div data-su="item">
                                    <span data-su="weight-600"> {FileInfo["size"]}</span>
                                </div>
                                <div data-su="item">
                                    <span style={{ fontWeight: "600" }}></span>
                                    <span data-su="weight-600"> {FileInfo["type"]}</span>
                                </div>
                                <div data-su="item">
                                    <span data-su="weight-600"> {FileInfo["pixel"]}</span>
                                </div>
                                {
                                    settings.preview &&
                                    <div data-su="item-icon" onClick={() => { setHighlight(true) }}>
                                        <Svg icon="zoom" />
                                    </div>
                                }
                            </>
                        }
                        {
                            FileInfo["error"] === 1 &&
                            <div data-su="item-error">
                                The file type you selected is not compatible.
                            </div>
                        }
                        {
                            FileInfo["error"] === 2 &&
                            <div data-su="item-error">
                                The file pixel you selected is larger than {settings.imagePixel}.
                            </div>
                        }
                        {
                            FileInfo["error"] === 3 &&
                            <div data-su="item-error">
                                The file size you selected is larger than {settings.imageSize}.
                            </div>
                        }
                    </div>
                </div>
                <div data-su="success-upload" className={UploadResult === true ? "active" : ""}>
                    <Svg icon="check" />
                </div>
            </div>
            <div data-su="button-container">
                <div data-su="button-body" className={api.ssr === true && File !== "" ? "active" : ""}>
                    <div data-su="button" onClick={() => { FileInfo.error === 0 && setUpload(true) }}>{placeholder.button}</div>
                </div>
            </div>
            <div data-go="highlight-container" className={Highlight === true ? "active" : ""} onClick={() => { setHighlight(false) }}>
                <div data-go="highlight-body" className={Highlight === true ? "active" : ""} style={{ backgroundImage: `url(${Blob})` }}>
                    <div data-go="highlight-close" onClick={() => { setHighlight(false) }}>
                        <Svg icon="close" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Single;