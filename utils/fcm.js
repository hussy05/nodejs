const FCM = require('fcm-node')


var serverKey = require('../fcmAuth.json') //put the generated private key path here

var fcm = new FCM(serverKey)

exports.fcm = async (imageUrl,registrationToken,title,body,requestId,clickAction) =>  {
    var message = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)

        "to": registrationToken,
        "notification": {
            "title": title,
            "body": body,
            "image": imageUrl || '',  // send when it's a image notification.
            "click_action": clickAction,  // request or admin
            "sound": "custom.wav",
            "priority": "high",
            "mutable_content": 'true'  // send when it's a image notification.
        },
        "data": {
            "requestId": requestId?.toString()||"",  // send when it's a reequest notification.
            "imageURL":  imageUrl || ''  // send when it's a image notification.
        }
    }

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err)
            return err;
        } else {
            console.log("Successfully sent with response: ", response)
            return response;
        }
    })
}
