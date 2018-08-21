<template>
  <textarea v-if="myConfig.inputType==='textarea'" ref="inputEl"
            :id="id"
            :type="myConfig.inputType"
            :value="value"
            :placeholder="myConfig.placeholder||myConfig.name"
            :autocomplete="myConfig.autocomplete"
            :autofocus="myConfig.autofocus"
            :readonly="myConfig.readonly"
            :disabled="myConfig.disabled"
            :maxlength="myConfig.maxlength"
            v-on="listeners"></textarea>
  <input v-else ref="inputEl"
         :id="id"
         :type="myConfig.inputType"
         :value="value"
         :placeholder="myConfig.placeholder||myConfig.name"
         :autocomplete="myConfig.autocomplete"
         :autofocus="myConfig.autofocus"
         :readonly="myConfig.readonly"
         :disabled="myConfig.disabled"
         :maxlength="myConfig.maxlength"
         v-on="listeners">
</template>

<script>
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
    toInit: Boolean,
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
      return {
        ...defaultConf,
        ...this.config,
        inputType: this.typeConvert(this.config.inputType),
        validator: this.isFn(this.config.validator) ? this.config.validator : defaultConf.validator,
        preFormatter: this.isFn(this.config.preFormatter) ? this.config.preFormatter : val => val,
        sufFormatter: this.isFn(this.config.sufFormatter) ? this.config.sufFormatter : val => val,
      }
    },
    listeners() {
      return {
        ...this.$listeners,
        'input': ev => this.input(ev.target.value),
        'compositionstart': this.compStart,
        'compositionend': this.compEnd,
        'blur': (ev) => {
          this.blur(ev.target.value)
          if (this.$listeners.blur) this.$listeners.keyup(ev)
        },
        'keyup': (ev) => {
          if (ev.code === 'Enter') this.enter(ev.target.value)
          if (this.$listeners.keyup) this.$listeners.keyup(ev)
        },
      }
    },
  },
  watch: {
    value(val) {
      if (val !== this.myValue) {
        this.formChange(val, {})
      }
    },
    toInit(val) {
      if (val) {
        this.input('', { isInit: true })
      }
    },
  },
  methods: {
    typeConvert(type) {
      if (['password', 'text', 'textarea'].includes(type)) {
        return type
      }
      return 'text'
    },
    isFn(val) {
      return typeof val === 'function'
    },
    formChange(value, { isInit = false, isEnd = false }) {
      if (isInit) {
        this.pristine = true
        this.valid = false
        this.$emit('check', { pristine: this.pristine, valid: this.valid })
      } else {
        if (value) this.pristine = false
        if (!this.pristine) {
          if (this.myConfig.validateType === 'pre'
            || (this.myConfig.validateType === 'suf' && isEnd)) {
            this.valid = this.myConfig.validator(value)
            this.$emit('check', { pristine: this.pristine, valid: this.valid })
          }
        }
      }
    },
    input(val, isInit = false) {
      if (this.isCompositionStart) return
      const value = this.myConfig.preFormatter(val)

      this.formChange(value, { isInit })

      this.myValue = value
      if (this.$refs.inputEl) this.$refs.inputEl.value = this.myValue

      this.$emit('input', value)
    },
    blur(val) {
      const value = this.myConfig.sufFormatter(val)
      this.input(value, { isEnd: true })
    },
    enter(val) {
      this.blur(val)
    },
    compStart(ev) {
      if (this.$listeners.compositionstart) this.$listeners.compositionstart(ev)
      this.isCompositionStart = true
    },
    compEnd(ev) {
      if (this.$listeners.compositionend) this.$listeners.compositionend(ev)
      this.isCompositionStart = false
      this.input(ev.target.value)
    },
  },
}
</script>
