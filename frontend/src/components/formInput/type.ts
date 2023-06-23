export interface FormInputProps {
    type: string
    name: string
    id: string
    required?: boolean
    value?: string
    readOnly?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface TextAreaProps {
    name: string
    id: string,
    rows: number,
    required?: boolean
    value?: string
    readOnly?: boolean
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}