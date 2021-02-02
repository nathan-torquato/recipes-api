export class NotImplemented extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotImplemented';
		this.statusCode = 501;
	}
}
