Polymer({
  is: 'editor-shell',

  properties: {
    loading: {
      type: String,
      value: true,
      reflectToAttribute: true
    },

    selectedMaterial: {
      type: Object,
      notify: true
    }
  }
});