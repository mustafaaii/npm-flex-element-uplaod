import React from 'react';
import "./flx.global.upload.css";
interface UplodProps {
    multiple: any;
    single: any;
    response: (selected: any | undefined) => void;
    selected: any;
    type: any;
    placeholder: {
        icon: any;
        text: string;
        button: string;
    };
    api: {
        ssr: boolean;
        url: string;
    };
    settings: {
        imageInfo: boolean;
        preview: boolean;
        limit: number;
        imageType: any;
        imageSize: any;
        imagePixel: any;
    };
}
declare const Upload: React.FC<UplodProps>;
export default Upload;
