import { SassAlias } from '@src/index';
import sass from 'sass';
import path from 'path';

const base = path.join('src', '__tests__');

const aliasArray = new SassAlias({
	$scss: [base, 'src'],
});

const aliasString = new SassAlias({
	$scss: path.join(base, 'src'),
});

it('should resolve the alias (array)', () => {
	const result = sass.renderSync({
		file: path.join(base, 'src', 'main.scss'),
		importer: [aliasArray.resolve.bind(aliasArray)],
	});

	expect(result.css.toString().replace(/\s+/g, '')).toEqual(
		`body{content:"welcome";color:red;}`
	);
});

it('should resolve the alias (string)', () => {
	const result = sass.renderSync({
		file: path.join(base, 'src', 'main.scss'),
		importer: [aliasString.resolve.bind(aliasString)],
	});

	expect(result.css.toString().replace(/\s+/g, '')).toEqual(
		`body{content:"welcome";color:red;}`
	);
});
