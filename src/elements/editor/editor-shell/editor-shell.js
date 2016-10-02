Polymer({
  is: 'editor-shell',

  properties: {
    loading: {
      type: Boolean,
      reflectToAttribute: true
    },

    material: Object,
    paused: Boolean
  },

  scenePath: '/src/elements/editor/editor-scene/editor-scene.html',

  attached: function() {
    this._addEventListeners();
  },

  _addEventListeners: function() {
    window.addEventListener('editor-dependencies-loaded', function(event) {
      this._startScene();
    }.bind(this));

    window.addEventListener('editor-material-changed', function(event) {
      if (this.material != event.detail.material) {
        this.loading = 'loading';
        this.material = event.detail.material;
      }
    }.bind(this));
  },

  _startScene: function() {
    this.importHref(this.scenePath, function() {
      this.loading = 'dependencies-loaded';
    },
    function() {
      console.log('error');
    });
  },

  _onMaterialListLoaded: function(response) {
    this.materialList = response.detail.response;
  }

});