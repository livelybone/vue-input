<template>
  <component ref="inputEl"
             :is="currComp"
             :id="id"
             :type="inputType"
             :placeholder="myConfig.placeholder"
             :autocomplete="autoComplete"
             :autofocus="myConfig.autofocus"
             :readonly="myConfig.readonly"
             :disabled="myConfig.disabled"
             :maxlength="myConfig.maxlength"
             v-on="listeners" />
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
  // Fixed unexpected action of auto-fill in chrome and firefox
  // by setting `autocomplete` to 'off' to disabled auto-fill
  // by setting `autocomplete` to 'new-password' to disabled auto-fill of password input
  autocomplete: 'off',
  autofocus: false,
  disabled: false,
}

const fnC = (fn, defaultFn = val => val) => (fn instanceof Function ? fn : defaultFn)

const InputEvent = typeof window !== 'undefined' ? window.InputEvent : Object

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
  },
  data() {
    return {
      pristine: true,
      valid: true,
      myValue: '',
      isCompositionStart: false,
    }
  },
  computed: {
    myConfig() {
      const preFormatter = fnC(this.config.preFormatter)
      const sufFormatter = fnC(this.config.sufFormatter)
      const validator = fnC(this.config.validator)
      return {
        ...defaultConf,
        ...this.config,
        preFormatter,
        sufFormatter,
        validator,
      }
    },
    inputType() {
      const { myConfig: { inputType: type = 'text' } } = this
      return type
    },
    autoComplete() {
      const { myConfig: { inputType: type, autocomplete } } = this
        if (type === 'password' && autocomplete === 'off') return 'new-password'
        return autocomplete
    },
    currComp() {
      return this.inputType === 'textarea' ? 'textarea' : 'input'
    },
    listeners() {
      return {
        ...this.$listeners,
        'input': (ev) => {
          if (!InputEvent ||
            ev instanceof InputEvent ||
            this.myConfig.autocomplete === 'on') {
            this.input(ev.target.value)
          } else {
            this.input(this.myValue)
          }
        },
        'paste': ev => this.input(ev.target.value),
        'compositionstart': this.compStart,
        'compositionend': this.compEnd,
        'blur': (ev) => {
          this.blur(ev.target.value)
          if (this.$listeners.blur) this.$listeners.blur(ev)
        },
      }
    },
  },
  watch: {
    value: {
      handler(val) {
        const v = val ? val.toString() : ''
        if (v !== this.myValue) {
          this.input(v, { isKeyboardInput: false })
          this.formChange(v)
        }
      },
      immediate: true,
    },
  },
  methods: {
    init(val) {
      this.input(val.toString(), { isInit: true, isEnd: true })
    },
    formChange(value, { isInit = false, isEnd = false } = {}) {
      if (isInit) {
        this.pristine = true
        this.valid = true
        this.$emit('check', { pristine: this.pristine, valid: this.valid })
      } else {
        if (value) this.pristine = false
        const { validateType, validator } = this.myConfig
        if (!this.pristine) {
          if (validateType === 'pre' ||
            (validateType === 'suf' && isEnd)) {
            this.valid = validator(value)
            this.$emit('check', { pristine: this.pristine, valid: this.valid })
          }
        }
      }
    },
    input(val, { isInit = false, isEnd = false, isKeyboardInput = true } = {}) {
      if (this.isCompositionStart) return
      const { sufFormatter, preFormatter } = this.myConfig
      const value = isEnd ? sufFormatter(val) : preFormatter(val)

      this.formChange(value, { isInit, isEnd })

      if (this.myValue !== value) {
        this.myValue = value
      }

      this.$nextTick(() => {
        if (this.$refs.inputEl) this.$refs.inputEl.value = this.myValue
      })

      this.$emit('input', value)
      if (isKeyboardInput) this.$emit('keyboardInput', value)
    },
    blur(val) {
      const value = this.myConfig.sufFormatter(val)
      this.input(value, { isEnd: true })
    },
    compStart(ev) {
      if (this.$listeners.compositionstart) this.$listeners.compositionstart(ev)
      this.isCompositionStart = true
    },
    compEnd(ev) {
      if (this.$listeners.compositionend) this.$listeners.compositionend(ev)
      this.isCompositionStart = false
      this.$nextTick(() => {
        this.input(ev.target.value)
      })
    },
  },
}
</script>
