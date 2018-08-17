<template>
  <input :type="myConfig.inputType"
         :id="id"
         :value="value"
         :style="styles"
         :placeholder="myConfig.placeholder||myConfig.name"
         ref="inputEl"
         @focus="$emit('focus', $event)"
         @input="input($event.target.value)"
         @keyup.enter="$emit('keyup.enter',$event.target.value)"
         @blur="blur($event.target.value)"
         @compositionstart="isCompositionStart=true"
         @compositionend="isCompositionStart=false;input($event.target.value)">
</template>

<script>
const defaultConf = {
  inputType: 'text',
  placeholder: '',
  validator: () => true,
  formatter: val => val,
  required: true,
  needTrim: true,
}

export default {
  props: {
    id: [String, Number],
    value: [String, Number],
    config: {
      default() {
        return defaultConf
      },
      type: Object,
    },
    styles: Object,
  },
  data() {
    return {
      pristine: true,
      valid: true,
      isCompositionStart: false,
    }
  },
  computed: {
    myConfig() {
      return { ...defaultConf, ...this.config }
    },
    listeners() {
      return {
        ...this.$listeners,
        'input': ev => this.input(ev.target.value),
        'compositionstart': this.compStart,
        'compositionend': this.compEnd,
        'blur': this.blur,
        'keyup': (ev) => {
          if (ev.code === 'Enter') this.enter(ev)
          if (this.$listeners.keyup) this.$listeners.keyup(ev)
        },
      }
    },
  },
  watch: {
    value(val) {
      if (val !== this.myValue) {
        this.formChange(val)
        if (this.valid) {
          this.$emit('check', { pristine: this.pristine, valid: this.valid })
        }
      }
    },
  },
  methods: {
    formChange(value, isBlur = false) {
      if (value) this.pristine = false
      if (!this.pristine) {
        const valid = (value && !this.myConfig.validator)
          || (value && this.myConfig.validator && this.myConfig.validator(value))
          || (this.myConfig.required === false && !value)
        if (!isBlur && valid !== this.valid) {
          this.valid = valid
          this.$emit('check', { pristine: this.pristine, valid: this.valid })
        }
      }
    },
    input(val, isBlur = false) {
      if (this.isCompositionStart) return
      const value = this.myConfig.formatter(val)

      this.formChange(value, isBlur)

      this.myValue = value
      if (this.$refs.inputEl) this.$refs.inputEl.value = this.myValue

      this.$emit('input', value)
    },
    blur(val) {
      const value = this.myConfig.needTrim ? val.trim() : val
      this.input(value, true)
      this.$emit('check', { pristine: this.pristine, valid: this.valid })
    },
    enter(val) {
      this.blur(val)
    },
    compStart() {
      this.isCompositionStart = true
    },
    compEnd(ev) {
      this.isCompositionStart = false
      this.input(ev.target.value)
    },
  },
}
</script>
