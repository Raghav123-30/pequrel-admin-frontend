import { getData } from '$lib/server/utils/DataService.js';
import type { Notification } from '$lib/models/notification.js';

export const load = async ({ params }) => {
	const customerId = params.customerId;
	const productId = params.productId;
	const notificationsResponse = await getData<Notification[]>(
		`/api/notifications?customerId=${customerId}&productId=${productId}`
	);
	console.log(notificationsResponse);
	if (notificationsResponse.error) {
		return {
			error: true,
			notifications: [] as Notification[]
		};
	} else {
		return {
			error: false,
			notifications: notificationsResponse.data! as Notification[]
		};
	}
};
