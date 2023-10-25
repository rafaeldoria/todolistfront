import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProps) {
    return (
        <label 
            className="text-sm flex items-center justify-between mt-2 mb-1"
            {...props}
        ></label>
    )
};
