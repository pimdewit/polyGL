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

  attached() {
    this._addEventListeners();
  },

  _routePageChanged(page) {
    this.page = page || 'home';
    this.drawerOpened = false;
  },

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    var resolvedPageUrl = this.resolveUrl(
        '../pages/page-' + page + '/page-' + page + '.html');

    this.importHref(resolvedPageUrl, null, this._showPage404, true);
  },

  _showPage404() {
    this.page = '404';
  },

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------


  _addEventListeners() {
    window.addEventListener('app-drawer', function(event) {
      if (event.detail.toggle) {
        this._toggleDrawer();
      }
    }.bind(this));
  },

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  _openDrawer() {
    this.$.drawer.open();
  },

  _closeDrawer() {
    this.$.drawer.close();
  },

  _toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  },

  // a11y
  _drawerOpenState() {
    if (!this.drawerOpened) {
      this.$.menutoggle.focus();
    }
  },

  // a11y
  _handledFocus() {
    this.async(function() {
      this.$.dSelector.selectedItem.focus();
      this.dFocus = this._getSelectedDrawerItem();
    });
  },

  // a11y
  _onDrawerTransitionEnd() {
    if (this.drawerOpened) {
      this._handledFocus();
    }
  },

  _getSelectedDrawerItem() {
    return this.$.dSelector.indexOf(this.$.dSelector.selectedItem);
  },

  _onKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this._toggleDrawer();
    }
  },

  // a11y
  _onDrawerKeyUp(event) {
    var key = event.keyCode || event.which;

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
  _focusPreviousDrawerItem(event) {
    if (this.dFocus <= 0) {
      this.dFocus = this.$.dSelector.items.length - 1;
    } else {
      this.dFocus--;
    }
    this.$.dSelector.items[this.dFocus].focus();
  },

  // a11y
  _focusNextDrawerItem(event) {
    if (this.dFocus >= this.$.dSelector.items.length - 1) {
      this.dFocus = 0;
    } else {
      this.dFocus++;
    }
    this.$.dSelector.items[this.dFocus].focus();
  },

  // a11y
  _focusDrawerReset(event) {
    if (this.dFocus >= this.$.dSelector.items.length -1) {
      this.dFocus = 0;
    } else {
      this.dFocus++;
    }

    this.$.dSelector.items[this.dFocus].focus();
  }
});