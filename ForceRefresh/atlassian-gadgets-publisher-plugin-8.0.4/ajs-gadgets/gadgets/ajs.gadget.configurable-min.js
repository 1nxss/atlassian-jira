var Configurable=function(options){var gadget=Configured(options);if(AJS.debug){if(options.view.enableReload){AJS.$(["refresh.never","refresh.minutes","refresh.hour","refresh.hours","refresh.description","refresh.label"]).each(function(){if(gadget.getPrefs().getMsg("gadget.common."+this)===""){console.warn('il8n key missing:"'+"gadget.common."+this+'"')}})}}AJS.$.extend(gadget,{constructor:Configurable,configTemplate:AJS.gadgets.templater.Form({target:AJS.$("<div id='config' />").appendTo(document.body),descriptor:function(args){var descriptor=options.config.descriptor.call(gadget,args);if(options.view.enableReload){descriptor.fields.push({userpref:"refresh",label:gadget.getMsg("gadget.common.refresh.label"),description:gadget.getMsg("gadget.common.refresh.description"),selected:gadget.getPref("refresh"),options:[{value:"false",label:gadget.getMsg("gadget.common.refresh.never")},{value:"15",label:AJS.format(gadget.getMsg("gadget.common.refresh.minutes"),15)},{value:"30",label:AJS.format(gadget.getMsg("gadget.common.refresh.minutes"),30)},{value:"60",label:AJS.format(gadget.getMsg("gadget.common.refresh.hour"),1)},{value:"120",label:AJS.format(gadget.getMsg("gadget.common.refresh.hours"),2)}],type:"select"})}return descriptor},args:function(){var args=[];if(AJS.$.isFunction(options.config.args)){options.config.args=options.config.args()}AJS.$(options.config.args).each(function(){var that=this;if(AJS.$.isFunction(this.ajaxOptions)){args.push({key:this.key,ajaxOptions:function(args){return that.ajaxOptions.call(gadget,args)}})}else{args.push(this)}});return args}(),cancel:function(e){gadget.showView();e.preventDefault()},submit:function(e){var form=AJS.$(this),save=function(){var fieldValues={};AJS.$(form.serializeArray()).each(function(){var fieldVal=fieldValues[this.name];if(!fieldVal){fieldVal=this.value}else{if(AJS.$.isArray(fieldVal)){fieldVal.push(this.value)}else{fieldVal=[fieldVal,this.value]}}fieldValues[this.name]=fieldVal});AJS.$(":checkbox:not(:checked)",form).each(function(){if(!fieldValues[this.name]||fieldValues[this.name]==""){fieldValues[this.name]="false"}});for(var name in fieldValues){gadget.savePref(name,fieldValues[name])}gadget.showView(true)};if(form.attr("action")!==""){AJS.$.ajax({type:"get",url:form.attr("action"),data:form.serialize(),global:false,success:function(){save()},error:function(response,settings){gadget.ajaxErrorHandler.execute(null,response,AJS.$.extend(settings,{isConfig:true}))}})}else{save()}e.preventDefault()}}),getConfig:function(){return gadget.configTemplate.getTarget()}});gadget.showConfig=function(){var restoreValuesFromHash=function(){var options,fields;if(/#/.test(window.location.href)&&!/#rpctoken=[0-9]+$/.test(window.location.href)){fields=window.location.href.replace(/.*?#/,"").split("&");AJS.$.each(fields,function(){var name=this.split("=")[0],val=decodeURIComponent(this.split("=")[1]).replace(/\+/," "),field=AJS.$("#config input[name="+name+"]");if(field.length>0){if(field.is("select")){options=val.split(",");AJS.$.each(options,function(){AJS.$("option[value="+this+"]",field).attr("selected","selected")})}else{if(field.is(":radio,:checkbox")){field.attr("checked","checked")}else{field.val(val)}}}});window.location.href=window.location.href.replace(/(#rpctoken=[0-9]+).*/,"$1")}};gadget.configTemplate.addCallback(function(){AG.sysMsg.clear();AJS.$("body").addClass("config-active");gadget.configTemplate.getTarget().show();restoreValuesFromHash();AJS.$("button",".footer").hide();gadget.resize();if(gadget.isAtlassianContainer()){window.top.AJS.$("body").trigger("gadget-rendering-finished")}});return function(){gadget.configTemplate.build()}}();gadget.hideConfig=function(){AJS.$("body").removeClass("config-active");gadget.configTemplate.getTarget().hide()};gadget.showView=function(refresh,resize){if(refresh){gadget.viewTemplate.build()}else{gadget.hideConfig();if(resize!==false){gadget.resize()}AJS.$("button",".footer").show()}gadget.addMenuItem("configure",gadget.getMsg("gadget.common.configure"),function(e){gadget.showConfig();e.preventDefault()});if(gadget.addReloadButton){gadget.addReloadButton()}};gadget.ajaxErrorHandler.handle400=function(superHandle400){var validationErrors,showFormErrors=function(){AJS.$(".error",gadget.configTemplate.getTarget()).hide();AJS.$(validationErrors).each(function(){var msg=gadget.getMsg(this.error,this.params);AJS.$(":input[name='"+this.field+"']").parent().find(".error").text(msg).show();AJS.$("#"+this.field+"-error").text(msg).show()});gadget.resize();validationErrors=null};gadget.configTemplate.addCallback(function(){if(!gadget.getPrefs().getBool("isConfigured")||validationErrors){AJS.$("input.cancel",gadget.configTemplate.getTarget()).hide()}if(validationErrors){showFormErrors()}gadget.removeMenuItem("configure");gadget.removeMenuItem("reload")});return function(evt,data,settings){validationErrors=data.errors;if(!settings.isConfig){superHandle400.apply(gadget,arguments)}else{showFormErrors()}}}(gadget.ajaxErrorHandler.handle400);jQuery(document).bind("ajax.anonymousAccessDenied",function(){gadget.hideConfig()});return gadget};