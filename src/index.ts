import path from 'path';

export class SassAlias {
	private dict;

	constructor(config: Record<string, Array<string> | string>) {
		const tmp: Record<string, string> = {};

		for (const [key, value] of Object.entries(config)) {
			let generated = process.cwd();

			if (Array.isArray(value)) {
				value.forEach((step) => (generated = path.join(generated, step)));
			} else {
				generated = path.join(generated, value);
			}

			tmp[key] = generated;
		}

		this.dict = Object.entries(tmp);
	}

	public resolve(absolute: string): { file: string } | null {
		for (const [key, value] of this.dict) {
			if (absolute.startsWith(key)) {
				return { file: path.join(value, absolute.substring(key.length)) };
			}
		}

		return null;
	}
}
