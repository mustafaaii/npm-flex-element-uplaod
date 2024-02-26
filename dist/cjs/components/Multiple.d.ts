import { FC } from "react";
import "./flx.multiple-upload.css";
interface MultipleSelectProps {
    response: (selected: any) => void;
    selected?: any;
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
declare const Multiple: FC<MultipleSelectProps>;
export default Multiple;
