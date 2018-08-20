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
         v-on="listeners">
</template>

<script>
const defaultConf = {
  inputType: 'text',
  placeholder: '',
  validator: () => true,
  formatter: val => val,
  needTrim: true,
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
      valid: false,
      isCompositionStart: false,
    }
  },
  computed: {
    myConfig() {
      return {
        ...defaultConf,
        ...this.config,
        validator: this.isFn(this.config.validator) ? this.config.validator : defaultConf.validator,
        formatter: this.isFn(this.config.formatter) ? this.config.formatter : val => val,
      }
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
      }
    },
    toInit(val) {
      if (val) {
        this.input('', true)
      }
    },
  },
  methods: {
    isFn(val) {
      return typeof val === 'function'
    },
    formChange(value, isInit = false) {
      if (isInit) {
        this.pristine = true
        this.valid = false
        this.$emit('check', { pristine: this.pristine, valid: this.valid })
        return
      }
      if (value) this.pristine = false
      if (!this.pristine) {
        this.valid = this.myConfig.validator(value)
        this.$emit('check', { pristine: this.pristine, valid: this.valid })
      }
    },
    input(val, isInit = false) {
      if (this.isCompositionStart) return
      const value = this.myConfig.formatter(val)

      this.formChange(value, isInit)

      this.myValue = value
      if (this.$refs.inputEl) this.$refs.inputEl.value = this.myValue

      this.$emit('input', value)
    },
    blur(val) {
      const value = this.myConfig.needTrim ? val.trim() : val
      this.input(value)
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
