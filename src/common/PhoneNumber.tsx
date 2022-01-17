import React from "react";

export default class PhoneNumber extends React.Component<any, any> {

    render() {
        return (
            <>
                {
                    this.props.value ? this.splitPhoneNumber(this.props.value + '') : '(+216) 00 000 000'
                }
            </>
        );
    }

    splitPhoneNumber = (v: string) => '(+216) ' + v[0] + v[1] + ' ' + v[2] + v[3] + v[4] + ' ' + v[5] + v[6] + v[7];
}