import React from 'react'

interface CardProps {
    title: React.ReactNode
    className?: string
    children: React.ReactNode
}

export function Card({ title, className, children }: CardProps) {
    return (
        <div className={`card${className ? ' ' + className : ''}`}>
            <h3 className="ct">{title}</h3>
            {children}
        </div>
    )
}
