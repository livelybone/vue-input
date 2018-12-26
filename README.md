# @livelybone/vue-input
A vue input component, a wrapper of input validator, formatter. textarea available

Deal bug of chinese input

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
