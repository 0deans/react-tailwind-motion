import { MotionConfig } from 'framer-motion'
import MailInbox from './components/MailInbox'
import Tabs from './components/Tabs'
import Calendar from './components/Calendar'
import DatePicker from './components/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import HourSelector from './components/HourSelector'

const App = () => {
	const [date, setDate] = useState<Dayjs>()

	const items = [
		{ label: 'Температура повітря', id: 'one' },
		{ label: 'Хвилі тепла', id: 'two' },
		{ label: 'Хвилі холода', id: 'three' }
	]

	return (
		<MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
			<div className="flex flex-wrap gap-8 p-4">
				<MailInbox />
				<Tabs items={items} />
				<Calendar value={date} onChange={(date) => setDate(date)} />
				<DatePicker
					min={dayjs().subtract(4, 'day')}
					max={dayjs().add(4, 'day')}
				/>
				<div className="w-96 rounded bg-white pb-1 text-gray-700">
					<HourSelector
						value={date}
						onSelect={(date) => setDate(date)}
					/>
				</div>
			</div>
		</MotionConfig>
	)
}

export default App
