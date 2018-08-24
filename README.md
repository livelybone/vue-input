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
| `config`          | `String`                                  | `{
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
                                                                   }`                 |  |

<table width="300" class="table table-bordered table-striped table-condensed">
   <tbody><tr>
      <th width="25%">时间</th>
      <th width="25%">地点</th>
      <th width="50%">人物</th>
   </tr>
   <tr>
      <td>3月5日</td>
      <td>北京</td>
      <td>姚明</td>
   </tr>
   <tr>
      <td>3月7日</td>
      <td>上海</td>
      <td>{
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
                                                                             }</td>
   </tr>
</tbody></table>

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
