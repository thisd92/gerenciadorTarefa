export default interface FormInputProps {
    type: string
    name: string
    id: string
    required?: boolean
    value?: string
    readOnly?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}