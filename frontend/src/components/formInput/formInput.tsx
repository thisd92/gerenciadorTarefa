import { FormInputProps, TextAreaProps } from './type';

function FormInput(props: FormInputProps) {

    return (
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props} />
    )
}

const TextArea = (props: TextAreaProps) => {
    return (
        <textarea {...props} />
    )
}

export { FormInput, TextArea };