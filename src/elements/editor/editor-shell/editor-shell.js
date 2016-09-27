Polymer({
  is: 'editor-shell',

  properties: {
    dependenciesLoading: {
      type: Boolean,
      value: true,
      observer: '_dependencyObserver'
    },

    sceneLoading: {
      type: Boolean,
      value: true,
      observer: '_sceneObserver'
    },

    loading: {
      type: Boolean,
      value: true,
      reflectToAttribute: true
    },

    selectedMaterial: {
      type: Object,
      notify: true
    }
  },

  scenePath: '/src/elements/editor/editor-scene/editor-scene.html',

  _dependencyObserver: function() {
    if (!this.dependenciesLoading) {
      this.importHref(this.scenePath, function() {
        this.sceneLoading = false;
      },
      function() {
        console.log('error');
      });
    }
  },

  _sceneObserver: function() {
    if (!this.sceneLoading) {
      this.loading = false;
    }
  },

  _onMaterialListLoaded: function(response) {
    this.materialList = response.detail.response;
  }

});