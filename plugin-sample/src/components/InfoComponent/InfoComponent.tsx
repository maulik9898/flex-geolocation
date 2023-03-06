import React from "react";
import { withTaskContext } from "@twilio/flex-ui";

function AccountComponent(props: any) {
    if (!props.task) return null;
    return (
        <div
            style={{
                margin: "10px",
                color: "white",
            }}
        >
            <p>IP-Address: {props.task.attributes.ip}</p>
            <p>City: {props.task.attributes.city}</p>
            <p>Region: {props.task.attributes.region}</p>
            <p>Country: {props.task.attributes.country}</p>
        </div>
    );
}

export default withTaskContext(AccountComponent);
