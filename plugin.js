/**
 * @file plugins.js
 * @name mbfdemo_brandfolder
 * @description Integration with Brandfolder API 
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 *
 * IMPORTANT: THIS FILE IS AUTO GENERATED, CHANGES MAY BE OVERRIDDEN!
 */

'use strict';
const ConversePluginsSDK = require('@converseai/plugins-sdk');
const RegProviders       = require('./converseai_providers');

/**
 * mbfdemo_brandfolder plugin. To be used with
 * Converse AI Plugins SDK.
 *
 * @example
 * const converseai  = require('plugins.js');
 * const express     = require('express');
 * const bodyParser  = require('body-parser');
 *
 * var server = express();
 *
 * server.use(bodyParser.json());
 * server.post('/', function (req, res) {
 *    converseai.mbfdemo_brandfolder(req, res);
 * });
 *
 * @param {Object} request Express HTTP request object.
 * @param {Object} response Express HTTP response object.
 */
exports.mbfdemo_brandfolder = function (request, response) {
  var app = new ConversePluginsSDK.http({ request, response });

  if (request && request.headers && request.headers['x_converse_app_token'] && request.headers['x_converse_app_token'] === require('./app-token')) {

    app.setOnProviderRegister(RegProviders.onProviderRegister);
    app.setOnProviderUnregister(RegProviders.onProviderUnregister);

    app.setModules({
      list_users: require('./converseai_modules/list_users'),
      list_filetypes: require('./converseai_modules/list_filetypes'),
      search_assets: require('./converseai_modules/search_assets'),
      list_tags: require('./converseai_modules/list_tags'),
      get_attachments: require('./converseai_modules/get_attachments'),
      create_asset: require('./converseai_modules/create_asset')
    });



    app.handleRequest();
  } else {
    app._handleError(403, 'FORBIDDEN_APP_TOKEN', 'Forbidden app token set.');
  }
};
