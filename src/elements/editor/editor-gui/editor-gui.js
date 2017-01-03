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

    var event = new CustomEvent('editor-zoomed', detail);
    window.dispatchEvent(event);

    this.zoomed === false ? this.zoomText = 'zoom in' : this.zoomText = 'zoom out';
  }

});