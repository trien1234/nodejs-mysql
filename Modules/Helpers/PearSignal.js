
"use strict"

const Joi = require('joi'),
Request = require('superagent'),
https = require('https');

// OneSignal v1 API url 
const API_URL = 'https://onesignal.com/api/v1';

class PearSignal {

	constructor(appid, apikey, authkey = '') {
	    Joi.assert(
	      appid,
	      Joi.string().guid().required(),
	      new Error('`appId` is required')
	    );

	    Joi.assert(
	      apikey,
	      Joi.string().required(),
	      new Error('`restApiKey` is required')
	    );

	    this.appid = appid
	    this.apikey = apikey
	    this.authkey = authkey

	    this.options = {
	      	host: "onesignal.com",
	      	port: 443,
	      	path: "/api/v1/notifications",
	      	method: "POST",
	      	headers: {
	        	"Content-Type": "application/json; charset=utf-8",
	        	"Authorization": "Basic " + apikey
	      	}
	    };
	}

  	// send to player id
  	toIds(contents, ids) {
	    this.checkMessage(contents)
	    var message = {
	      	app_id: this.appid,
	      	contents: contents.body,
	      	headings: contents.head,
	      	data: contents.data,
	      	url: contents.url,
	      	include_player_ids: ids,
	    };
    	this.toOnesignal(message)
  	}

  	// Send to all subscribers
  	toAll(contents) {
	    this.checkMessage(contents)
	    var message = {
	      	app_id: this.appid,
	      	contents: contents.body,
	      	headings: contents.head,
	      	data: contents.data,
	      	url: contents.url,
	      	included_segments: ["All"]
	    };
	    this.toOnesignal(message)
  	}

	// send to tag name
	toTags(contents, tags) {
	    this.checkMessage(contents)
	    var message = {
	      	app_id: this.appid,
	      	contents: contents.body,
	      	headings: contents.head,
	      	data: contents.data,
	      	url: contents.url,
	      	filters: [{ field: 'tag', key: tags.key, relation: '=', value: tags.value }]
	    };
	    this.toOnesignal(message)
	}

  	toTagsSameKey(contents, key, values) {
	    let filters = []
	    
	    let lastIndex = values.length - 1
	    values.forEach((e, i) => {
	      	filters.push({
	        	field: 'tag', key, relation: '=', value: e
	      	})
	      	if (i < lastIndex) filters.push({ operator: 'OR' })
	    })
	    console.log('filters: ', filters);

	    this.checkMessage(contents)
	    var message = {
	      	app_id: this.appid,
	      	contents: contents.body,
	      	headings: contents.head,
	      	data: contents.data,
	      	url: contents.url,
	      	filters
	    };
	    this.toOnesignal(message)
  	}

	  // View an app
	viewApp() {
	    return new Promise((resolve, reject) => {
	      	try {
		        if (this.authkey != '') {
			        Request
			            .get(`${API_URL}/apps/${this.appid}`)
			            .set('Authorization', `Basic ${this.authkey}`)
			            .end((err, res) => {
			              	if (err) {
			                	reject(err)
			              	} else {
			                	resolve(res.body)
			              	}
			            });
		        } else {
		          	resolve({
		            	message: 'Requires your OneSignal User Auth Key, available in Keys & IDs.'
		          	})
		        }
	      	} catch (e) {
	        	reject(e)
	      	}
    	})
	}

	// view all apps
	viewApps() {
	    return new Promise((resolve, reject) => {
		    try {
		        if (this.authkey != '') {
		          	Request
		            	.get(`${API_URL}/apps`)
		            	.set('Authorization', `Basic ${this.authkey}`)
		            	.end((err, res) => {
		              	if (err) {
		                	reject(err)
		              	} else {
		                	resolve(res.body)
		              	}

		            });
		        } else {
		          	resolve({
		            	message: 'Requires your OneSignal User Auth Key, available in Keys & IDs.'
		          	})
		        }

		    } catch (e) {
		       	reject(e)
		    }
	    })
  	}

  // view device
  viewDevice(id) {
    return new Promise((resolve, reject) => {
      try {
        if (this.authkey != '') {
          Request
            .get(`${API_URL}/players/${id}`)
            .query({ app_id: this.appid })
            .set('Authorization', `Basic ${this.authkey}`)
            .end((err, res) => {
              if (err) {
                reject(err)
              } else {
                resolve(res.body)
              }

            });
        } else {
          resolve({
            message: 'Requires your OneSignal User Auth Key, available in Keys & IDs.'
          })
        }

      } catch (e) {
        reject(e)
      }
    })
  }

  // view devices
  viewDevices(start, limit) {
    return new Promise((resolve, reject) => {
      try {
        Request
          .get(`${API_URL}/players`)
          .query({
            app_id: this.appid,
            offset: start,
            limit: limit
          })
          .set('Authorization', `Basic ${this.apikey}`)
          .end((err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(res.body)
            }

          });
      } catch (e) {
        reject(e)
      }
    })
  }

  // edit device
  editDevice(contents, id) {
    return new Promise((resolve, reject) => {

      try {
        Request.put(`${API_URL}/players/${id}`)
          .set('Authorization', `Basic ${this.apikey}`)
          .send(contents)
          .end((err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(res.body)
            }

          });
      } catch (e) {
        reject(e)
      }

    });
  }

  // check message
  checkMessage(contents) {
    if (typeof contents.head == "string") {
      contents.head = {
        en: contents.head
      }
    }

    if (typeof contents.body == "string") {
      contents.body = {
        en: contents.body
      }
    }
    return contents
  }

  // make a request to onesignal
  toOnesignal(data) {
    var req = https.request(this.options, function (res) {
      res.on('data', function (data) {
        console.log("Response from onesignal:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function (e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  }

  // send notification with more options
  createNotification({ contents, specific = {}, attachments = {}, options = {} }) {

    // Perform some basic validation
    Joi.assert(
      contents,
      Joi.alternatives().try(Joi.string(), Joi.object()).required(),
      new Error('`message` is required')
    );
    Joi.assert(options, Joi.object());

    if (typeof contents.headings == "string") {
      contents.headings = {
        en: contents.headings
      }
    }

    if (typeof contents.contents == "string") {
      contents.contents = {
        en: contents.contents
      }
    }

    // Craft the payload
    const payload = Object.assign(
      {
        app_id: this.appid,
      },
      options,
      contents,
      specific,
      attachments
    );

    // Make the request
    return new Promise((resolve, reject) => {

      try {
        Request.post(`${API_URL}/notifications`)
          .set('Authorization', `Basic ${this.apikey}`)
          .send(payload)
          .end((err, res) => {
            if (err) {
              reject(err)
            } else {
              resolve(res.body)
            }

          });
      } catch (e) {
        reject(e)
      }

    });
  }


}

module.exports = PearSignal
