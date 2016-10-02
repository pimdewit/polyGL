Polymer({
  is: 'editor-shell',

  properties: {
    loading: {
      type: Boolean,
      reflectToAttribute: true
    },

    materialList: Object,
    material: Object,
    paused: Boolean
  },

  scenePath: '/src/elements/editor/editor-scene/editor-scene.html',

  attached: function() {
    this._addEventListeners();
  },

  /**
   * Add event listeners.
   */
  _addEventListeners: function() {
    window.addEventListener('editor-dependencies-loaded', function(event) {
      this._startScene();
    }.bind(this));

    window.addEventListener('editor-material-changed', function(event) {
      if (this.material != event.detail.material) {
        this.loading = 'loading';
        this.material = event.detail.material;
        
        this._populateMeta();
      }
    }.bind(this));
  },

  _populateMeta: function() {
    this.$.title.innerHTML = this.material.name;
    this.$.description.innerHTML = this.material.description;
  },

  /**
   * Start the scene.
   */
  _startScene: function() {
    this.importHref(this.scenePath, function() {
      this.loading = 'dependencies-loaded';
    },
    function() {
      console.log('error');
    });
  },

  /**
   * On material list loaded.
   */
  _onMaterialListLoaded: function(response) {
    this.materialList = response.detail.response;
  }

});