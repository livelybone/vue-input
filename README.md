# @livelybone/vue-input
![gzip with dependencies: 1.5kb](https://img.shields.io/badge/gzip--with--dependencies-1.5kb-brightgreen.svg "gzip with dependencies: 1.5kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")
![mobile supported](https://img.shields.io/badge/mobile-supported-green.svg "mobile supported")
![ssr supported](https://img.shields.io/badge/ssr-supported-green.svg "ssr supported")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A vue input component, a wrapper of input validator, formatter. textarea available

> Fixed bug of chinese input

> Fixed unexpected action of auto-fill in chrome and firefox by setting set `autocomplete` to 'off' to disabled auto-fill  

## repository
https://github.com/livelybone/vue-input.git

## Demo
https://livelybone.github.io/vue/vue-input/

## Installation
```bash
npm i -S @livelybone/vue-input
```

## Register
```js
import VueInput from '@livelybone/vue-input';

// Global register
Vue.component('vue-input', VueInput);

// Local register
new Vue({
  components:{VueInput}
})
```

## Init
You can init a instance by call its `init` method, then the `valid` and `pristine` will be reset, 
see: https://github.com/livelybone/vue-input/blob/master/src/components/Index.vue#L95-L97

## Props
| Name              | Type                                      | DefaultValue         | Description  |
| ----------------- | ----------------------------------------- | -------------------- | ------------ |
| `id`              | `[String, Number]`                        | none                 |  |
| `value`           | `[String, Number]`                        | none                 |  |
| `config`          | `String`                                  | `defaultConf`        |  |

```js
// defaultValue of config
const defaultConf = {
  // Options: [textarea, text, password, ...]
  inputType: 'text', 
  placeholder: '',
  validator: () => true,
  // ['pre','suf'], timing of validator
  validateType: 'pre',
  // Formatting when inputting
  preFormatter: val => val,
  // Formatting at the end of inputting
  sufFormatter: val => val,
  maxlength: null,
  readonly: false,
  // Fixed unexpected action of auto-fill in chrome and firefox
  autocomplete: 'off',
  autofocus: false,
  disabled: false,
}
```

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `input`               | `String`              |  |
| `check`               | `Object`              | Example: `{ valid: true, pristine: true }` |
