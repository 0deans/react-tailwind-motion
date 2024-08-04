import { MotionConfig } from 'framer-motion'
import MailInbox from './components/MailInbox'
import Tabs from './components/Tabs'
import Calendar from './components/Calendar'
import DatePicker from './components/DatePicker'
import dayjs from 'dayjs'

const App = () => {
	const items = [
		{ label: 'Температура повітря', id: 'one' },
		{ label: 'Хвилі тепла', id: 'two' },
		{ label: 'Хвилі холода', id: 'three' }
	]

	return (
		<MotionConfig transition={{ type: 'spring', bounce: 0, duration: 0.2 }}>
			<div className="flex flex-wrap gap-8 p-4">
				<MailInbox />
				<Tabs items={items} />
				<Calendar onChange={(date) => console.log(date)} />
				<DatePicker
					min={dayjs().subtract(4, 'day')}
					max={dayjs().add(4, 'day')}
					onChange={(date) => console.log(date)}
				/>
			</div>
		</MotionConfig>
	)
}

export default App
