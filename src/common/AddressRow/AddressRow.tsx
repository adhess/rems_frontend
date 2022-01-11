import React from "react";
import "./AddressRow.scss";

export default function AddressRow(props: any) {
    return <div className="container">
        <p>{props.country} |</p>
        {props.state ? <p>{props.state} |</p> : null}
        {props.county ? <p>{props.county} |</p> : null}
        {props.state_district ? <p>{props.state_district}</p> : null}
    </div>
}