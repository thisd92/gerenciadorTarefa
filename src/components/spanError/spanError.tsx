import { ReactNode } from 'react';

export default function SpanError({children}: {children: React.ReactNode}) {

    return (
        <span className="text-red-600">{children}</span>
    )
}
