import React from "react"
import Svg from "./Svg"
import "./flx.error.css"

const Error: React.FC<{ type: string }> = ({ type }) => {

    const ErrorHead = () => {
        return (
            <>
                <div data-error-icon>
                    <Svg icon="hammer" />
                </div>
                <div data-error-title>
                    Flex Element <span data-text-color style={{ marginLeft: "4px" }}> Upload</span>
                </div>
                <div data-error-text>
                    Upload element indicates the following deficiencies
                </div>
            </>
        )
    }


    switch (type) {
        case "type_not_selected": return (
            <div className="flx">
                <div data-error-container>
                    <div data-error-body>
                        <ErrorHead />
                        <div data-error-item>
                            <div data-error-item-icon>
                                <Svg icon="hammer" />
                            </div>
                            <div data-error-item-title >
                                Type must be declared for <b>{`<Upload />`}</b>. What do you want to do ?
                            </div>
                        </div>
                        <div data-error-info>
                            <pre>
                                <code>
                                    <span style={{ color: "#00f56e" }}>{`<Select`}</span>
                                    <span style={{ color: "#ff6574", marginLeft: "8px", marginRight: "8px" }}>
                                        {` single OR multiple`}
                                    </span>
                                    <span style={{ color: "#00f56e" }}>{`/>`}</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )
        case "response_not_install": return (
            <div className="flx">
                <div data-error-container>
                    <div data-error-body>
                        <ErrorHead />
                        <div data-error-item>
                            <div data-error-item-icon>
                                <Svg icon="hammer" />
                            </div>
                            <div data-error-item-title >
                                Response must be declared for <b>{`<Upload />`}</b>. What do you want to do ?
                            </div>
                        </div>
                        <div data-error-info>
                            <pre>
                                <code>
                                    <span style={{ color: "#00f56e" }}>{`<Select`}</span>
                                    <span style={{ color: "#ff6574", marginLeft: "8px", marginRight: "8px" }}>{`response={(e)=>{}}`}</span>
                                    <span style={{ color: "#00f56e" }}>{`/>`}</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        )
        default:
            return ""
    }
}
export default Error;