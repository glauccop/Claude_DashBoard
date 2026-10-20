import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export function EChart({ option, height = 300 }: { option: any; height?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (!ref.current) return
        const chart = echarts.init(ref.current)
        chart.setOption(option)
        const onR = () => chart.resize()
        window.addEventListener('resize', onR)
        return () => {
            window.removeEventListener('resize', onR)
            chart.dispose()
        }
    }, [option])
    return <div ref={ref} style={{ width: '100%', height }} />
}
