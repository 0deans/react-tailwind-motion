import clsx, { ClassValue } from 'clsx'
import { Dayjs } from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getDaysBetween(start: Dayjs, end: Dayjs) {
	const range = []
	let current = start
	while (!current.isAfter(end)) {
		range.push(current)
		current = current.add(1, 'days')
	}
	return range
}
