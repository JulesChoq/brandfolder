/**
 * @file search_assets.js
 * @description Searches Brandfolder Assets by tags 
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

'use strict';

const Status          = require('@converseai/plugins-sdk').Status;
const ModuleResponse  = require('@converseai/plugins-sdk').Payloads.Module.ModuleResponse;
const fetch           = require('node-fetch');

module.exports = function search_assets (app, body) {
  const {
    token,
    org_id
  } = body.payload.registrationData;

  const operator = body.payload.moduleParam.operator;

  let tags = body.payload.moduleParam.tags || [];
  if(tags.includes('[')){
    tags = tags.replace(/\[/g,'').replace(/\]/g,'');
  }

  if(typeof tags==='object'){
    tags=tags.join(' ')
  }

  let filetypes = body.payload.moduleParam.filetypes || [];
  if(filetypes.includes('[')){
    filetypes = filetypes.replace(/\[/g,'').replace(/\]/g,'');
  }
  
  if(typeof filetypes==='object'){
    filetypes=filetypes.join(' ')
  }

  console.log(operator)
  let search
  if(tags && filetypes){
    search= `tags.strict:"${tags}" ${operator} filetype.strict:"${filetypes}"`
  }
  
  if(tags && !filetypes){
    search= `tags.strict:${tags}`
  }
  
  if(!tags && filetypes){
    search= `filetype.strict:"${filetypes}"`
  }
  
  if(!tags && !filetypes){
    search = null;
  }
 
  if (token != undefined && org_id != undefined) { 
    const response = new ModuleResponse();

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      qs: {
        search,
        fields: 'cdn_url'
      },
      json: true
    }

    fetch(`https://brandfolder.com/api/v4/organizations/${org_id}/assets`, options).then(result => {
      response.setValue(result);
      console.log(options);
      console.log(response);
      console.log(result);
      app.send(Status.SUCCESS, response);
    }).catch(err => {
      console.error(err)
      app.fail({ httpStatus: err.statusCode, message: err.error.errors}); 
    })
  } else { 
    app.fail({ httpStatus: 400, code: 'REQUIRED_PARAMS_UNDEFINED', description: 'Required parameters are undefined.' }); 
  }
};
