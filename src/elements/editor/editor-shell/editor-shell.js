Polymer({
  is: 'editor-shell',

  properties: {
    loading: {
      type: String,
      value: true,
      reflectToAttribute: true,
      observer: '_loadingObserver'
    },

    selectedMaterial: {
      type: Object,
      notify: true
    },

    material: {
      type: Object,
      observer: '_materialObserver'
    }
  },

  scenePath: '/src/elements/editor/editor-scene/editor-scene.html',

  _loadingObserver: function() {
    if (!this.loading) {
      this.importHref(this.scenePath, function() {
        this.loading = false;
        console.log('scene init');
      },
      function() {
        console.log('error');
      });
    }
  },

  _materialObserver: function() {
    if (this.material) {
      console.log(this.material);
    }
  },

  _onMaterialListLoaded: function(response) {
    this.materialList = response.detail.response;
    console.log(this.materialList);
  }

});