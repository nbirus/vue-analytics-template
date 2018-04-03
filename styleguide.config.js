module.exports = {
  webpackConfig: require('./build/webpack.prod.conf.js'),
  sections: [
    {
      name: 'Configuration',
      content: 'README.md'
    },
    {
      name: 'Common',
      components: 'src/components/common/*.vue'
    },
    {
      name: 'Inputs',
      components: 'src/components/common/inputs/*.vue'
    },
    {
      name: 'Generators',
      components: 'src/components/generators/*.vue'
    },
    {
      name: 'Reporting',
      sections: [
        {
          name: 'Grid',
          components: 'src/components/reporting/Grid.vue'
        },
        {
          name: 'Charts',
          components: 'src/components/reporting/charts/*.vue'
        },
        {
          name: 'Widgets',
          components: 'src/components/reporting/reporting/*.vue'
        }
      ]
    }
  ]
};
