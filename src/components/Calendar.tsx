import dayjs, { Dayjs } from 'dayjs'
import { cn, getDaysBetween } from '../utils'
import { ReactNode, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { AnimatePresence, motion } from 'framer-motion'
import useMeasure from 'react-use-measure'

type Direction = 'left' | 'right'

const variants = {
	enter: (direction: Direction) => ({
		x: `${direction === 'right' ? '100%' : '-100%'}`,
		opacity: 0
	}),
	middle: () => ({ x: '0%', opacity: 1 }),
	exit: (direction: Direction) => ({
		x: `${direction === 'right' ? '-100%' : '100%'}`,
		opacity: 0
	})
}

interface CalendarProps {
	value?: Dayjs
	min?: Dayjs
	max?: Dayjs
	onChange?: (date: Dayjs) => void
}

const Calendar = ({ value, min, max, onChange }: CalendarProps) => {
	const [selectedDay, setSelectedDay] = useState<Dayjs | undefined>(value)
	const [currentMonth, setCurrentMonth] = useState<Dayjs>(value ?? dayjs())
	const [direction, setDirection] = useState<Direction>('right')

	const newDays = getDaysBetween(
		currentMonth.startOf('month').isoWeekday(1),
		currentMonth.endOf('month').isoWeekday(7)
	)

	function nextMonth() {
		const nextMonth = currentMonth.add(1, 'month')
		setCurrentMonth(nextMonth)
		setDirection('right')
	}

	function prevMonth() {
		const prevMonth = currentMonth.subtract(1, 'month')
		setCurrentMonth(prevMonth)
		setDirection('left')
	}

	function handleSelect(day: Dayjs) {
		setSelectedDay(day)
		onChange?.(day)
	}

	return (
		<div className="flex h-fit flex-col rounded-md bg-white p-3 text-gray-700">
			<div className="flex items-center">
				<h2 className="flex-auto font-semibold capitalize">
					{currentMonth.format('MMMM YYYY')}
				</h2>
				<button
					type="button"
					className="flex flex-none items-center justify-center rounded p-1.5 text-gray-400 hover:bg-slate-200 hover:text-gray-500"
					onClick={prevMonth}
				>
					<span className="sr-only">Previous month</span>
					<GoChevronLeft className="size-5" aria-hidden="true" />
				</button>
				<button
					type="button"
					className="-mr-1.5 ml-2 flex flex-none items-center justify-center rounded p-1.5 text-gray-400 hover:bg-slate-200 hover:text-gray-500"
					onClick={nextMonth}
				>
					<span className="sr-only">Next month</span>
					<GoChevronRight className="size-5" aria-hidden="true" />
				</button>
			</div>
			<div className="mt-2 grid grid-cols-7 text-center text-sm font-semibold leading-6 text-gray-500">
				<div>Пн</div>
				<div>Вт</div>
				<div>Ср</div>
				<div>Чт</div>
				<div>Пт</div>
				<div>Сб</div>
				<div>Нд</div>
			</div>
			<ResizablePanel>
				<AnimatePresence
					initial={false}
					custom={direction}
					mode="popLayout"
				>
					<div className="grid grid-cols-7 overflow-hidden text-sm">
						{newDays.map((day, index) => {
							const disabled =
								(min && day.isBefore(min, 'day')) ||
								(max && day.isAfter(max, 'day'))
							const selected =
								selectedDay && day.isSame(selectedDay, 'day')

							return (
								<motion.div
									key={`${day.toString()}-${index}`}
									variants={variants}
									custom={direction}
									initial="enter"
									animate="middle"
									exit="exit"
									className="p-0.5"
								>
									<button
										className={cn(
											day.isToday() &&
												!selected &&
												'border-gray border',
											'mx-auto flex size-8 items-center justify-center rounded-lg font-semibold',
											(!dayjs().isSame(day, 'month') ||
												disabled) &&
												'text-gray-400',
											!selected &&
												!disabled &&
												'hover:bg-gray-200',
											selected && 'bg-blue-500 text-white'
										)}
										disabled={disabled}
										onClick={() => handleSelect(day)}
									>
										<time
											dateTime={day.format('YYYY-MM-DD')}
										>
											{day.format('D')}
										</time>
									</button>
								</motion.div>
							)
						})}
					</div>
				</AnimatePresence>
			</ResizablePanel>
		</div>
	)
}

export default Calendar

const ResizablePanel = ({ children }: { children: ReactNode }) => {
	const [ref, bounds] = useMeasure()

	return (
		<motion.div
			animate={{
				height: bounds.height > 0 ? bounds.height : 'auto'
			}}
		>
			<div ref={ref}>{children}</div>
		</motion.div>
	)
}
