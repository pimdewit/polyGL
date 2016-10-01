Polymer({
  is: 'editor-shell',

  properties: {

    loading: {
      type: Boolean,
      notify: true,
      reflectToAttribute: true
    },

    material: {
      type: Object
    }
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
      this.loading = 'dependencies-loaded';
      this.material = event.detail.material;
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