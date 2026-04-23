

function nathalliVrSkin(player,base) {
	player.addVariable('vis_userdata', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_image_popup', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_info_popup', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_video_popup_file', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_video_popup_url', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_video_popup_vimeo', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_video_popup_youtube', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_website', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_timer', 2, false, { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var vrSkinAdded=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.addSkin=function() {
		if (me.vrSkinAdded) return;
		me.vrSkinAdded = true;
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-0.8);
		el.translateY(0.6);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 480;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrvideo_popup_file';
		el.userData.x = -0.8;
		el.userData.y = 0.6;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vrvideo_popup_file.material) me._vrvideo_popup_file.material.opacity = v;
			me._vrvideo_popup_file.visible = (v>0 && me._vrvideo_popup_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vrvideo_popup_file.visible
			let parentEl = me._vrvideo_popup_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrvideo_popup_file.userData.opacity = v;
			v = v * me._vrvideo_popup_file.userData.parentOpacity;
			me._vrvideo_popup_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrvideo_popup_file.children.length; i++) {
				let child = me._vrvideo_popup_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrvideo_popup_file.userData.parentOpacity = v;
			v = v * me._vrvideo_popup_file.userData.opacity
			me._vrvideo_popup_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrvideo_popup_file.children.length; i++) {
				let child = me._vrvideo_popup_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrvideo_popup_file = el;
		el.userData.ggId="vrvideo_popup_file";
		me._vrvideo_popup_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrvideo_popup_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrvideo_popup_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrvideo_popup_file.ggCurrentLogicStateVisible == 0) {
			me._vrvideo_popup_file.visible=((!me._vrvideo_popup_file.material && Number(me._vrvideo_popup_file.userData.opacity>0)) || Number(me._vrvideo_popup_file.material.opacity)>0)?true:false;
			me._vrvideo_popup_file.userData.visible=true;
				}
				else {
			me._vrvideo_popup_file.visible=false;
			me._vrvideo_popup_file.userData.visible=false;
				}
			}
		}
		me._vrvideo_popup_file.logicBlock_visible();
		me._vrvideo_popup_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'vrloading_video_file_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEpFbdMAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vrloading_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrloading_video_file';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vrloading_video_file.material) me._vrloading_video_file.material.opacity = v;
			me._vrloading_video_file.visible = (v>0 && me._vrloading_video_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vrloading_video_file.visible
			let parentEl = me._vrloading_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrloading_video_file.userData.opacity = v;
			v = v * me._vrloading_video_file.userData.parentOpacity;
			me._vrloading_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrloading_video_file.children.length; i++) {
				let child = me._vrloading_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrloading_video_file.userData.parentOpacity = v;
			v = v * me._vrloading_video_file.userData.opacity
			me._vrloading_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrloading_video_file.children.length; i++) {
				let child = me._vrloading_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrloading_video_file = el;
		el.userData.ggId="vrloading_video_file";
		me._vrloading_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vrvideo_popup_file.add(me._vrloading_video_file);
		geometry = new THREE.PlaneGeometry(6.4, 4.8, 5, 5 );
		geometry.name = 'vrpopup_video_file_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vrpopup_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0.01008);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 480;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrpopup_video_file';
		el.userData.x = 0;
		el.userData.y = 0.01008;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vrpopup_video_file.material) me._vrpopup_video_file.material.opacity = v;
			me._vrpopup_video_file.visible = (v>0 && me._vrpopup_video_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vrpopup_video_file.visible
			let parentEl = me._vrpopup_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrpopup_video_file.userData.opacity = v;
			v = v * me._vrpopup_video_file.userData.parentOpacity;
			me._vrpopup_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrpopup_video_file.children.length; i++) {
				let child = me._vrpopup_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrpopup_video_file.userData.parentOpacity = v;
			v = v * me._vrpopup_video_file.userData.opacity
			me._vrpopup_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrpopup_video_file.children.length; i++) {
				let child = me._vrpopup_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrpopup_video_file = el;
		me._vrpopup_video_file.userData.seekbars = [];
		me._vrpopup_video_file.userData.ggInitMedia = function(media) {
			if (me._vrpopup_video_file__vid) me._vrpopup_video_file__vid.pause();
			me._vrpopup_video_file__vid = document.createElement('video');
			player.registerVideoElement('vrpopup_video_file', me._vrpopup_video_file__vid);
			me._vrpopup_video_file__vid.setAttribute('crossOrigin', 'anonymous');
			me._vrpopup_video_file__source = document.createElement('source');
			me._vrpopup_video_file__source.setAttribute('src', media);
			me._vrpopup_video_file__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._vrpopup_video_file__vid.videoWidth / me._vrpopup_video_file__vid.videoHeight;
				let elAR = me._vrpopup_video_file.userData.width / me._vrpopup_video_file.userData.height;
				if (videoAR > elAR) {
					me._vrpopup_video_file.scale.set(1, (me._vrpopup_video_file.userData.width / videoAR) / me._vrpopup_video_file.userData.height, 1);
				} else {
					me._vrpopup_video_file.scale.set((me._vrpopup_video_file.userData.height * videoAR) / me._vrpopup_video_file.userData.width, 1, 1);
				}
			}, false);
			me._vrpopup_video_file__vid.appendChild(me._vrpopup_video_file__source);
			videoTexture = new THREE.VideoTexture( me._vrpopup_video_file__vid );
			videoTexture.name = 'vrpopup_video_file_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'vrpopup_video_file_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._vrpopup_video_file.material = videoMaterial;
		}
		el.userData.ggId="vrpopup_video_file";
		me._vrpopup_video_file.userData.ggIsActive=function() {
			if (me._vrpopup_video_file__vid != null) {
				return (me._vrpopup_video_file__vid.paused == false && me._vrpopup_video_file__vid.ended == false);
			} else {
				return false;
			}
		}
		me._vrpopup_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrpopup_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrpopup_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrpopup_video_file.ggCurrentLogicStateVisible == 0) {
			me._vrpopup_video_file.visible=((!me._vrpopup_video_file.material && Number(me._vrpopup_video_file.userData.opacity>0)) || Number(me._vrpopup_video_file.material.opacity)>0)?true:false;
			me._vrpopup_video_file.userData.visible=true;
					if (me._vrpopup_video_file.userData.ggVideoNotLoaded) {
						me._vrpopup_video_file.userData.ggInitMedia(me._vrpopup_video_file.ggVideoSource);
					}
				}
				else {
			me._vrpopup_video_file.visible=false;
			me._vrpopup_video_file.userData.visible=false;
					me._vrpopup_video_file.userData.ggInitMedia('');
				}
			}
		}
		me._vrpopup_video_file.logicBlock_visible();
		me._vrpopup_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vrvideo_popup_file.add(me._vrpopup_video_file);
		me.skinGroup.add(me._vrvideo_popup_file);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-0.8);
		el.translateY(0.6);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 480;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'video_popup_file';
		el.userData.x = -0.8;
		el.userData.y = 0.6;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._video_popup_file.material) me._video_popup_file.material.opacity = v;
			me._video_popup_file.visible = (v>0 && me._video_popup_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._video_popup_file.visible
			let parentEl = me._video_popup_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._video_popup_file.userData.opacity = v;
			v = v * me._video_popup_file.userData.parentOpacity;
			me._video_popup_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._video_popup_file.children.length; i++) {
				let child = me._video_popup_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._video_popup_file.userData.parentOpacity = v;
			v = v * me._video_popup_file.userData.opacity
			me._video_popup_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._video_popup_file.children.length; i++) {
				let child = me._video_popup_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._video_popup_file = el;
		el.userData.ggId="video_popup_file";
		me._video_popup_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._video_popup_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._video_popup_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._video_popup_file.ggCurrentLogicStateVisible == 0) {
			me._video_popup_file.visible=((!me._video_popup_file.material && Number(me._video_popup_file.userData.opacity>0)) || Number(me._video_popup_file.material.opacity)>0)?true:false;
			me._video_popup_file.userData.visible=true;
				}
				else {
			me._video_popup_file.visible=false;
			me._video_popup_file.userData.visible=false;
				}
			}
		}
		me._video_popup_file.logicBlock_visible();
		me._video_popup_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.4, 0.4, 5, 5 );
		geometry.name = 'loading_video_file_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAMElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAXA2RQAAEpFbdMAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'loading_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 40;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'loading_video_file';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._loading_video_file.material) me._loading_video_file.material.opacity = v;
			me._loading_video_file.visible = (v>0 && me._loading_video_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._loading_video_file.visible
			let parentEl = me._loading_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._loading_video_file.userData.opacity = v;
			v = v * me._loading_video_file.userData.parentOpacity;
			me._loading_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._loading_video_file.children.length; i++) {
				let child = me._loading_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._loading_video_file.userData.parentOpacity = v;
			v = v * me._loading_video_file.userData.opacity
			me._loading_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._loading_video_file.children.length; i++) {
				let child = me._loading_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._loading_video_file = el;
		el.userData.ggId="loading_video_file";
		me._loading_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_file.add(me._loading_video_file);
		geometry = new THREE.PlaneGeometry(6.4, 4.8, 5, 5 );
		geometry.name = 'popup_video_file_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'popup_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0.01008);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 640;
		el.userData.height = 480;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'popup_video_file';
		el.userData.x = 0;
		el.userData.y = 0.01008;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._popup_video_file.material) me._popup_video_file.material.opacity = v;
			me._popup_video_file.visible = (v>0 && me._popup_video_file.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._popup_video_file.visible
			let parentEl = me._popup_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._popup_video_file.userData.opacity = v;
			v = v * me._popup_video_file.userData.parentOpacity;
			me._popup_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._popup_video_file.children.length; i++) {
				let child = me._popup_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._popup_video_file.userData.parentOpacity = v;
			v = v * me._popup_video_file.userData.opacity
			me._popup_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._popup_video_file.children.length; i++) {
				let child = me._popup_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._popup_video_file = el;
		me._popup_video_file.userData.seekbars = [];
		me._popup_video_file.userData.ggInitMedia = function(media) {
			if (me._popup_video_file__vid) me._popup_video_file__vid.pause();
			me._popup_video_file__vid = document.createElement('video');
			player.registerVideoElement('popup_video_file', me._popup_video_file__vid);
			me._popup_video_file__vid.setAttribute('crossOrigin', 'anonymous');
			me._popup_video_file__source = document.createElement('source');
			me._popup_video_file__source.setAttribute('src', media);
			me._popup_video_file__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._popup_video_file__vid.videoWidth / me._popup_video_file__vid.videoHeight;
				let elAR = me._popup_video_file.userData.width / me._popup_video_file.userData.height;
				if (videoAR > elAR) {
					me._popup_video_file.scale.set(1, (me._popup_video_file.userData.width / videoAR) / me._popup_video_file.userData.height, 1);
				} else {
					me._popup_video_file.scale.set((me._popup_video_file.userData.height * videoAR) / me._popup_video_file.userData.width, 1, 1);
				}
			}, false);
			me._popup_video_file__vid.appendChild(me._popup_video_file__source);
			videoTexture = new THREE.VideoTexture( me._popup_video_file__vid );
			videoTexture.name = 'popup_video_file_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'popup_video_file_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._popup_video_file.material = videoMaterial;
		}
		el.userData.ggId="popup_video_file";
		me._popup_video_file.userData.ggIsActive=function() {
			if (me._popup_video_file__vid != null) {
				return (me._popup_video_file__vid.paused == false && me._popup_video_file__vid.ended == false);
			} else {
				return false;
			}
		}
		me._popup_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_video_popup_file') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._popup_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._popup_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._popup_video_file.ggCurrentLogicStateVisible == 0) {
			me._popup_video_file.visible=((!me._popup_video_file.material && Number(me._popup_video_file.userData.opacity>0)) || Number(me._popup_video_file.material.opacity)>0)?true:false;
			me._popup_video_file.userData.visible=true;
					if (me._popup_video_file.userData.ggVideoNotLoaded) {
						me._popup_video_file.userData.ggInitMedia(me._popup_video_file.ggVideoSource);
					}
				}
				else {
			me._popup_video_file.visible=false;
			me._popup_video_file.userData.visible=false;
					me._popup_video_file.userData.ggInitMedia('');
				}
			}
		}
		me._popup_video_file.logicBlock_visible();
		me._popup_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._video_popup_file.add(me._popup_video_file);
		me.skinGroup.add(me._video_popup_file);
		me._vrvideo_popup_file.logicBlock_visible();
		me._vrvideo_popup_file.userData.setOpacity(1.00);
		me._vrloading_video_file.userData.setOpacity(1.00);
		me._vrpopup_video_file.logicBlock_visible();
		me._vrpopup_video_file.userData.setOpacity(1.00);
		me._vrpopup_video_file.userData.ggVideoSource = 'media_vr/';
		me._vrpopup_video_file.userData.ggVideoNotLoaded = true;
		me._video_popup_file.logicBlock_visible();
		me._video_popup_file.userData.setOpacity(1.00);
		me._loading_video_file.userData.setOpacity(1.00);
		me._popup_video_file.logicBlock_visible();
		me._popup_video_file.userData.setOpacity(1.00);
		me._popup_video_file.userData.ggVideoSource = 'media_vr/';
		me._popup_video_file.userData.ggVideoNotLoaded = true;
		player.addListener('activehotspotchanged', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
		});
		player.addListener('changenode', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			me._vrvideo_popup_file.logicBlock_visible();
			me._vrpopup_video_file.logicBlock_visible();
			me._video_popup_file.logicBlock_visible();
			me._popup_video_file.logicBlock_visible();
		});
		player.addListener('configloaded', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			me._vrvideo_popup_file.logicBlock_visible();
			me._vrpopup_video_file.logicBlock_visible();
			me._video_popup_file.logicBlock_visible();
			me._popup_video_file.logicBlock_visible();
		});
		player.addListener('hastouch', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_hastouch();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_hastouch();
				}
			}
		});
		player.addListener('varchanged_vis_image_popup', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_image_popup();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_image_popup();
				}
			}
		});
		player.addListener('varchanged_vis_info_popup', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_info_popup();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_info_popup();
				}
			}
		});
		player.addListener('varchanged_vis_timer', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_timer();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_timer();
				}
			}
		});
		player.addListener('varchanged_vis_userdata', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_userdata();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_userdata();
				}
			}
		});
		player.addListener('varchanged_vis_video_popup_file', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_video_popup_file();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_popup_file();
				}
			}
			me._vrvideo_popup_file.logicBlock_visible();
			me._vrpopup_video_file.logicBlock_visible();
			me._video_popup_file.logicBlock_visible();
			me._popup_video_file.logicBlock_visible();
		});
		player.addListener('varchanged_vis_video_popup_url', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_video_popup_url();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_popup_url();
				}
			}
		});
		player.addListener('varchanged_vis_video_popup_vimeo', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_video_popup_vimeo();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_popup_vimeo();
				}
			}
		});
		player.addListener('varchanged_vis_video_popup_youtube', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_video_popup_youtube();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_popup_youtube();
				}
			}
		});
		player.addListener('varchanged_vis_website', function() {
			if (hotspotTemplates.hasOwnProperty('vrtt_video_file')) {
				for(var i = 0; i < hotspotTemplates['vrtt_video_file'].length; i++) {
					hotspotTemplates['vrtt_video_file'][i].ggEvent_varchanged_vis_website();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_website();
				}
			}
		});
	};
	this.removeSkin=function() {
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = -1.5;
		el.userData.y = 2.5;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.000);
		el.renderOrder = 0;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file.visible=false;
			me._ht_video_file.userData.visible=false;
				}
				else {
			me._ht_video_file.visible=((!me._ht_video_file.material && Number(me._ht_video_file.userData.opacity>0)) || Number(me._ht_video_file.material.opacity)>0)?true:false;
			me._ht_video_file.userData.visible=true;
				}
			}
		}
		me._ht_video_file.logicBlock_visible();
		me._ht_video_file.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file.userData.transitions.length; i++) {
						if (me._ht_video_file.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file.userData.transitions[i].interval);
							me._ht_video_file.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file.material ? me._ht_video_file.material.opacity : me._ht_video_file.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file.userData.transitions.splice(me._ht_video_file.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file.userData.transitions.length; i++) {
						if (me._ht_video_file.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file.userData.transitions[i].interval);
							me._ht_video_file.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file.material ? me._ht_video_file.material.opacity : me._ht_video_file.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file.userData.transitions.splice(me._ht_video_file.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file.logicBlock_alpha();
		me._ht_video_file.userData.onclick=function (e) {
			skin._popup_video_file.userData.ggInitMedia(player.getBasePath()+""+player._(me.hotspot.url));
			player.setVariableValue('vis_video_popup_file', true);
			player.playSound("popup_video_file","1");
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			me._tt_ht_video_file.logicBlock_visible();
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			me._tt_ht_video_file.logicBlock_visible();
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.32, 0.32, 5, 5 );
		geometry.name = 'ht_video_file_image_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFaklEQVR4nO2b3U9TZxzHPy1rKclsC8smY7zuwlEVzVCWJdNE3YwJ0/4BsJiMBe5wFybGzJGYrDfjZtDdDb0xMXprCKuZxmlmlGGQwBw4sxdq7YWUzNVESkvh7OIUVtvnnL5wzuFk9JM8Fz3Py+/3/fW8PM9zfgdKlCixmbEYaKsSaAa2AXWAC3Cm6p4DUSAEPAIeAs8M9E0XyoDDwAAwBawAUp5lJdVnIDWG1WDf10Ud0A+EyV9wrhJOjVlnoI6CaQDOAQm0E55Z4sBQypZpKAe+BBbQT3hmeQGcAewG6FOlEZjEOOGZZZINPBv2A3M5HDSizAH7dNaaRRfy9bjR4tPvDV26Kk7DZ4CgYotPR90AfGYCkbmKbmfCfsx12qtdDprfExoxxw0v3zKHhk'+
	'8HOxv7qCu2TKLRPOGMCcQUW77IJS7XarABmAEqsjpaLNKRI0ceVFdXL+YyoidPnjypuH79+k6F6gVgOxAsdvxzKETX7/fflEzC2bNnf1LyE3ntoIjaMrMOOK5U2draauRegiptbW3LKtXHUVlFqgWgF7AV65SJsCNrEaIUgDLgE13c2Rg6UdD6ikKHQ8Cb+YwcCAR+OHnyZHORjq2LiYkJa3l5eW0eTWuAD4FrmRVKAfg4XyfC4bA0MzNTn2/7Verr6/9saWmJAExNTb0eCoXeLnSM5eXlxwU0b6eAABwq1Jk8kXp7e3/s7+9/w+Fw7ATWRC8uLv56+vTpucHBwQPos1kr1CS6LioBpedq0dhstvj09PQtv99/KCX+JRwOx46BgYGD09PTt2w2W1xr+0AL4M48KApAMzr8A6Ojo3c8Hs8BgJWVlbloNDopaufxeA7c'+
	'vXv3jtb2kTVl3atEAdimteVjx46Nt7a2Hlz9HQqF/qqsrNw5NDR0DciaSe7Zs+fg0aNHx7X2A4E2UQA033r2+/2J9N+SJFkkSSrr6ek5vHfv3j8WFhZmMvsMDg7qcRlkaRMFwKW11cbGxhaluvHx8R1ut7spEAhcA9ZmdE1NTTu09gOBNlEAnIJjReN2u6PAq2ptlpaWHO3t7YdPnDixdu1bLBaXy+V6rqUvCLTp/sopFotlrSRFVFdXR0+dOvVSoPLtux5EAdA06vF43J5IJFQnLF1dXZPhcDhZW1v7blq/x4lEQuu1SJY2UQCiGhslEAgI1+NbtmyJjY2NjZ4/f3631Wp9Lb3u6tWrs1r7gUCbKAAhra12d3fvkiRpzXhFRUW51+v9bX5+/u+2trb3M9tLkhTt7u7epbUfCLSJAvBIa6uRSMTV2dn5GEgCbN26df'+
	'eVK1fesdvtbwmaJzs6OmYjkUjWrE0DsrSJAvAQeSdFUy5dutTi9Xp/TyaTT5XaJJPJp16v99Hly5d3a20fWdPDzIOiADwDHujgAMPDw81Op7PK5/ONBYPBiVgsNhuLxWaDweCEz+f72el0Vg4PD2/XwzbwC/BP5kGl1eAN5MWD5sRiMVtfX997fX196Ycb9bCVwQ3RQaUAjACf5zNqVVUVNTU1kWK9Wg9Wq7WQRdv3hYxdRo4Ul9u3b9/a2L3g/xgZGbmp5mtKi3DSpzQTXAYuFhIxk3MROfEqC7Wp8LfAki7uGEsCWYsQtQCEgAtKlffv39f8UVks9+7dK1OpvoDK5G4zvBrzAIVsnmbxv345mg+b/vU4bPIEiVU2dYrMKl0mEJir6J4uZ+Y0ua901P0SZkyU/FRXxQL2YY4b4xzwgc5aFWlgEydLr2JHniy9wDjh'+
	'L5AnORueLp9OA3JCkp73hjjwHVBwPoKR6PXJzNdAPtkgpsGK/MHTN8jXaqEfTU2m+n6Ejm+wjEx1c1PYZ3NZG5glSpQooTX/AgIp9EAr+RveAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_image_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 32;
		el.userData.height = 32;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_image.material) me._ht_video_file_image.material.opacity = v;
			me._ht_video_file_image.visible = (v>0 && me._ht_video_file_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_image.visible
			let parentEl = me._ht_video_file_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_image.userData.opacity = v;
			v = v * me._ht_video_file_image.userData.parentOpacity;
			me._ht_video_file_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_image.children.length; i++) {
				let child = me._ht_video_file_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_image.userData.parentOpacity = v;
			v = v * me._ht_video_file_image.userData.opacity
			me._ht_video_file_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_image.children.length; i++) {
				let child = me._ht_video_file_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_image = el;
		textureOver = loader.load('data:image/png;base64,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');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'ht_video_file_image_materialOver';
		el.userData.ggId="ht_video_file_image";
		me._ht_video_file_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_image.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_image.visible=false;
			me._ht_video_file_image.userData.visible=false;
				}
				else {
			me._ht_video_file_image.visible=((!me._ht_video_file_image.material && Number(me._ht_video_file_image.userData.opacity>0)) || Number(me._ht_video_file_image.material.opacity)>0)?true:false;
			me._ht_video_file_image.userData.visible=true;
				}
			}
		}
		me._ht_video_file_image.logicBlock_visible();
		me._ht_video_file_image.userData.onmouseenter=function (e) {
			me._ht_video_file_image.material = me._ht_video_file_image.userData.materialOver;
			me.elementMouseOver['ht_video_file_image']=true;
		}
		me._ht_video_file_image.userData.onmouseleave=function (e) {
			me._ht_video_file_image.material = me._ht_video_file_image.userData.materialNormal;
			me.elementMouseOver['ht_video_file_image']=false;
		}
		me._ht_video_file_image.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file.add(me._ht_video_file_image);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'tt_ht_video_file_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'tt_ht_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._tt_ht_video_file.material.opacity = v;
			if (me._tt_ht_video_file.userData.hasScrollbar) {
				me._tt_ht_video_file.userData.scrollbar.material.opacity = v;
				me._tt_ht_video_file.userData.scrollbarBg.material.opacity = v;
			}
			if (me._tt_ht_video_file.userData.ggSubElement) {
				me._tt_ht_video_file.userData.ggSubElement.material.opacity = v
				me._tt_ht_video_file.userData.ggSubElement.visible = (v>0 && me._tt_ht_video_file.userData.visible);
			}
			me._tt_ht_video_file.visible = (v>0 && me._tt_ht_video_file.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._tt_ht_video_file.material.color = v.convertSRGBToLinear();
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._tt_ht_video_file.userData.backgroundColorAlpha = v;
			me._tt_ht_video_file.userData.setOpacity(me._tt_ht_video_file.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.34);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'tt_ht_video_file';
		el.userData.x = 0;
		el.userData.y = -0.34;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(100.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._tt_ht_video_file.visible
			let parentEl = me._tt_ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._tt_ht_video_file.userData.opacity = v;
			v = v * me._tt_ht_video_file.userData.parentOpacity;
			me._tt_ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_ht_video_file.children.length; i++) {
				let child = me._tt_ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._tt_ht_video_file.userData.parentOpacity = v;
			v = v * me._tt_ht_video_file.userData.opacity
			me._tt_ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_ht_video_file.children.length; i++) {
				let child = me._tt_ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._tt_ht_video_file = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._tt_ht_video_file.userData.totalHeightCanv = 2 * (7);
			me._tt_ht_video_file.userData.textLines = [];
			var ctx = me._tt_ht_video_file.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._tt_ht_video_file.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._tt_ht_video_file.userData.textLines.push(line);
					line = '';
					me._tt_ht_video_file.userData.totalHeightCanv += me._tt_ht_video_file.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._tt_ht_video_file.userData.width - 8 - (scrollbar ? 25 : 0))) && i > 0) {
					me._tt_ht_video_file.userData.textLines.push(line);
					line = words[i];
					me._tt_ht_video_file.userData.totalHeightCanv += me._tt_ht_video_file.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._tt_ht_video_file.userData.textLines.push(line);
			me._tt_ht_video_file.userData.totalHeightCanv += me._tt_ht_video_file.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._tt_ht_video_file.userData.textCanvas;
			var ctx = me._tt_ht_video_file.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._tt_ht_video_file.userData.backgroundColor.r * 255 + ', ' + me._tt_ht_video_file.userData.backgroundColor.g * 255 + ', ' + me._tt_ht_video_file.userData.backgroundColor.b * 255 + ', ' + me._tt_ht_video_file.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._tt_ht_video_file.userData.textColor.r * 255 + ', ' + me._tt_ht_video_file.userData.textColor.g * 255 + ', ' + me._tt_ht_video_file.userData.textColor.b * 255 + ', ' + me._tt_ht_video_file.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._tt_ht_video_file.userData.boxWidthCanv - (me._tt_ht_video_file.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 5;
			for (var i = 0; i < me._tt_ht_video_file.userData.textLines.length; i++) {
				ctx.fillText(me._tt_ht_video_file.userData.textLines[i], x, y);
				y += me._tt_ht_video_file.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._tt_ht_video_file.userData.boxWidthCanv / 200.0, me._tt_ht_video_file.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'tt_ht_video_file_geometry';
			me._tt_ht_video_file.geometry.dispose();
			me._tt_ht_video_file.geometry = geometry;
			var diffY = (me._tt_ht_video_file.userData.boxHeightCanv / 2) - me._tt_ht_video_file.userData.height;
			me._tt_ht_video_file.position.y = me._tt_ht_video_file.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'tt_ht_video_file_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._tt_ht_video_file.material.map) {
				me._tt_ht_video_file.material.map.dispose();
			}
			me._tt_ht_video_file.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._tt_ht_video_file.remove(...me._tt_ht_video_file.children);
			var canv = me._tt_ht_video_file.userData.textCanvas;
			var ctx = me._tt_ht_video_file.userData.textCanvasContext;
			ctx.font = '28px Verdana';
			me._tt_ht_video_file.userData.lineHeightCanv = 33.6;
			me._tt_ht_video_file.userData.textLines = [];
			me._tt_ht_video_file.userData.textLines.push(me._tt_ht_video_file.userData.ggText);
			me._tt_ht_video_file.userData.totalHeightCanv = 2 * (7);
			me._tt_ht_video_file.userData.totalHeightCanv += me._tt_ht_video_file.userData.lineHeightCanv;
			me._tt_ht_video_file.userData.boxWidthCanv = ctx.measureText(me._tt_ht_video_file.userData.ggText).width + (2 * 8);
			me._tt_ht_video_file.userData.boxHeightCanv = me._tt_ht_video_file.userData.totalHeightCanv;
			canv.width = me._tt_ht_video_file.userData.boxWidthCanv;
			canv.height = me._tt_ht_video_file.userData.boxHeightCanv;
			ctx.font = '28px Verdana';
			me._tt_ht_video_file.userData.ggPaintCanvasText();
		}
		me._tt_ht_video_file.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._tt_ht_video_file.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._tt_ht_video_file.userData.ggUpdateText();
		player.addListener('changenode', function() {
			me._tt_ht_video_file.userData.ggUpdateText();
		});
		el.userData.setBackgroundColor = function(v) {
			me._tt_ht_video_file.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._tt_ht_video_file.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._tt_ht_video_file.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._tt_ht_video_file.userData.textColorAlpha = v;
		}
		el.userData.ggId="tt_ht_video_file";
		me._tt_ht_video_file.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_ht_video_file.ggCurrentLogicStatePosition = newLogicStatePosition;
				if (me._tt_ht_video_file.ggCurrentLogicStatePosition == 0) {
					var newPos = skin.getElementVrPosition(me._tt_ht_video_file, 0, -47);
					me._tt_ht_video_file.position.x = newPos.x;
					me._tt_ht_video_file.position.y = newPos.y;
				}
				else {
					var elPos = skin.getElementVrPosition(me._tt_ht_video_file, 0, 24);
					me._tt_ht_video_file.position.x = elPos.x;
					me._tt_ht_video_file.position.y = elPos.y;
				}
			}
		}
		me._tt_ht_video_file.logicBlock_position();
		me._tt_ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._tt_ht_video_file.ggCurrentLogicStateVisible == 0) {
			me._tt_ht_video_file.visible=((!me._tt_ht_video_file.material && Number(me._tt_ht_video_file.userData.opacity>0)) || Number(me._tt_ht_video_file.material.opacity)>0)?true:false;
			me._tt_ht_video_file.userData.visible=true;
				}
				else {
			me._tt_ht_video_file.visible=false;
			me._tt_ht_video_file.userData.visible=false;
				}
			}
		}
		me._tt_ht_video_file.logicBlock_visible();
		me._tt_ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file.add(me._tt_ht_video_file);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_customimage.userData.ggSubElement) {
				me._ht_video_file_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_file_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
			}
			me._ht_video_file_customimage.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_customimage.visible
			let parentEl = me._ht_video_file_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_customimage.userData.opacity = v;
			v = v * me._ht_video_file_customimage.userData.parentOpacity;
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_file_customimage.userData.opacity
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_file_CustomImage_subElementMaterial';
				me._ht_video_file_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_file_customimage.userData.ggUpdatePosition();
				me._ht_video_file_customimage.userData.ggText = extUrl;
				me._ht_video_file_customimage.userData.setOpacity(me._ht_video_file_customimage.userData.opacity);
			});
		};
		var extUrl=basePath + "_custom";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_file_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_file_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_file_CustomImage";
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_customimage.visible=false;
			me._ht_video_file_customimage.userData.visible=false;
				}
				else {
			me._ht_video_file_customimage.visible=((!me._ht_video_file_customimage.material && Number(me._ht_video_file_customimage.userData.opacity>0)) || Number(me._ht_video_file_customimage.material.opacity)>0)?true:false;
			me._ht_video_file_customimage.userData.visible=true;
				}
			}
		}
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_file_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_file_customimage.userData.clientHeight;
			var img = me._ht_video_file_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			currentWidth = imgWidth;
			currentHeight = imgHeight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
		}
		me._ht_video_file.add(me._ht_video_file_customimage);
		me._ht_video_file.logicBlock_visible();
		me._ht_video_file.logicBlock_alpha();
		me._ht_video_file.userData.setOpacity(0.00);
		me.elementMouseOver['ht_video_file']=false;
		me._ht_video_file_image.logicBlock_visible();
		me._ht_video_file_image.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_image']=false;
		me._tt_ht_video_file.logicBlock_position();
		me._tt_ht_video_file.logicBlock_visible();
		me._tt_ht_video_file.userData.setOpacity(1.00);
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_file_image.logicBlock_visible();
				me._tt_ht_video_file.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_file.logicBlock_visible();
				me._ht_video_file.logicBlock_alpha();
				me._ht_video_file_image.logicBlock_visible();
				me._tt_ht_video_file.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file.logicBlock_visible();
				me._ht_video_file.logicBlock_alpha();
				me._ht_video_file_image.logicBlock_visible();
				me._tt_ht_video_file.logicBlock_position();
				me._tt_ht_video_file.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_hastouch=function() {
				me._tt_ht_video_file.logicBlock_position();
			};
			me.ggEvent_varchanged_vis_image_popup=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_info_popup=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_timer=function() {
				me._ht_video_file.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_userdata=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_file=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_url=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_vimeo=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_youtube=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_website=function() {
				me._ht_video_file.logicBlock_visible();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_vrtt_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'vrtt_video_file';
		el.userData.x = -1.5;
		el.userData.y = 2.5;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vrtt_video_file.visible
			let parentEl = me._vrtt_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrtt_video_file.userData.opacity = v;
			v = v * me._vrtt_video_file.userData.parentOpacity;
			me._vrtt_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrtt_video_file.children.length; i++) {
				let child = me._vrtt_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrtt_video_file.userData.parentOpacity = v;
			v = v * me._vrtt_video_file.userData.opacity
			me._vrtt_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrtt_video_file.children.length; i++) {
				let child = me._vrtt_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrtt_video_file = el;
		el.userData.ggId="vrtt_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._vrtt_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_website') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrtt_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrtt_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrtt_video_file.ggCurrentLogicStateVisible == 0) {
			me._vrtt_video_file.visible=false;
			me._vrtt_video_file.userData.visible=false;
				}
				else {
			me._vrtt_video_file.visible=((!me._vrtt_video_file.material && Number(me._vrtt_video_file.userData.opacity>0)) || Number(me._vrtt_video_file.material.opacity)>0)?true:false;
			me._vrtt_video_file.userData.visible=true;
				}
			}
		}
		me._vrtt_video_file.logicBlock_visible();
		me._vrtt_video_file.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_timer') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._vrtt_video_file.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._vrtt_video_file.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._vrtt_video_file.ggCurrentLogicStateAlpha == 0) {
					me._vrtt_video_file.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._vrtt_video_file.userData.transitions.length; i++) {
						if (me._vrtt_video_file.userData.transitions[i].property == 'alpha') {
							clearInterval(me._vrtt_video_file.userData.transitions[i].interval);
							me._vrtt_video_file.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._vrtt_video_file.material ? me._vrtt_video_file.material.opacity : me._vrtt_video_file.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._vrtt_video_file.userData.setOpacity(transition_alpha.startAlpha + (me._vrtt_video_file.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._vrtt_video_file.userData.transitions.splice(me._vrtt_video_file.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._vrtt_video_file.userData.transitions.push(transition_alpha);
				}
				else {
					me._vrtt_video_file.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._vrtt_video_file.userData.transitions.length; i++) {
						if (me._vrtt_video_file.userData.transitions[i].property == 'alpha') {
							clearInterval(me._vrtt_video_file.userData.transitions[i].interval);
							me._vrtt_video_file.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._vrtt_video_file.material ? me._vrtt_video_file.material.opacity : me._vrtt_video_file.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._vrtt_video_file.userData.setOpacity(transition_alpha.startAlpha + (me._vrtt_video_file.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._vrtt_video_file.userData.transitions.splice(me._vrtt_video_file.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._vrtt_video_file.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._vrtt_video_file.logicBlock_alpha();
		me._vrtt_video_file.userData.onclick=function (e) {
			skin._popup_video_file.userData.ggInitMedia(player.getBasePath()+""+player._(me.hotspot.url));
			player.setVariableValue('vis_video_popup_file', true);
			player.playSound("popup_video_file","1");
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._vrtt_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._vrtt_video_file.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['vrtt_video_file']=true;
			me._vrtt_ht_video_file.logicBlock_visible();
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._vrtt_video_file.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['vrtt_video_file']=false;
			me._vrtt_ht_video_file.logicBlock_visible();
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._vrtt_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.32, 0.32, 5, 5 );
		geometry.name = 'vrht_video_file_image_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAByUlEQVR4nO3ZvWoVQRyG8d9GFA1+EIgKFtYWFjYWGhBBEdQiYOV1eAuWFrkIK60ERRG1MoiNjagBCbGNCEYQFfwuVuEIZ8/u7O7JZvD/wFS785x33mWXwwxBEARBEARBEARBEAT/GUXN9RlcwgL2Tz/OP7zBPTxpOb/AKVz+47ieKpjFI/waeFxLDY59uDPi+IYdqZKlTV7opLGYkPswVsY45lMWX+DtFlj433GjYe5DWK1wJBUwtwUWPTpeNsh80PgnP7GAmQrZtgY/uJnU5ZnHQxxJFVcVkBNzeICjbSbnXsBe3MextoKcC9it/J9wvIsk1wJmcRsnu4pyLeAKTvchyrWAhb5EuRawqy9RrgX0RhQwdIChiQKGDjA0uRbwuS9RrgUs9yXKtYAl5X'+
	'ZdZ3It4Itym+xxV1GuBcAnXMTTLpKcC4CPOI9nbQW5FwAfcA7P20yuKuBH6zjT4XvN9fc4i1ep4qoCNrCeKpsiLxrc8w5n8DpFPOkVSD5KmiJNs6wrS2iyjV7LTtw17HnAT1xtkX0Pbo14vmL7uBvrDkcLXFDuwBxoEaQLa8od37Zf+AInlIejy7jZU64gCIIgCIIgCIIgCIK8+Q2ZXezpSclq6wAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vrht_video_file_image_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 32;
		el.userData.height = 32;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrht_video_file_image';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vrht_video_file_image.material) me._vrht_video_file_image.material.opacity = v;
			me._vrht_video_file_image.visible = (v>0 && me._vrht_video_file_image.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vrht_video_file_image.visible
			let parentEl = me._vrht_video_file_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrht_video_file_image.userData.opacity = v;
			v = v * me._vrht_video_file_image.userData.parentOpacity;
			me._vrht_video_file_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrht_video_file_image.children.length; i++) {
				let child = me._vrht_video_file_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrht_video_file_image.userData.parentOpacity = v;
			v = v * me._vrht_video_file_image.userData.opacity
			me._vrht_video_file_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrht_video_file_image.children.length; i++) {
				let child = me._vrht_video_file_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrht_video_file_image = el;
		textureOver = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAByUlEQVR4nO3ZvWoVQRyG8d9GFA1+EIgKFtYWFjYWGhBBEdQiYOV1eAuWFrkIK60ERRG1MoiNjagBCbGNCEYQFfwuVuEIZ8/u7O7JZvD/wFS785x33mWXwwxBEARBEARBEARBEAT/GUXN9RlcwgL2Tz/OP7zBPTxpOb/AKVz+47ieKpjFI/waeFxLDY59uDPi+IYdqZKlTV7opLGYkPswVsY45lMWX+DtFlj433GjYe5DWK1wJBUwtwUWPTpeNsh80PgnP7GAmQrZtgY/uJnU5ZnHQxxJFVcVkBNzeICjbSbnXsBe3MextoKcC9it/J9wvIsk1wJmcRsnu4pyLeAKTvchyrWAhb5EuRawqy9RrgX0RhQwdIChiQKGDjA0uRbwuS9RrgUs9yXKtYAl5X'+
	'ZdZ3It4Itym+xxV1GuBcAnXMTTLpKcC4CPOI9nbQW5FwAfcA7P20yuKuBH6zjT4XvN9fc4i1ep4qoCNrCeKpsiLxrc8w5n8DpFPOkVSD5KmiJNs6wrS2iyjV7LTtw17HnAT1xtkX0Pbo14vmL7uBvrDkcLXFDuwBxoEaQLa8od37Zf+AInlIejy7jZU64gCIIgCIIgCIIgCIK8+Q2ZXezpSclq6wAAAABJRU5ErkJggg==');
		textureOver.colorSpace = player.getVRTextureColorSpace();
		el.userData.materialOver = new THREE.MeshBasicMaterial( {map: textureOver, side: THREE.DoubleSide, transparent: true} );
		el.userData.materialOver.name = 'vrht_video_file_image_materialOver';
		el.userData.ggId="vrht_video_file_image";
		me._vrht_video_file_image.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrht_video_file_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrht_video_file_image.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrht_video_file_image.ggCurrentLogicStateVisible == 0) {
			me._vrht_video_file_image.visible=false;
			me._vrht_video_file_image.userData.visible=false;
				}
				else {
			me._vrht_video_file_image.visible=((!me._vrht_video_file_image.material && Number(me._vrht_video_file_image.userData.opacity>0)) || Number(me._vrht_video_file_image.material.opacity)>0)?true:false;
			me._vrht_video_file_image.userData.visible=true;
				}
			}
		}
		me._vrht_video_file_image.logicBlock_visible();
		me._vrht_video_file_image.userData.onmouseenter=function (e) {
			me._vrht_video_file_image.material = me._vrht_video_file_image.userData.materialOver;
			me.elementMouseOver['vrht_video_file_image']=true;
		}
		me._vrht_video_file_image.userData.onmouseleave=function (e) {
			me._vrht_video_file_image.material = me._vrht_video_file_image.userData.materialNormal;
			me.elementMouseOver['vrht_video_file_image']=false;
		}
		me._vrht_video_file_image.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vrtt_video_file.add(me._vrht_video_file_image);
		geometry = new THREE.PlaneGeometry(1, 0.2, 5, 5 );
		geometry.name = 'vrtt_ht_video_file_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vrtt_ht_video_file_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vrtt_ht_video_file.material.opacity = v;
			if (me._vrtt_ht_video_file.userData.hasScrollbar) {
				me._vrtt_ht_video_file.userData.scrollbar.material.opacity = v;
				me._vrtt_ht_video_file.userData.scrollbarBg.material.opacity = v;
			}
			if (me._vrtt_ht_video_file.userData.ggSubElement) {
				me._vrtt_ht_video_file.userData.ggSubElement.material.opacity = v
				me._vrtt_ht_video_file.userData.ggSubElement.visible = (v>0 && me._vrtt_ht_video_file.userData.visible);
			}
			me._vrtt_ht_video_file.visible = (v>0 && me._vrtt_ht_video_file.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vrtt_ht_video_file.material.color = v.convertSRGBToLinear();
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vrtt_ht_video_file.userData.backgroundColorAlpha = v;
			me._vrtt_ht_video_file.userData.setOpacity(me._vrtt_ht_video_file.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.34);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 20;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrtt_ht_video_file';
		el.userData.x = 0;
		el.userData.y = -0.34;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(100.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vrtt_ht_video_file.visible
			let parentEl = me._vrtt_ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrtt_ht_video_file.userData.opacity = v;
			v = v * me._vrtt_ht_video_file.userData.parentOpacity;
			me._vrtt_ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrtt_ht_video_file.children.length; i++) {
				let child = me._vrtt_ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrtt_ht_video_file.userData.parentOpacity = v;
			v = v * me._vrtt_ht_video_file.userData.opacity
			me._vrtt_ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrtt_ht_video_file.children.length; i++) {
				let child = me._vrtt_ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrtt_ht_video_file = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0, 0).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 40;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._vrtt_ht_video_file.userData.totalHeightCanv = 2 * (7);
			me._vrtt_ht_video_file.userData.textLines = [];
			var ctx = me._vrtt_ht_video_file.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._vrtt_ht_video_file.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._vrtt_ht_video_file.userData.textLines.push(line);
					line = '';
					me._vrtt_ht_video_file.userData.totalHeightCanv += me._vrtt_ht_video_file.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._vrtt_ht_video_file.userData.width - 8 - (scrollbar ? 25 : 0))) && i > 0) {
					me._vrtt_ht_video_file.userData.textLines.push(line);
					line = words[i];
					me._vrtt_ht_video_file.userData.totalHeightCanv += me._vrtt_ht_video_file.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._vrtt_ht_video_file.userData.textLines.push(line);
			me._vrtt_ht_video_file.userData.totalHeightCanv += me._vrtt_ht_video_file.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._vrtt_ht_video_file.userData.textCanvas;
			var ctx = me._vrtt_ht_video_file.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._vrtt_ht_video_file.userData.backgroundColor.r * 255 + ', ' + me._vrtt_ht_video_file.userData.backgroundColor.g * 255 + ', ' + me._vrtt_ht_video_file.userData.backgroundColor.b * 255 + ', ' + me._vrtt_ht_video_file.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._vrtt_ht_video_file.userData.textColor.r * 255 + ', ' + me._vrtt_ht_video_file.userData.textColor.g * 255 + ', ' + me._vrtt_ht_video_file.userData.textColor.b * 255 + ', ' + me._vrtt_ht_video_file.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._vrtt_ht_video_file.userData.boxWidthCanv - (me._vrtt_ht_video_file.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 5;
			for (var i = 0; i < me._vrtt_ht_video_file.userData.textLines.length; i++) {
				ctx.fillText(me._vrtt_ht_video_file.userData.textLines[i], x, y);
				y += me._vrtt_ht_video_file.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._vrtt_ht_video_file.userData.boxWidthCanv / 200.0, me._vrtt_ht_video_file.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'vrtt_ht_video_file_geometry';
			me._vrtt_ht_video_file.geometry.dispose();
			me._vrtt_ht_video_file.geometry = geometry;
			var diffY = (me._vrtt_ht_video_file.userData.boxHeightCanv / 2) - me._vrtt_ht_video_file.userData.height;
			me._vrtt_ht_video_file.position.y = me._vrtt_ht_video_file.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'vrtt_ht_video_file_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._vrtt_ht_video_file.material.map) {
				me._vrtt_ht_video_file.material.map.dispose();
			}
			me._vrtt_ht_video_file.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._vrtt_ht_video_file.remove(...me._vrtt_ht_video_file.children);
			var canv = me._vrtt_ht_video_file.userData.textCanvas;
			var ctx = me._vrtt_ht_video_file.userData.textCanvasContext;
			ctx.font = '28px Verdana';
			me._vrtt_ht_video_file.userData.lineHeightCanv = 33.6;
			me._vrtt_ht_video_file.userData.textLines = [];
			me._vrtt_ht_video_file.userData.textLines.push(me._vrtt_ht_video_file.userData.ggText);
			me._vrtt_ht_video_file.userData.totalHeightCanv = 2 * (7);
			me._vrtt_ht_video_file.userData.totalHeightCanv += me._vrtt_ht_video_file.userData.lineHeightCanv;
			me._vrtt_ht_video_file.userData.boxWidthCanv = ctx.measureText(me._vrtt_ht_video_file.userData.ggText).width + (2 * 8);
			me._vrtt_ht_video_file.userData.boxHeightCanv = me._vrtt_ht_video_file.userData.totalHeightCanv;
			canv.width = me._vrtt_ht_video_file.userData.boxWidthCanv;
			canv.height = me._vrtt_ht_video_file.userData.boxHeightCanv;
			ctx.font = '28px Verdana';
			me._vrtt_ht_video_file.userData.ggPaintCanvasText();
		}
		me._vrtt_ht_video_file.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._vrtt_ht_video_file.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._vrtt_ht_video_file.userData.ggUpdateText();
		player.addListener('changenode', function() {
			me._vrtt_ht_video_file.userData.ggUpdateText();
		});
		el.userData.setBackgroundColor = function(v) {
			me._vrtt_ht_video_file.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vrtt_ht_video_file.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._vrtt_ht_video_file.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._vrtt_ht_video_file.userData.textColorAlpha = v;
		}
		el.userData.ggId="vrtt_ht_video_file";
		me._vrtt_ht_video_file.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._vrtt_ht_video_file.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._vrtt_ht_video_file.ggCurrentLogicStatePosition = newLogicStatePosition;
				if (me._vrtt_ht_video_file.ggCurrentLogicStatePosition == 0) {
					var newPos = skin.getElementVrPosition(me._vrtt_ht_video_file, 0, -47);
					me._vrtt_ht_video_file.position.x = newPos.x;
					me._vrtt_ht_video_file.position.y = newPos.y;
				}
				else {
					var elPos = skin.getElementVrPosition(me._vrtt_ht_video_file, 0, 24);
					me._vrtt_ht_video_file.position.x = elPos.x;
					me._vrtt_ht_video_file.position.y = elPos.y;
				}
			}
		}
		me._vrtt_ht_video_file.logicBlock_position();
		me._vrtt_ht_video_file.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['vrtt_video_file'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrtt_ht_video_file.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrtt_ht_video_file.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrtt_ht_video_file.ggCurrentLogicStateVisible == 0) {
			me._vrtt_ht_video_file.visible=((!me._vrtt_ht_video_file.material && Number(me._vrtt_ht_video_file.userData.opacity>0)) || Number(me._vrtt_ht_video_file.material.opacity)>0)?true:false;
			me._vrtt_ht_video_file.userData.visible=true;
				}
				else {
			me._vrtt_ht_video_file.visible=false;
			me._vrtt_ht_video_file.userData.visible=false;
				}
			}
		}
		me._vrtt_ht_video_file.logicBlock_visible();
		me._vrtt_ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vrtt_video_file.add(me._vrtt_ht_video_file);
		el = new THREE.Group();
		width = 0.5;
		height = 0.5;
		borderShape = new THREE.Shape();
		borderShape.moveTo((width / 2.0) - 0.01 + 0, (height / 2.0) + 0.01);
		borderShape.lineTo((width / 2.0) + 0.01 - 0, (height / 2.0) + 0.01);
		borderShape.lineTo((width / 2.0) + 0.01, (-height / 2.0) - 0.01 + 0);
		borderShape.lineTo((-width / 2.0) - 0.01 + 0, (-height / 2.0) - 0.01);
		borderShape.lineTo((-width / 2.0) - 0.01, (height / 2.0) + 0.01 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'vrht_video_file_CustomImage_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0, 0, 0).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'vrht_video_file_CustomImage_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'vrht_video_file_CustomImage_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vrht_video_file_customimage.userData.border.material.opacity = v * me._vrht_video_file_customimage.userData.borderColorAlpha;
			if (me._vrht_video_file_customimage.userData.ggSubElement) {
				me._vrht_video_file_customimage.userData.ggSubElement.material.opacity = v
				me._vrht_video_file_customimage.userData.ggSubElement.visible = (v>0 && me._vrht_video_file_customimage.userData.visible);
			}
			me._vrht_video_file_customimage.visible = (v>0 && me._vrht_video_file_customimage.userData.visible);
		}
		el.userData.setBorderColor = function(v) {
			me._vrht_video_file_customimage.userData.border.material.color = v.convertSRGBToLinear();
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._vrht_video_file_customimage.userData.borderColorAlpha = v;
			me._vrht_video_file_customimage.userData.setOpacity(me._vrht_video_file_customimage.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vrht_video_file_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vrht_video_file_customimage.visible
			let parentEl = me._vrht_video_file_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vrht_video_file_customimage.userData.opacity = v;
			v = v * me._vrht_video_file_customimage.userData.parentOpacity;
			me._vrht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrht_video_file_customimage.children.length; i++) {
				let child = me._vrht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vrht_video_file_customimage.userData.parentOpacity = v;
			v = v * me._vrht_video_file_customimage.userData.opacity
			me._vrht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vrht_video_file_customimage.children.length; i++) {
				let child = me._vrht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vrht_video_file_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'vrht_video_file_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'vrht_video_file_CustomImage_subElementMaterial';
				me._vrht_video_file_customimage.userData.ggSubElement.material = loadedMaterial;
				me._vrht_video_file_customimage.userData.ggUpdatePosition();
				me._vrht_video_file_customimage.userData.ggText = extUrl;
				me._vrht_video_file_customimage.userData.setOpacity(me._vrht_video_file_customimage.userData.opacity);
			});
		};
		var extUrl=basePath + "_custom";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'vrht_video_file_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'vrht_video_file_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="vrht_video_file_CustomImage";
		me._vrht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vrht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vrht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vrht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
			me._vrht_video_file_customimage.visible=false;
			me._vrht_video_file_customimage.userData.visible=false;
				}
				else {
			me._vrht_video_file_customimage.visible=((!me._vrht_video_file_customimage.material && Number(me._vrht_video_file_customimage.userData.opacity>0)) || Number(me._vrht_video_file_customimage.material.opacity)>0)?true:false;
			me._vrht_video_file_customimage.userData.visible=true;
				}
			}
		}
		me._vrht_video_file_customimage.logicBlock_visible();
		me._vrht_video_file_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._vrht_video_file_customimage.userData.clientWidth;
			var parentHeight = me._vrht_video_file_customimage.userData.clientHeight;
			var img = me._vrht_video_file_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			currentWidth = imgWidth;
			currentHeight = imgHeight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'vrht_video_file_CustomImage_imgGeometry';
		}
		me._vrtt_video_file.add(me._vrht_video_file_customimage);
		me._vrtt_video_file.logicBlock_visible();
		me._vrtt_video_file.logicBlock_alpha();
		me._vrtt_video_file.userData.setOpacity(0.00);
		me.elementMouseOver['vrtt_video_file']=false;
		me._vrht_video_file_image.logicBlock_visible();
		me._vrht_video_file_image.userData.setOpacity(1.00);
		me.elementMouseOver['vrht_video_file_image']=false;
		me._vrtt_ht_video_file.logicBlock_position();
		me._vrtt_ht_video_file.logicBlock_visible();
		me._vrtt_ht_video_file.userData.setOpacity(1.00);
		me._vrht_video_file_customimage.logicBlock_visible();
		me._vrht_video_file_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._vrht_video_file_image.logicBlock_visible();
				me._vrtt_ht_video_file.logicBlock_visible();
				me._vrht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._vrtt_video_file.logicBlock_visible();
				me._vrtt_video_file.logicBlock_alpha();
				me._vrht_video_file_image.logicBlock_visible();
				me._vrtt_ht_video_file.logicBlock_visible();
				me._vrht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._vrtt_video_file.logicBlock_visible();
				me._vrtt_video_file.logicBlock_alpha();
				me._vrht_video_file_image.logicBlock_visible();
				me._vrtt_ht_video_file.logicBlock_position();
				me._vrtt_ht_video_file.logicBlock_visible();
				me._vrht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_hastouch=function() {
				me._vrtt_ht_video_file.logicBlock_position();
			};
			me.ggEvent_varchanged_vis_image_popup=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_info_popup=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_timer=function() {
				me._vrtt_video_file.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_userdata=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_file=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_url=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_vimeo=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_popup_youtube=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_website=function() {
				me._vrtt_video_file.logicBlock_visible();
			};
			me.__obj = me._vrtt_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_tele_1(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'Tele_1';
		el.userData.x = -2.89;
		el.userData.y = 2.07;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._tele_1.visible
			let parentEl = me._tele_1.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._tele_1.userData.opacity = v;
			v = v * me._tele_1.userData.parentOpacity;
			me._tele_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tele_1.children.length; i++) {
				let child = me._tele_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._tele_1.userData.parentOpacity = v;
			v = v * me._tele_1.userData.opacity
			me._tele_1.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tele_1.children.length; i++) {
				let child = me._tele_1.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._tele_1 = el;
		el.userData.ggId="Tele_1";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._tele_1.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._tele_1.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._tele_1.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['tele_1']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._tele_1.userData.onmouseleave=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['tele_1']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._tele_1.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 0.6;
		height = 0.6;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.19, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.19, (height / 2.0));
		roundedRectShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.19);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.19);
		roundedRectShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.19, (-height / 2.0));
		roundedRectShape.lineTo((-width / 2.0) + 0.19, (-height / 2.0));
		roundedRectShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.19);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.19);
		roundedRectShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.19, (height / 2.0));
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'tt_icon_bg_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0, 0, 0).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'tt_icon_bg_material';
		el = new THREE.Mesh( geometry, material );
		width = 0.6;
		height = 0.6;
		borderShape = new THREE.Shape();
		borderShape.moveTo((width / 2.0) - 0.01 + 0.2, (height / 2.0) + 0.01);
		borderShape.lineTo((width / 2.0) + 0.01 - 0.2, (height / 2.0) + 0.01);
		borderShape.quadraticCurveTo((width / 2.0) + 0.01, (height / 2.0) + 0.01, (width / 2.0) + 0.01, (height / 2.0) + 0.01 - 0.2);
		borderShape.lineTo((width / 2.0) + 0.01, (-height / 2.0) - 0.01 + 0.2);
		borderShape.quadraticCurveTo((width / 2.0) + 0.01, (-height / 2.0) - 0.01, (width / 2.0) + 0.01 - 0.2, (-height / 2.0) - 0.01);
		borderShape.lineTo((-width / 2.0) - 0.01 + 0.2, (-height / 2.0) - 0.01);
		borderShape.quadraticCurveTo((-width / 2.0) - 0.01, (-height / 2.0) - 0.01, (-width / 2.0) - 0.01, (-height / 2.0) - 0.01 + 0.2);
		borderShape.lineTo((-width / 2.0) - 0.01, (height / 2.0) + 0.01 - 0.2);
		borderShape.quadraticCurveTo((-width / 2.0) - 0.01, (height / 2.0) + 0.01, (-width / 2.0) - 0.01 + 0.2, (height / 2.0) + 0.01);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0) + 0.19, (height / 2.0));
		innerShape.lineTo((width / 2.0) - 0.19, (height / 2.0));
		innerShape.quadraticCurveTo((width / 2.0), (height / 2.0), (width / 2.0), (height / 2.0) - 0.19);
		innerShape.lineTo((width / 2.0), (-height / 2.0) + 0.19);
		innerShape.quadraticCurveTo((width / 2.0), (-height / 2.0), (width / 2.0) - 0.19, (-height / 2.0));
		innerShape.lineTo((-width / 2.0) + 0.19, (-height / 2.0));
		innerShape.quadraticCurveTo((-width / 2.0), (-height / 2.0), (-width / 2.0), (-height / 2.0) + 0.19);
		innerShape.lineTo((-width / 2.0), (height / 2.0) - 0.19);
		innerShape.quadraticCurveTo((-width / 2.0), (height / 2.0), (-width / 2.0) + 0.19, (height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'tt_icon_bg_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0, 0, 0).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'tt_icon_bg_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'tt_icon_bg_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._tt_icon_bg.material.opacity = v * me._tt_icon_bg.userData.backgroundColorAlpha;
			me._tt_icon_bg.userData.border.material.opacity = v * me._tt_icon_bg.userData.borderColorAlpha;
			if (me._tt_icon_bg.userData.ggSubElement) {
				me._tt_icon_bg.userData.ggSubElement.material.opacity = v
				me._tt_icon_bg.userData.ggSubElement.visible = (v>0 && me._tt_icon_bg.userData.visible);
			}
			me._tt_icon_bg.visible = (v>0 && me._tt_icon_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._tt_icon_bg.material.color = v.convertSRGBToLinear();
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._tt_icon_bg.userData.backgroundColorAlpha = v;
			me._tt_icon_bg.userData.setOpacity(me._tt_icon_bg.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._tt_icon_bg.userData.border.material.color = v.convertSRGBToLinear();
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._tt_icon_bg.userData.borderColorAlpha = v;
			me._tt_icon_bg.userData.setOpacity(me._tt_icon_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 60;
		el.userData.height = 60;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'tt_icon_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._tt_icon_bg.visible
			let parentEl = me._tt_icon_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._tt_icon_bg.userData.opacity = v;
			v = v * me._tt_icon_bg.userData.parentOpacity;
			me._tt_icon_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_icon_bg.children.length; i++) {
				let child = me._tt_icon_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._tt_icon_bg.userData.parentOpacity = v;
			v = v * me._tt_icon_bg.userData.opacity
			me._tt_icon_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_icon_bg.children.length; i++) {
				let child = me._tt_icon_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._tt_icon_bg = el;
		el.userData.ggId="tt_icon_bg";
		me._tt_icon_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['tt_icon_bg'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._tt_icon_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._tt_icon_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._tt_icon_bg.ggCurrentLogicStateScaling == 0) {
					me._tt_icon_bg.userData.transitionValue_scale = {x: 1.2, y: 1.2, z: 1.0};
					for (var i = 0; i < me._tt_icon_bg.userData.transitions.length; i++) {
						if (me._tt_icon_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._tt_icon_bg.userData.transitions[i].interval);
							me._tt_icon_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._tt_icon_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._tt_icon_bg.scale.set(transition_scale.startScale.x + (me._tt_icon_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._tt_icon_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._tt_icon_bg.position.x = (me._tt_icon_bg.position.x - me._tt_icon_bg.userData.curScaleOffX) + scaleOffX;
						me._tt_icon_bg.userData.curScaleOffX = scaleOffX;
						me._tt_icon_bg.position.y = (me._tt_icon_bg.position.y - me._tt_icon_bg.userData.curScaleOffY) + scaleOffY;
						me._tt_icon_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._tt_icon_bg.userData.transitions.splice(me._tt_icon_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._tt_icon_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._tt_icon_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._tt_icon_bg.userData.transitions.length; i++) {
						if (me._tt_icon_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._tt_icon_bg.userData.transitions[i].interval);
							me._tt_icon_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._tt_icon_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._tt_icon_bg.scale.set(transition_scale.startScale.x + (me._tt_icon_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._tt_icon_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._tt_icon_bg.position.x = (me._tt_icon_bg.position.x - me._tt_icon_bg.userData.curScaleOffX) + scaleOffX;
						me._tt_icon_bg.userData.curScaleOffX = scaleOffX;
						me._tt_icon_bg.position.y = (me._tt_icon_bg.position.y - me._tt_icon_bg.userData.curScaleOffY) + scaleOffY;
						me._tt_icon_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._tt_icon_bg.userData.transitions.splice(me._tt_icon_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._tt_icon_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._tt_icon_bg.logicBlock_scaling();
		me._tt_icon_bg.userData.onmouseenter=function (e) {
			me.elementMouseOver['tt_icon_bg']=true;
			me._tt_icon_bg.logicBlock_scaling();
		}
		me._tt_icon_bg.userData.ontouchend=function (e) {
			me._tt_icon_bg.logicBlock_scaling();
		}
		me._tt_icon_bg.userData.onmouseleave=function (e) {
			me.elementMouseOver['tt_icon_bg']=false;
			me._tt_icon_bg.logicBlock_scaling();
		}
		me._tt_icon_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.5, 0.5, 5, 5 );
		geometry.name = 'tt_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'tt_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'tt_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._tt_icon.material) me._tt_icon.material.opacity = v;
			me._tt_icon.visible = (v>0 && me._tt_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._tt_icon.visible
			let parentEl = me._tt_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._tt_icon.userData.opacity = v;
			v = v * me._tt_icon.userData.parentOpacity;
			me._tt_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_icon.children.length; i++) {
				let child = me._tt_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._tt_icon.userData.parentOpacity = v;
			v = v * me._tt_icon.userData.opacity
			me._tt_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._tt_icon.children.length; i++) {
				let child = me._tt_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._tt_icon = el;
		el.userData.ggId="tt_icon";
		me._tt_icon.userData.onclick=function (e) {
			player.playSound("zoomingvr","1");
		}
		me._tt_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		me._tt_icon_bg.add(me._tt_icon);
		me._tele_1.add(me._tt_icon_bg);
		me._tele_1.userData.setOpacity(1.00);
		me.elementMouseOver['tele_1']=false;
		me._tt_icon_bg.logicBlock_scaling();
		me._tt_icon_bg.userData.setOpacity(1.00);
		me.elementMouseOver['tt_icon_bg']=false;
		me._tt_icon.userData.setOpacity(1.00);
			me.__obj = me._tele_1;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='Tele_1') {
			hotspot.skinid = 'Tele_1';
			hsinst = new SkinHotspotClass_tele_1(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='vrtt_video_file') {
			hotspot.skinid = 'vrtt_video_file';
			hsinst = new SkinHotspotClass_vrtt_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('entervr', function() { me.addSkin(); player.triggerEvent('changenode'); });
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};