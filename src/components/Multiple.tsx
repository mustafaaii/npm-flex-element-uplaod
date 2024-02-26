import React, { FC, useEffect, useRef, useState } from "react"
import "./flx.multiple-upload.css"
import Svg from "./Svg";
import axios from "axios";

interface MultipleSelectProps {
    response: (selected: any) => void;
    selected?: any;
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
        preview: boolean;
        limit: number;
        imageType: any;
        imageSize: any
        imagePixel: any
    };
}
const Multiple: FC<MultipleSelectProps> = ({
    placeholder = { icon: <Svg icon='image' />, text: "Upload File", button: "Upload Files" },
    response,
    selected,
    api = { ssr: false, url: "" },
    settings = {
        imageInfo: false,
        preview: false,
        limit: 5,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    }
}) => {
    const fileRef = useRef<any>(null);
    const [Upload, setUpload] = useState(false)
    const [width, setWidth] = useState<number>(0);
    const [DataFile, setDataFile] = useState<any>([])
    const [Highlight, setHighlight] = useState<string>("")
    const [UploadResult, setUploadResult] = useState<boolean>(false)
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
            case "image/jpeg": return "JPEG"
            case "image/png": return "PNG"
            case "image/gif": return "GIF"
            case "image/bmp": return "BMP"
            case "image/tiff": return "TIFF"
            case "image/webp": return "WEBP"
            case "image/svg+xml": return "SVG"
            case "audio/mpeg": return "MPEG"
            case "audio/wav": return "WAV"
            case "audio/ogg": return "OGG"
            case "video/mp4": return "MP4"
            case "video/mpeg": return "MPEG"
            case "video/webm": return "WEBM"
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
    const onUnique = (e: any) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < e; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    interface FileItem {
        id: any;
        error: number,
        file: any,
        blob: string;
        size: string;
        type: string;
        pixel: string;
    }
    const onDrop = async (e: any): Promise<void> => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files) {
            const newData = await Promise.all(
                Array.from(files).map(async (f: any) => {
                    const id = onUnique(4);
                    const blob = URL.createObjectURL(f);
                    let item: FileItem;

                    const eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
                    const eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
                    var tSize: any = 0;
                    if (eUnits === "MB") {
                        tSize = eSize * 1024 * 1024
                    }
                    if (eUnits === "KB") {
                        tSize = eSize * 1024
                    }

                    const typeResult = settings.imageType.filter((d: any) => { return (d === f.type) })
                    if (typeResult.length === 0) {
                        item = { id: id, error: 1, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                    } else {
                        if (f.size > tSize) {
                            item = { id: id, error: 3, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                        }
                        else {
                            item = { id: id, error: 0, file: f, blob: blob, size: onFileSize(f.size), type: onFileType(f.type), pixel: "" };
                        }
                    }
                    if (onTypeControl(f.type)) {
                        const image = new Image();
                        image.src = blob;
                        await new Promise<void>(resolve => {
                            image.onload = () => {
                                const getPixel = settings.imagePixel.split("X")
                                if (parseInt(getPixel[0]) < image.width || parseInt(getPixel[1]) < image.height) {
                                    item.pixel = `${image.width}X${image.height}`;
                                    item.error = 2
                                } else {
                                    item.pixel = `${image.width}X${image.height}`;
                                    item.error = 0
                                }
                                resolve();
                            };
                        });
                    }
                    return item;
                })
            );

            const resultFilter = newData.slice(0, settings.limit)
            setDataFile([...DataFile, ...resultFilter]);
        }
        if (fileRef.current) {
            fileRef.current.value = ""
        }
    };
    const onClick = async (e: any) => {
        e.preventDefault();
        var item = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const id = onUnique(4);
            var blob = URL.createObjectURL(e.target.files[i]);
            var t: any = await new Promise((resolve) => {
                const img = new Image();
                img.src = blob;
                img.onload = () => { resolve(`${img.width}X${img.height}`); };
            });

            const eUnits = settings.imageSize.slice(settings.imageSize.length - 2, settings.imageSize.length);
            const eSize = settings.imageSize.slice(0, settings.imageSize.length - 2);
            var tSize: any = 0;
            if (eUnits === "MB") {
                tSize = eSize * 1024 * 1024
            }
            if (eUnits === "KB") {
                tSize = eSize * 1024
            }
            const typeResult = settings.imageType.filter((d: any) => { return (d === e.target.files[i].type) })

            if (typeResult.length === 0) {
                item[i] = { id: id, error: 1, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
            }
            else {

                var getPixel = settings.imagePixel.split("X");
                var setPixel = t.split("X")
                if (parseInt(getPixel[0]) < parseInt(setPixel[0]) || parseInt(getPixel[1]) < parseInt(setPixel[1])) {
                    item[i] = { id: id, error: 2, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                } else {
                    if (e.target.files[i].size > tSize) {
                        item[i] = { id: id, error: 3, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                    }
                    else {
                        item[i] = { id: id, error: 0, file: e.target.files[i], blob: blob, size: onFileSize(e.target.files[i].size), type: onFileType(e.target.files[i].type), pixel: t };
                    }
                }
            }
        }
        const resultFile = [...DataFile, ...item];
        const resultFilter = resultFile.slice(0, settings.limit)
        setDataFile(resultFilter)
        if (fileRef.current) {
            fileRef.current.value = ""
        }
    };
    const onDelete = (e: any) => {
        const resultFile = DataFile.filter((d: any) => { return (d.id !== e) })
        setDataFile(resultFile)
    }
    const onUpload = async () => {
        const data = new FormData();
        const fd = [];
        DataFile.forEach((item: any, index: number) => {
            fd[index] = { image: item.blob, size: item.size, type: item.type, pixel: item.pixel };
        });

        for (let i = 0; i < DataFile.length; i++) {
            data.append('flx_file', DataFile[i].file);
            const result = (await axios.post(api.url, data)).data;
            if (result.status === true) {
                if (DataFile[i].file !== "") {
                    fd[i] = { image: result.file, size: DataFile[i].size, type: DataFile[i].type, pixel: DataFile[i].pixel };
                }
            }
        }

        if (fileRef?.current) {
            fileRef.current.value = '';
            fileRef.current.disabled = false;
        }
        setUpload(false);
        setWidth(0);
        response(fd);
        setDataFile([]);
    };
    const ErrorControl = () => {
        const result = (DataFile || []).filter((d: any) => { return (d.error !== 0) })
        if (result.length > 0) {
            return false;
        }
        else {
            return true
        }
    }
    useEffect(() => {
        if (UploadResult) {
            setTimeout(() => {
                setUploadResult(false)
            }, 2000);
        }
    }, [UploadResult])
    useEffect(() => {
        let animationId: any;
        if (Upload) {
            const start = performance.now();
            const animate = (time: any) => {
                const elapsed = time - start;
                const progress = Math.min(1, elapsed / (1000 * DataFile.length));
                setWidth(progress * 100);
                if (Upload && api.ssr && (progress * 100) === 100) {
                    onUpload()
                }
                if (progress < 1) {
                    animationId = requestAnimationFrame(animate);
                }
            };
            animationId = requestAnimationFrame(animate);
        }
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [Upload]);
    useEffect(() => {
        if (!api.ssr) {
            response(DataFile)
        }
    }, [api.ssr, DataFile])
    useEffect(() => {
        if (selected) {
            setDataFile((prevDataBlob: any) => {
                return (selected || []).map((d: any, x: number) => {
                    return { id: prevDataBlob.length + x, error: 0, blob: d["image"], size: d["size"], type: d["type"], pixel: d["pixel"] };
                });
            });
        }
    }, [selected])
    return (
        <div className="flx">
            <div data-mu="loader" style={{ width: `${width}%` }}></div>
            <div data-mu="container" onDragOver={(e: any) => { onDragOver(e) }} onDrop={(e: any) => { onDrop(e) }} >
                {
                    (DataFile || []).map((d: any, x: number) => {
                        return (
                            <div data-mu="item" style={{ backgroundImage: `url(${d.blob})` }} key={`data-mu-item-${x}`}>
                                <div data-mu="item-close" className='active' onClick={() => { onDelete(d["id"]) }}>
                                    <Svg icon="close" />
                                </div>
                                {
                                    d["error"] === 0 &&
                                    <div data-mu="item-info" className={settings.imageInfo === true ? "active" : ""}>
                                        <div data-mu="item-info-item">{d["size"]}</div>
                                        <div data-mu="item-info-item">{d["type"]}</div>
                                        <div data-mu="item-info-item">{d["pixel"]}</div>
                                        <div data-mu="item-info-item-icon" onClick={() => { setHighlight(d.blob) }}><Svg icon="zoom" /></div>
                                    </div>
                                }
                                {
                                    d["error"] === 1 &&
                                    <div data-mu="item-info-error">
                                        Image Type Incorrect
                                    </div>
                                }
                                {
                                    d["error"] === 2 &&
                                    <div data-mu="item-info-error">
                                        Image Pixel Incorrect
                                    </div>
                                }
                                {
                                    d["error"] === 3 &&
                                    <div data-mu="item-info-error">
                                        Image Size Incorrect
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <div data-mu="item-empty" onClick={() => { fileRef?.current.click() }}>
                    <div>
                        <div data-mu="item-empty-icon" style={{ textAlign: "center" }}>{placeholder.icon}</div>
                        <div data-mu="item-empty-text" style={{ textAlign: "center" }}>{placeholder.text}</div>
                    </div>
                    <input ref={fileRef} type="file" onChange={onClick} multiple hidden />
                </div>
            </div>
            <div data-mu="button-container">
                <div data-mu="button-body" className={api.ssr && DataFile.length > 0 ? "active" : ""}>
                    <div data-mu="button" className={ErrorControl() === false ? "disabled" : ""} onClick={() => { ErrorControl() === true && setUpload(true) }}>{placeholder.button}</div>
                </div>
            </div>

            <div data-go="highlight-container" className={Highlight !== "" ? "active" : ""} onClick={() => { setHighlight("") }}>
                <div data-go="highlight-body" className={Highlight !== "" ? "active" : ""} style={{ backgroundImage: `url(${Highlight})` }}>
                    <div data-go="highlight-close" onClick={() => { setHighlight("") }}>
                        <Svg icon="close" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Multiple;