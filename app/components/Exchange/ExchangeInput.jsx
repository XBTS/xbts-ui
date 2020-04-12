import React from "react";
import {Input} from "bitshares-ui-style-guide";
import {DecimalChecker} from "../Utility/DecimalChecker";
import utils from "common/utils";

class ExchangeInput extends DecimalChecker {
    constructor() {
        super();
    }

    componentWillReceiveProps(np) {
        if (this.props.value && !np.value) {
            this.refs.input.value = "";
        }
    }

    render() {
        let {allowNaN, value} = this.props;

        if (typeof value === "undefined") {
            value = "";
        } else {
            value = utils.toFixedString(value);
        }

        const props = Object.assign({}, this.props, {value});

        return (
            <Input
                ref="input"
                type="text"
                {...props}
                onPaste={this.onPaste.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
            />
        );
    }
    /*
    render() {
        // allowNaN is no valid prop for Input, remove
        var {allowNaN, ...other} = this.props;
        return (
            <Input
                ref="input"
                type="text"
                {...other}
                onPaste={this.props.onPaste || this.onPaste.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
            />
        );
    }
    */
}

export default ExchangeInput;
