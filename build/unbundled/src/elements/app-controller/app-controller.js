Polymer({is:"app-controller",properties:{page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},drawerOpened:{type:Boolean,value:!1,observer:"_drawerOpenState"},dFocus:Number},listeners:{"drawer.transitionend":"_onDrawerTransitionEnd","drawer.keyup":"_onDrawerKeyUp"},observers:["_routePageChanged(routeData.page)"],_routePageChanged:function(e){this.page=e||"home",this.drawerOpened=!1},_pageChanged:function(e){var t=this.resolveUrl("../pages/page-"+e+"/page-"+e+".html");this.importHref(t,null,this._showPage404,!0)},_showPage404:function(){this.page="404"},_openDrawer:function(){this.$.drawer.open()},_closeDrawer:function(){this.$.drawer.close()},_toggleDrawer:function(){this.drawerOpened=!this.drawerOpened},_drawerOpenState:function(){this.drawerOpened||this.$.menutoggle.focus()},_handledFocus:function(){this.async(function(){this.$.dSelector.selectedItem.focus(),this.dFocus=this._getSelectedDrawerItem()})},_onDrawerTransitionEnd:function(){this.drawerOpened&&this._handledFocus()},_getSelectedDrawerItem:function(){return this.$.dSelector.indexOf(this.$.dSelector.selectedItem)},_onKeyDown:function(e){32!==e.keyCode&&13!==e.keyCode||this._toggleDrawer()},_onDrawerKeyUp:function(e){var t=e.keyCode||e.which;38===t&&this._focusPreviousDrawerItem(e),40===t&&this._focusNextDrawerItem(e),9===t&&this._focusDrawerReset(e)},_focusPreviousDrawerItem:function(e){this.dFocus<=0?this.dFocus=this.$.dSelector.items.length-1:this.dFocus--,this.$.dSelector.items[this.dFocus].focus()},_focusNextDrawerItem:function(e){this.dFocus>=this.$.dSelector.items.length-1?this.dFocus=0:this.dFocus++,this.$.dSelector.items[this.dFocus].focus()},_focusDrawerReset:function(e){this.dFocus>=this.$.dSelector.items.length-1?this.dFocus=0:this.dFocus++,this.$.dSelector.items[this.dFocus].focus()}});