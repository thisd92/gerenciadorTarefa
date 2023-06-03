import { AppProps } from "next/app";
import { useState } from "react";
import InputMask from "react-input-mask";

const PhoneInput = ({ className, ...props }: any) => {
    const [mask, setMask] = useState("(99) 99999-9999");

    return (
        <InputMask
            {...props}
            mask={mask}
            onBlur={e => {
                if (e.target.value.replace("_", "").length === 14) {
                    setMask("(99) 9999-9999");
                }
            }}
            onFocus={e => {
                if (e.target.value.replace("_", "").length === 14) {
                    setMask("(99) 99999-9999");
                }
            }}
        >
            {(inputProps: AppProps) => <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...inputProps} />}
        </InputMask>
    );
};

export default PhoneInput;