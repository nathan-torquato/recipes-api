export class NotImplemented extends Error {
	statusCode = 501;

	constructor(message: string) {
		super(message);
		this.name = 'NotImplemented';
	}
}
