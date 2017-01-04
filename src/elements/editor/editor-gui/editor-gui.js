Polymer({
  is: 'editor-gui',

  properties: {
    selectedMaterialGroup: {
      type: Number,
      value: 0
    },

    zoomed: {
      type: Boolean,
      value: false,
      notify: true,
      observer: 'zoomObserver'
    },

    zoomText: String,
  },

  attached() {
    this._addEventListeners();
  },

  _addEventListeners() {
    this._onKeyDownHandler = this._onKeyDown.bind(this);
    window.addEventListener('keydown', this._onKeyDownHandler);
  },

  _onKeyDown(event) {
    console.log(event);
    var key = event.keyCode || event.which;

    if (key === 90) {
      console.log('key is down');
      this.setZoom();
    }
  },

  setZoom() {
    this.zoomed = !this.zoomed;
  },

  zoomObserver() {
    var detail = {
      'detail': {
        'zoomed': this.zoomed
      }
    };

    var event = new CustomEvent('editor-zoom', detail);
    window.dispatchEvent(event);

    this.zoomed === false ? this.zoomText = 'zoom in' : this.zoomText = 'zoom out';
    this.$.zoom.active = this.zoomed;
  },

  detached() {
    window.removeEventListener('keydown', this._onKeyDownHandler);
  }

});