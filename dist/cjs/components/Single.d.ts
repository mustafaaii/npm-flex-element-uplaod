import "./flx.single-upload.css";
import { FC } from "react";
interface SingleSelectProps {
    response: (selected: any | undefined) => void;
    selected: any;
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
        dragDrop: boolean;
        preview: boolean;
        imageType: any;
        imageSize: any;
        imagePixel: any;
    };
}
declare const Single: FC<SingleSelectProps>;
export default Single;
