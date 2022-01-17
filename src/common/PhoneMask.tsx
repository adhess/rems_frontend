import React from "react";
import {IMaskInput} from "react-imask";

const PhoneMask = React.forwardRef(
    (props: any, ref) => {
        const {onChange, ...other} = props;
        return (
            <IMaskInput {...other} mask=" 00 000 000"
                        definitions={{'#': /[1-9]/,}}
                        inputRef={ref}
                        onAccept={(value: any) => onChange({target: {name: props.name, value}})}
                        overwrite
            />
        );
    }
);

export default PhoneMask;