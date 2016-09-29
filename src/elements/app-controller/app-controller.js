Polymer({
  is: 'app-controller',

  properties: {
    page: {
      type: String,
      reflectToAttribute: true,
      observer: '_pageChanged'
    },

    drawerOpened: {
      type: Boolean,
      value: false,
      observer: '_drawerOpenState'
    },

    dFocus: Number
  },

  listeners: {
    'drawer.transitionend': '_onDrawerTransitionEnd',
    'drawer.keyup': '_onDrawerKeyUp'
  },

  observers: [
    '_routePageChanged(routeData.page)'
  ],

  _routePageChanged: function(page) {
    this.page = page || 'home';
    this.drawerOpened = false;
  },

  _pageChanged: function(page) {
    // Load page import on demand. Show 404 page if fails
    var resolvedPageUrl = this.resolveUrl(
        '../pages/page-' + page + '/page-' + page + '.html');

    this.importHref(resolvedPageUrl, null, this._showPage404, true);
  },

  _showPage404: function() {
    this.page = '404';
  },

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  _openDrawer: function() {
    this.$.drawer.open();
  },

  _closeDrawer: function() {
    this.$.drawer.close();
  },

  _toggleDrawer: function() {
    this.drawerOpened = !this.drawerOpened;
  },

  // a11y
  _drawerOpenState: function() {
    if (!this.drawerOpened) {
      this.$.menutoggle.focus();
    }
  },

  // a11y
  _handledFocus: function() {
    this.async(function() {
      this.$.dSelector.selectedItem.focus();
      this.dFocus = this._getSelectedDrawerItem();
    });
  },

  // a11y
  _onDrawerTransitionEnd: function() {
    if (this.drawerOpened) {
      this._handledFocus();
    }
  },

  _getSelectedDrawerItem: function() {
    return this.$.dSelector.indexOf(this.$.dSelector.selectedItem);
  },

  _onKeyDown: function(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this._toggleDrawer();
    }
  },

  // a11y
  _onDrawerKeyUp: function(event) {
    let key = event.keyCode || event.which;

    // Up-arrow
    if (key === 38) {
      this._focusPreviousDrawerItem(event);
    }

    // Down-arrow
    if (key === 40) {
      this._focusNextDrawerItem(event);
    }

    // Tab
    if (key === 9) {
      // Re-calculate focus on tab
      this._focusDrawerReset(event);
    }
  },

  // a11y
  _focusPreviousDrawerItem: function(event) {
    if (this.dFocus <= 0) {
      this.dFocus = this.$.dSelector.items.length - 1;
    } else {
      this.dFocus--;
    }
    this.$.dSelector.items[this.dFocus].focus();
  },

  // a11y
  _focusNextDrawerItem: function(event) {
    if (this.dFocus >= this.$.dSelector.items.length - 1) {
      this.dFocus = 0;
    } else {
      this.dFocus++;
    }
    this.$.dSelector.items[this.dFocus].focus();
  },

  // a11y
  _focusDrawerReset: function(event) {
    if (this.dFocus >= this.$.dSelector.items.length -1) {
      this.dFocus = 0;
    } else {
      this.dFocus++;
    }

    this.$.dSelector.items[this.dFocus].focus();
  }
});