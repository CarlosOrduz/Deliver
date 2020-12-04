sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Dialog6", "./Dialog5",
	"./utilities",
	"sap/ui/core/routing/History"
], function (BaseController, MessageBox, Dialog6, Dialog5, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.essenttia.controller.EditarReunion", {
		handleRouteMatched: function (oEvent) {
			var sAppId = "App5fb304d267be70164376042c";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function (oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			if (!this.sContext) {
				this.sContext = "ReunionSet('4')";
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onPageNavButtonPress: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function (oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress: function (oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function (fnResolve) {
					fnResolve(true);
				})
				.then(function (result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function (fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function (oData) {
										var sKey = oModel.getKey(oData);
										oData["estado"] = "Aprobado";
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["estado"] = "Aprobado";
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function (result) {
					if (result === false) {
						return false;
					} else {

						var sDialogName = "Dialog5";
						this.mDialogs = this.mDialogs || {};
						var oDialog = this.mDialogs[sDialogName];
						if (!oDialog) {
							oDialog = new Dialog5(this.getView());
							this.mDialogs[sDialogName] = oDialog;

							// For navigation.
							oDialog.setRouter(this.oRouter);
						}

						var context = oEvent.getSource().getBindingContext();
						oDialog._oControl.setBindingContext(context);

						oDialog.open();

					}
				}.bind(this)).catch(function (err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress1: function (oEvent) {

			oEvent = jQuery.extend(true, {}, oEvent);
			return new Promise(function (fnResolve) {
					fnResolve(true);
				})
				.then(function (result) {

					var oSource = oEvent.getSource();
					var oSourceBindingContext = oSource.getBindingContext();

					return new Promise(function (fnResolve, fnReject) {
						if (oSourceBindingContext) {
							var oModel = oSourceBindingContext.getModel();

							var oData = oModel._getObject("", oSourceBindingContext, true);

							if (!oData) {
								oModel.read(oSourceBindingContext.sPath, {
									success: function (oData) {
										var sKey = oModel.getKey(oData);
										oData["estado"] = "Rechazado";
										oModel.update('/' + sKey, oData, {
											success: fnResolve,
											error: fnReject,
											refreshAfterChange: true
										});
									},
									error: fnReject
								});
							} else {
								var sKey = oModel.getKey(oData);
								oData["estado"] = "Rechazado";
								oModel.update('/' + sKey, oData, {
									success: fnResolve,
									error: fnReject,
									refreshAfterChange: true
								});
							}
						}
					});

				}.bind(this))
				.then(function (result) {
					if (result === false) {
						return false;
					} else {

						var sDialogName = "Dialog6";
						this.mDialogs = this.mDialogs || {};
						var oDialog = this.mDialogs[sDialogName];
						if (!oDialog) {
							oDialog = new Dialog6(this.getView());
							this.mDialogs[sDialogName] = oDialog;

							// For navigation.
							oDialog.setRouter(this.oRouter);
						}

						var context = oEvent.getSource().getBindingContext();
						oDialog._oControl.setBindingContext(context);

						oDialog.open();

					}
				}.bind(this)).catch(function (err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
		},
		_onButtonPress2: function (oEvent) {

			var oBindingContext = oEvent.getSource().getBindingContext();

			return new Promise(function (fnResolve) {

				this.doNavigate("Planeador", oBindingContext, fnResolve, "");
			}.bind(this)).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

			var sEntityNameSet;
			if (sPath !== null && sPath !== "") {
				if (sPath.substring(0, 1) === "/") {
					sPath = sPath.substring(1);
				}
				sEntityNameSet = sPath.split("(")[0];
			}
			var sNavigationPropertyName;
			var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

			if (sEntityNameSet !== null) {
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
					sRouteName);
			}
			if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
				if (sNavigationPropertyName === "") {
					this.oRouter.navTo(sRouteName, {
						context: sPath,
						masterContext: sMasterContext
					}, false);
				} else {
					oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
						if (bindingContext) {
							sPath = bindingContext.getPath();
							if (sPath.substring(0, 1) === "/") {
								sPath = sPath.substring(1);
							}
						} else {
							sPath = "undefined";
						}

						// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
						if (sPath === "undefined") {
							this.oRouter.navTo(sRouteName);
						} else {
							this.oRouter.navTo(sRouteName, {
								context: sPath,
								masterContext: sMasterContext
							}, false);
						}
					}.bind(this));
				}
			} else {
				this.oRouter.navTo(sRouteName);
			}

			if (typeof fnPromiseResolve === "function") {
				fnPromiseResolve();
			}

		},
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("EditarReunion").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);