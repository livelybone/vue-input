import Vue from 'vue'

export interface InputConfig {
    inputType?: string
    placeholder?: string
    validator?(): true
    /**
     * ['pre''suf'] timing of validator
     *
     * Default: 'pre'
     * */
    validateType?: 'pre'
    /**
     * Formatting when inputting
     * */
    preFormatter?(val: string): string
    /**
     * Formatting at the end of inputting
     * */
    sufFormatter?(val: string): string
    maxlength?: number
    readonly: boolean
    /**
     * Fixed unexpected action of auto-fill in chrome and firefox
     * by setting `autocomplete` to 'off' to disabled auto-fill
     * by setting `autocomplete` to 'new-password' to disabled auto-fill of password input
     * */
    autocomplete?: string
    autofocus?: boolean
    disabled?: boolean
}

declare class VueInput extends Vue {
    id?: string | number
    value?: string | number
    config?: InputConfig
}

export default VueInput
