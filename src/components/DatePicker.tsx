import { Dayjs } from 'dayjs'
import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { CiCalendar } from 'react-icons/ci'
import { AnimatePresence, motion } from 'framer-motion'
import Calendar from './Calendar'

interface DatePickerProps {
	value?: Dayjs
	min?: Dayjs
	max?: Dayjs
	onChange?: (date: Dayjs) => void
}

const DatePicker = ({ value, min, max, onChange }: DatePickerProps) => {
	const [date, setDate] = useState(value)
	const [open, setOpen] = useState(false)

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<button className="flex h-fit w-[280px] gap-2 rounded-md border border-white p-2 font-medium transition hover:bg-white hover:text-gray-700">
					<CiCalendar size={24} strokeWidth={1} />
					{date ? (
						date.format('DD MMMM, YYYY')
					) : (
						<span>Pick a date</span>
					)}
				</button>
			</Popover.Trigger>
			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="mt-2 h-auto w-auto"
							>
								<Calendar
									value={date}
									min={min}
									max={max}
									onChange={(date) => {
										setDate(date)
										onChange?.(date)
									}}
								/>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	)
}

export default DatePicker
