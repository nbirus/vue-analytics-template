<template>
  <section v-show="isActive"
           :aria-hidden="!isActive"
           :id="hash"
           role="tabpanel"
  >
    <slot />
  </section>
</template>

<script>

  export default {
    name: 'tab',
    props: {
      id: { default: null },
      name: { required: true },
      icon: {required: false },
      prefix: { default: '' },
      suffix: { default: '' },
      isDisabled: { default: false }
    },

    data: () => ({
      isActive: false,
      isVisible: true
    }),

    computed: {
      header () {
        let name = this.prefix + this.name + this.suffix
        let icon = (this.icon) ? '<i class="fas fa-' + this.icon + '"></i>' : ''

        return icon + name
      },

      hash () {
        if (this.isDisabled) {
          return '#'
        }

        return this.id
          ? '#' + this.id
          : '#' + this.name.toLowerCase().replace(/ /g, '-')
      }
    }
  }

</script>
