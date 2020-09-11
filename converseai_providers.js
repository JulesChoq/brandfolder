/**
 * @file converseai_providers.js
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

'use strict';

const Status                    = require('@converseai/plugins-sdk').Status;
const RegistrationDataResponse  = require('@converseai/plugins-sdk').Payloads.RegistrationDataResponse;

const onProviderRegister = function(app, body) {
 /**
  * Registration parameters assigned to body.payload.registrationData.
  * @example
  * const regOne = body.payload.registrationData.regOne;
  */

  /** @type {RegistrationDataResponse} response The Converse AI response to respond with. */
  const response = new RegistrationDataResponse();

  /*
  * Set the registrationData for the provider. It's important to return all
  * information that you wish to be stored on the provider.
  */
  response.setRegistrationData(body.payload.registrationData);

  /*
  * This will return a success status and response to the registration function.
  * It is important to always call `app.send` with a status and a response when
  * the method has finished computing and must always return the data to be
  * stored on the provider.
  */
  app.send(Status.SUCCESS, response);
}

const onProviderUnregister = function(app, body) {
 /**
  * Registration parameters assigned to body.payload.registrationData.
  * @example
  * const regOne = body.payload.registrationData.regOne;
  */

  /*
  * This will return a success status and response to the registration function.
  * It is important to always call `app.send` with a status when the method
  * has finished computing.
  */
  app.send(Status.SUCCESS);
}

module.exports = {
  onProviderRegister: onProviderRegister,
  onProviderUnregister: onProviderUnregister
}
