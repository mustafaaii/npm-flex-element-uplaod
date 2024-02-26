import React from 'react'
import "./flx.global.upload.css"

import Single from './Single'
import Multiple from './Multiple'
import Error from './Error'
import Svg from './Svg'

interface UplodProps {
    multiple: any
    single: any
    response: (selected: any | undefined) => void;
    selected: any;
    type: any;
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
        imagePreview: boolean;
        limit: number;
        imageType: any;
        imageSize: any
        imagePixel: any
    };
}

interface ComponentMap {
    [key: string]: any;
}

const SelectComponents: ComponentMap = {
    single: Single,
    multiple: Multiple,
};

const Upload: React.FC<UplodProps> = ({
    multiple,
    single,
    response,
    selected = "",
    type = [],
    api = {
        ssr: false,
        url: "",
    },
    placeholder = {
        icon: "",
        text: "",
        button: ""
    },
    settings = {
        imageInfo: false,
        imagePreview: false,
        limit: 5,
        imageType: ["image/png"],
        imageSize: "3MB",
        imagePixel: "1080X1080"
    },
}) => {

    if (!multiple && !single) {
        return <Error type='type_not_selected' />;
    } else
        if (typeof response !== "function") {
            return <Error type='response_not_install' />;
        } else {
            var Component;
            if (multiple) {
                Component = SelectComponents["multiple"];
            } else {
                Component = SelectComponents["single"];
            }
            return <Component
                api={api}
                type={type}
                selected={selected}
                settings={{
                    imageInfo: settings.imageInfo || false,
                    preview: settings.imagePreview || false,
                    limit: settings.limit || 5,
                    imageType: settings.imageType || ["image/png"],
                    imageSize: settings.imageSize || "3MB",
                    imagePixel: settings.imagePixel || "1080X1080"
                }}
                response={response}
                placeholder={{
                    icon: placeholder.icon || <Svg icon='image' />,
                    text: placeholder.text || "Upload File",
                    button: placeholder.button || "Upload Files"
                }}
            />
        }
};

export default Upload;

