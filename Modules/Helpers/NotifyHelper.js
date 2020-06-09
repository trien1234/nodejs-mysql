const db = require('../Models/index');
const Notifications = db.Notifications;
const User = db.User;
const NOTIFY_TYPE = require("../../Config/constant.js");
const { ONESIGNAL_TAG, PearSignal } = require('./Onesignal.js');

module.exports = {

	toManager: async (Id, fromUserId, toUserId, contentNotify, player, title) => {
	    
	    let content = contentNotify;
	    
	    let notify = await Notifications.create({
	        FromUserId: fromUserId,
	        ToUserId: toUserId,
	        TableId: Id,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
	        Content: { 
	          	FromUserId: fromUserId,
	          	title,
	          	content
	        }
	    })
	    
	    if (notify) {
	        // gửi thông báo
	        // PearSignal.toTags(
	        //   // content
	        //   	{
		       //      body: contentNotify,
		       //      head: title,
		       //      data: {
		       //        	notifyType: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
		       //        	toUserId: toUserId,
		       //        	title,
		       //        	content
	        //     	},
	        //   	},
	        //   // tag
	        //   	{
	        //     	key: ONESIGNAL_TAG,
	        //     	value: toUserId
	        //   	}
	        // )
	        PearSignal.toIds(
	        	{
		            body: contentNotify,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
		              	incidentId: Id,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},
	toManagerConfirmIncident: async (Id, fromUserId, toUserId, contentNotify, player, title) => {
	    
	    let content = contentNotify;
	    
	    let notify = await Notifications.create({
	        FromUserId: fromUserId,
	        ToUserId: toUserId,
	        TableId: Id,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
	        Content: { 
	          	FromUserId: fromUserId,
	          	title,
	          	content
	        }
	    })
	    
	    if (notify) {
	        PearSignal.toIds(
	        	{
		            body: contentNotify,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.NEED_CONFIRM,
		              	incidentId: Id,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},
	toOneFixer: async (Id,fromUser=null, toUserId, contentNotify, player, title) => {
	    // let title = title;
	    let content = contentNotify;
	    
	    let notify = await Notifications.create({
	        FromUserId: fromUser,
	        ToUserId: toUserId,
	        TableId: Id,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
	        Content: { 
	          	FromUserId: fromUser,
	          	title,
	          	content
	        }
	    })    
	    if (notify) {
	        PearSignal.toIds(
	        	{
		            body: contentNotify,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
		              	incidentId: Id,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},
	toResident: async (Id,fromUser, toUserId, contentNotify, player) => {
	    let title = 'Thông báo cập nhật tình trạng sự cố'
	    let content = contentNotify;
	    let notify = await Notifications.create({
	        FromUserId: fromUser,
	        ToUserId: toUserId,
	        TableId: Id,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
	        Content: { 
	          	FromUserId: fromUser,
	          	title,
	          	content
	        }
	    })    
	    if (notify) {
	        PearSignal.toIds(
	        	{
		            body: contentNotify,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
		              	incidentId: Id,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},
	toManyFixers: async (IncidentId, toUser, incident, fromUser, player) => {
	    let title = 'Thông báo báo giá sự cố'

	    let content = `Xin chào ${toUser.FullName}. 3SHome mời bạn gửi báo giá sự cố ${incident.Code}.`
	    let notify = await Notifications.create({
	        FromUserId: fromUser,
	        ToUserId: toUser.Id,
	        TableId: IncidentId,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
	        Content: { 
	          	FromUserId: fromUser,
	          	title,
	          	content
	        }
	    })
	    if (notify) {
	        PearSignal.toIds(
	        	{
		            body: content,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.INCIDENT,
		              	incidentId: IncidentId,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},

	newBillToResident: async (Id,fromUser, toUserId, contentNotify, player) => {
	    let title = 'Thông báo hoá đơn mới'
	    let content = contentNotify;
	    let notify = await Notifications.create({
	        FromUserId: fromUser,
	        ToUserId: toUserId,
	        TableId: Id,
	        Type: NOTIFY_TYPE.NOTIFY_TYPE.BILLING,
	        Content: { 
	          	FromUserId: fromUser,
	          	title,
	          	content
	        }
	    })    
	    if (notify) {
	        PearSignal.toIds(
	        	{
		            body: contentNotify,
		            head: title,
		            data: {
		              	type: NOTIFY_TYPE.NOTIFY_TYPE.BILLING,
		              	incidentId: Id,
		              	title,
		              	content
	            	},
	          	},
	          	//player Ids
	          	player?player:[]
	        )
	    }
	},
  
}