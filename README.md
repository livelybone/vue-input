# @livelybone/vue-input
A vue input component, a wrapper of input validator, formatter. textarea available

## repository
https://github.com/livelybone/vue-input.git

## Demo
https://github.com/livelybone/vue-input#readme

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

## Props
| Name              | Type                                      | DefaultValue         | Description  |
| ----------------- | ----------------------------------------- | -------------------- | ------------ |
| `id`              | `[String, Number]`                        | none                 |  |
| `value`           | `[String, Number]`                        | none                 |  |
| `config`          | `String`                                  | ```{
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
                                                                   }```                 |  |

## Events
| Name                  | EmittedData           | Description                                       |
| --------------------- | --------------------- | ------------------------------------------------- |
| `input`               | `String`              | |

## style
For building style, you can use the css or scss file in lib directory. 
```js
// scss
import 'node_modules/@livelybone/vue-datepicker/lib/css/index.scss'

// css
import 'node_modules/@livelybone/vue-datepicker/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/vue-datepicker/lib/css/index.scss';

// css
@import 'node_modules/@livelybone/vue-datepicker/lib/css/index.css';
```

Or, you can build your custom style by copying and editing `index.scss`
