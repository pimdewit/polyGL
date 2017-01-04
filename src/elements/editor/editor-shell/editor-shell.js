Polymer({
  is: 'editor-shell',

  properties: {
    loading: {
      type: Boolean,
      reflectToAttribute: true
    },

    materialList: Object,
    material: Object,
    environmentEffects: Object,
    paused: Boolean,
    zoomed: Boolean
  },

  scenePath: '/src/elements/editor/editor-scene/editor-scene.html',

  attached() {
    this._addEventListeners();
  },

  /**
   * Add event listeners.
   */
  _addEventListeners() {
    window.addEventListener('editor-dependencies-loaded', function(event) {
      this._startScene();
    }.bind(this));

    window.addEventListener('editor-material-changed', function(event) {
      // Check if new material is different from the currently active material.
      if (this.material != event.detail.material) {
        this.loading = 'loading';
        this.material = event.detail.material;

        this._populateMeta();
      }
    }.bind(this));
  },

  _populateMeta() {
    this.$.title.innerHTML = this.material.name;
    this.$.description.innerHTML = this.material.description;
  },

  /**
   * Start the scene.
   */
  _startScene() {
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
  _onMaterialListLoaded(response) {
    this.materialList = response.detail.response;
  },

  /**
   * On material list loaded.
   */
  _onEnvironmentEffectsLoaded(response) {
    this.environmentEffects = response.detail.response;
  }
});
