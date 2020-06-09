const PearSignal = require('./PearSignal')
let env = process.env.NODE_ENV || 'local'

const appid = env === 'local' ? "e3129470-1dc2-45c3-903b-830cf505df03" : 'e3129470-1dc2-45c3-903b-830cf505df03', 
    apikey =  env === 'local' ? "MjJiZTQ3MmUtMjUzNy00OTQ1LTg4OTgtMDg4MDI5ZWY3ZThj" : 'MjJiZTQ3MmUtMjUzNy00OTQ1LTg4OTgtMDg4MDI5ZWY3ZThj';
const ONESIGNAL_TAG = 'userId';

module.exports = {
	PearSignal: new PearSignal(appid, apikey),
	ONESIGNAL_TAG: ONESIGNAL_TAG
};