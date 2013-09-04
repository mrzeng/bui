/**
 * @fileoverview \u5f02\u6b65\u6587\u4ef6\u4e0a\u4f20\u7ec4\u4ef6
 * @author \u7d22\u4e18 zengyue.yezy@alibaba-inc.com
 **/define("bui/uploader/uploader",function(e){var t=e("bui/common"),n=e("bui/uploader/button/htmlButton"),r=e("bui/uploader/button/swfButton"),i=e("bui/uploader/queue"),s=e("bui/uploader/type/ajax"),o=e("bui/uploader/type/flash"),u=e("bui/uploader/type/iframe"),a=t.Component,f=t.prefix,l=f+"uploader",c=l+"-button",h=c+"-text",p=window,d=a.View.extend({_uiSetButtonCls:function(e){var t=this,n=t.get("buttonCls"),r=t.get("el").find("."+c);r.addClass(n)},_uiSetText:function(e){var t=this,n=t.get("text"),r=t.get("el").find("."+h);r.text(n)}},{ATTRS:{}}),v=a.Controller.extend({initializer:function(){var e=this;e._initType(),e._initButton(),e._initQueue(),e._initUploaderType()},_getButtonClass:function(e){var t=this,i=t.get("types");return e===i.AJAX||e===i.IFRAME?n:r},_getUploaderType:function(e){var t=this,n=t.get("types"),r;switch(e){case n.AJAX:r=s;break;case n.FLASH:r=o;break;case n.IFRAME:r=u;break;default:}return r},_initButton:function(){var e=this,t=e.get("type"),n=e._getButtonClass(t),r=e.get("name"),i=e.get("multiple"),s=e.get("filter"),o=new n({uploader:e,multiple:i,filter:s});e.set("button",o)},_initQueue:function(){var e=this,t=e.get("queue"),n=e.get("render");t||(t=new i({render:n}),e.set("queue",t))},_initType:function(){var e=this,t=e.get("types"),n=e.get("type");n||(e.isSupportAjax()?e.set("type",t.AJAX):e.isSupportFlash()?e.set("type",t.FLASH):e.set("type",t.IFRAME))},_initUploaderType:function(){var e=this,t=e.get("type"),n=e._getUploaderType(t),r=new n({uploader:e,action:e.get("url"),data:e.get("data")});e.set("uploaderType",r)},_renderButton:function(){var e=this,t=e.get("view").get("el").find("."+c),n=e.get("button");n.set("render",t),n.render()},_bindButton:function(){var e=this,t=e.get("button"),n=e.get("queue"),r=e.get("uploaderType");t.on("change",function(e){n.addItems(e.files)})},_bindQueue:function(){var e=this,t=e.get("queue");t.on("itemrendered itemupdated",function(n){var r=t.getItemsByStatus("waiting");r.length&&e.uploadFiles()})},_bindUploaderCore:function(){var e=this,n=e.get("queue"),r=e.get("uploaderType");e._bindButton(),e._bindQueue(),r.on("progress",function(r){var i=e.get("curUploadItem"),s=r.loaded,o=r.total;n.clearItemStatus(i),n.setItemStatus(i,"progress",!0),t.mix(i,{loaded:s,total:o,loadedPercent:s*100/o}),n.updateItem(i),e.fire("progress",{item:i,total:o,loaded:s})}),r.on("stop",function(t){var r=e.get("curUploadItem");n.clearItemStatus(r),n.setItemStatus(r,"cancel",!0),e.set("curUploadItem",null),e.fire("stop",{curUploadItem:r})}),r.on("success",function(r){var i=r.result,s=n.getItemsByStatus("waiting"),o=e.get("curUploadItem");o.url=i.url,t.mix(o,{url:i.url}),n.clearItemStatus(o),n.setItemStatus(o,"success",!0),n.updateItem(o),e.set("curUploadItem",null),s.length?e.uploadFile(s[0]):e.fire("end"),e.fire("success",{item:o})}),r.on("error",function(t){e.fire("error")})},isSupportAjax:function(){return!!p.FormData},isSupportFlash:function(){return!0},renderUI:function(){var e=this;e._renderButton(),e.get("queue").render()},bindUI:function(){var e=this;e._bindUploaderCore()},uploadFile:function(e){var t=this,n=t.get("queue"),r=t.get("uploaderType"),i=t.get("curUploadItem");e&&!i&&(t.set("curUploadItem",e),n.clearItemStatus(e),n.setItemStatus(e,"start",!0),t.fire("itemstart",{item:e}),r.upload(e))},uploadFiles:function(){var e=this,t=e.get("queue"),n=t.getItemsByStatus("waiting"),r=e.get("curUploadItem");n.length&&!r&&(e.fire("start"),e.uploadFile(n[0]))}},{ATTRS:{buttonCls:{view:!0},textCls:{view:!0},text:{view:!0,value:"\u4e0a\u4f20\u6587\u4ef6"},tpl:{view:!0,value:'<a href="javascript:void(0);" class="'+c+'  {buttonCls}"><span class="'+h+' {textCls}">{text}</span></a>'},types:{value:{AJAX:"ajax",FLASH:"flash",IFRAME:"iframe"}},type:{},uploadStatus:{},xview:{value:d}}},{xclass:"uploader"});return v});
