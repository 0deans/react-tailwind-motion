import { useState } from 'react'
import { LuArchive, LuMail } from 'react-icons/lu'
import { cn } from '../utils'
import { AnimatePresence, motion } from 'framer-motion'

interface Mail {
	id: number
	subject: string
	body: string
	selected?: boolean
}

const inbox: Mail[] = [
	{
		id: 1,
		subject: 'Your funds have been processed',
		body: 'See your lates deposit online'
	},
	{
		id: 2,
		subject: `Nintendo's Newsletter for July`,
		body: 'Introducing Strike, a 5-on soccer game'
	},
	{
		id: 3,
		subject: 'New updates to your account',
		body: 'We have added new features to your account'
	},
	{
		id: 4,
		subject: `Apple's latest product launch`,
		body: 'Introducing the new iPhone 13'
	},
	{
		id: 5,
		subject: 'React Hawaii is here!',
		body: 'Join us for a week of React in Hawaii'
	},
	{
		id: 6,
		subject: 'Changelog update',
		body: 'We have updated our changelog'
	},
	{
		id: 7,
		subject: 'This Week in Sports',
		body: 'The finals are heating up'
	}
]

let pointer = 4

const MailInbox = () => {
	const [messages, setMessages] = useState<Mail[]>(inbox)
	const [nextId, setNextId] = useState(8)

	const addMessage = () => {
		const newMessage = { ...inbox[pointer++ % inbox.length], id: nextId }
		setNextId(nextId + 1)
		setMessages([...messages, newMessage])
	}

	const archiveMessages = () => {
		const newMessages = messages.filter((mail) => !mail.selected)
		setMessages(newMessages)
	}

	const handleMessageClick = (id: number) => {
		const newMessages = messages.map((mail) => {
			if (mail.id === id) {
				return { ...mail, selected: !mail.selected }
			}

			return mail
		})
		setMessages(newMessages)
	}

	return (
		<div className="h-fit w-full max-w-[480px] overflow-hidden rounded-2xl bg-white">
			<div className="flex justify-between border-b-2 p-3 px-6">
				<button
					onClick={addMessage}
					className="-mx-2 rounded p-2 text-zinc-400 hover:bg-slate-200 hover:text-zinc-500"
				>
					<LuMail className="size-5" />
				</button>
				<button
					onClick={archiveMessages}
					className="-mx-2 rounded px-2 py-1 text-zinc-400 hover:bg-slate-200 hover:text-zinc-500"
				>
					<LuArchive className="size-5" />
				</button>
			</div>

			<ul className="no-scrollbar flex max-h-96 flex-col overflow-y-scroll px-3 py-2">
				<AnimatePresence initial={false}>
					{[...messages].reverse().map((mail) => (
						<motion.li
							initial={{ height: 0, opacity: 0, margin: 0 }}
							animate={{
								height: 'auto',
								opacity: 1,
								margin: '0.25rem 0',
								transition: {
									type: 'spring',
									bounce: 0.3,
									duration: 0.3
								}
							}}
							transition={{
								duration: 0.24,
								bounce: 0,
								type: 'spring'
							}}
							exit={{ height: 0, opacity: 0, margin: 0 }}
							key={mail.id}
						>
							<button
								onClick={() => handleMessageClick(mail.id)}
								className={cn(
									'max-h-max w-full rounded-md p-4 text-start transition',
									mail.selected && 'bg-sky-500',
									!mail.selected && 'hover:bg-slate-200'
								)}
							>
								<h2
									className={cn(
										'font-bold',
										!mail.selected && 'text-gray-500'
									)}
								>
									{mail.subject}
								</h2>
								<p
									className={cn(
										!mail.selected && 'text-zinc-400',
										mail.selected && 'text-gray-300'
									)}
								>
									{mail.body}
								</p>
							</button>
						</motion.li>
					))}
				</AnimatePresence>

				{messages.length === 0 && (
					<p className="my-2 text-center font-bold text-gray-500">
						No messages to display
					</p>
				)}
			</ul>
		</div>
	)
}

export default MailInbox
