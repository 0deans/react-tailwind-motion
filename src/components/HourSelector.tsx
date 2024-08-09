import { useCallback, useEffect, useRef, WheelEvent } from 'react'
import { animate } from 'framer-motion'
import { cn } from '../utils'
import dayjs, { Dayjs } from 'dayjs'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface HourSelectorProps {
	value?: Dayjs
	step?: number
	onSelect?: (date: Dayjs) => void
}

const HourSelector = ({ value, step, onSelect }: HourSelectorProps) => {
	const viewportRef = useRef<HTMLDivElement>(null)
	const startofDay = (value ?? dayjs()).startOf('day')
	const hours = Array.from({ length: 24 / (step ?? 1) }, (_, i) =>
		startofDay.add(i * (step ?? 1), 'hours')
	)

	const onWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
		if (!viewportRef.current || e.deltaY === 0 || e.deltaX !== 0) return

		const delta = e.deltaY
		const currPos = viewportRef.current.scrollLeft
		const scrollWidth = viewportRef.current.scrollWidth

		const newPos = Math.max(0, Math.min(scrollWidth, currPos + delta))

		animate(currPos, newPos, {
			onUpdate: (latest) => {
				if (viewportRef.current) {
					viewportRef.current.scrollLeft = latest
				}
			},
			duration: 0.24,
			ease: 'easeOut'
		})
	}, [])

	const selectedRef = useRef<HTMLButtonElement>(null)
	useEffect(() => {
		if (!selectedRef.current) return
		selectedRef.current.scrollIntoView({
			inline: 'center'
		})
	}, [])

	return (
		<ScrollArea.Root onWheel={onWheel}>
			<ScrollArea.Viewport ref={viewportRef} className="overscroll-none">
				<div className="mt-1 space-x-2 overflow-hidden whitespace-nowrap">
					{hours.map((hour) => {
						const selected = value && value.isSame(hour, 'hour')

						return (
							<button
								ref={selected ? selectedRef : null}
								key={hour.toString()}
								className={cn(
									'inline-block size-max rounded px-2 py-1 font-semibold',
									selected && 'bg-blue-500 text-white',
									!selected && 'hover:bg-gray-200'
								)}
								disabled={selected}
								onClick={() => onSelect?.(hour)}
							>
								{hour.format('HH:mm')}
							</button>
						)
					})}
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar orientation="horizontal">
				<ScrollArea.Thumb />
			</ScrollArea.Scrollbar>
		</ScrollArea.Root>
	)
}

export default HourSelector
