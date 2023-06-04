import { FormButtonProps } from "./type"

export default function FormButton(props: FormButtonProps) {
    return (
        <button className="bg-green-600 w-full shadow-md rounded-md hover:bg-green-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">
            {props.children}
        </button>
    )
}