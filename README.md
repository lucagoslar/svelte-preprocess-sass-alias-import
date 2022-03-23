## svelte-preprocess-sass-alias-import

🗃 Import external stylesheets with the help of absolute paths.

Though this package might also work in a different environment that uses sass, it should be noted that it serves the [legacy importer](https://sass-lang.com/documentation/js-api/modules#LegacyImporter) used by [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess).

[![build and test](https://github.com/lucagoslar/svelte-preprocess-sass-alias-import/actions/workflows/main.yml/badge.svg)](https://github.com/lucagoslar/svelte-preprocess-sass-alias-import/actions/workflows/main.yml)

## Setup

1. Import `SassAlias` from `svelte-preprocess-sass-alias-import`.

```ts
import { SassAlias } from 'svelte-preprocess-sass-alias-import';
```

2. Instantiate `SassAlias` and pass it an object containing your rules.

```ts
const alias = new SassAlias({
	$var: 'src/scss',
  @var: ["src", "scss"]
});
```

3. Add and bind the `SassAlias` instance to the project's preprocessor.
   (Sample usage with SvelteKit.)

```ts
// svelte.config.js
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			sass: {
				importer: [alias.resolve.bind(alias)],
			},
			scss: {
				importer: [alias.resolve.bind(alias)],
			}, // Use for both sass and or scss
		}),
	],

	kit: {
		vite: {
			// Only required if you want to import stylesheets into an already imported stylesheet
			css: {
				preprocessorOptions: {
					sass: {
						importer: [alias.resolve.bind(alias)],
					},
					scss: {
						importer: [alias.resolve.bind(alias)],
					},
				},
			},
		},
	},
};

export default config;
```

4. Import files using your predefined aliases.

```svelte
<!-- *.svelte -->
<style lang="scss">
  @import "$var/main.scss";
</style>
```

```svelte
<!-- *.svelte -->
<style lang="sass">
  @use "@var/main.scss"
</style>
```

```scss
// *.scss
@use '@var/main.scss';
```

## Contribute

Install all (dev-)dependencies by running the following.

```
  npm i
```

Make sure [husky](https://github.com/typicode/husky) is being installed too.

```
  npm run prepare
```

\
_And off we go …_

Build this project with the following.

```
npm run build
```

Contributions of any kind are very much appreciated.
