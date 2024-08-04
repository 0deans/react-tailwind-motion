import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils'

interface Item {
	label: string
	id: string
}

const Tabs = ({ items }: { items: Item[] }) => {
	const [activeTab, setActiveTab] = useState(items[0].id)

	return (
		<div className="flex h-fit w-fit divide-x divide-gray-400 overflow-hidden rounded-md bg-white">
			{items.map((item) => (
				<button
					key={item.id}
					className={cn(
						'relative max-w-max flex-1 px-4 py-2 font-medium text-gray-700 transition',
						activeTab !== item.id
							? 'hover:text-gray-500'
							: 'text-blue-400'
					)}
					onClick={() => setActiveTab(item.id)}
				>
					{activeTab === item.id && (
						<motion.div
							layoutId="active-tab"
							className="absolute inset-0 bg-gray-200"
						/>
					)}
					<span className="relative z-10">{item.label}</span>
				</button>
			))}
		</div>
	)
}

export default Tabs
