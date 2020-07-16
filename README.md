# React Froala Module (Supported SSR)

bd-fe-froala-react

## How to use

SSR need [@loadable/component](https://github.com/gregberge/loadable-components)

```js
import loadable from '@loadable/component';
```

```js
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/themes/dark.min.css';
import '@fortawesome/fontawesome-pro/css/all.css';

const LoadableFroalaEditor = loadable(() => import('@ejnkr/bd-fe-froala-react'));

// React
export default () => {
  // ...
  return (
    <div>
      {typeof window !== 'undefined' && (
        <LoadableFroalaEditor
          config={config}
          onModelChange={(newModel) => newModel}
          model={value}
          debug
        />
      )}
    </div>
  );
};
```

## How to run

#### Install

```bash
$ npm install
```

#### Build

```bash
$ npm run build
```

#### Test

```bash
$ npm run test
```

#### Deploy

If has a tag, auto deployed into Github NPM

- To Prod

```bash
$ npm run version:prod
$ npm run deploy
```

- To Develop

```bash
$ npm run version:dev
$ npm run deploy
```

- To Feature

```bash
$ npm run version:test
$ npm run deploy
```

#### Prettier & Lint

```bash
$ npm run prettier
$ npm run lint
$ npm run lint:fix
```

## Notification

- [Slack - bd-github](https://ejnkr.slack.com/archives/CS6ULQPHB)
