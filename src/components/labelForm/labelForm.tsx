import { LabelFormProps } from './type';

export default function LabelForm(props: LabelFormProps) {

    return (
        <label className="text-gray-700 text-sm font-bold mb-2" {...props}>{props.children}</label>
    )
}
