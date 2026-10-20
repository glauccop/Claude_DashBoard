import React from 'react'

export interface Column<T> {
    header: string
    render: (row: T) => React.ReactNode
    numeric?: boolean
}

interface TableProps<T> {
    columns: Column<T>[]
    rows: T[]
    rowKey: (row: T, i: number) => string
}

export function Table<T>({ columns, rows, rowKey }: TableProps<T>) {
    return (
        <div className="tbl-wrap">
            <table className="tbl">
                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th key={c.header} className={c.numeric ? 'num' : ''}>
                                {c.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={rowKey(row, i)}>
                            {columns.map((c) => (
                                <td key={c.header} className={c.numeric ? 'num' : ''}>
                                    {c.render(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
