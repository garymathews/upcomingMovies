// Set ACA globally.
Alloy.Globals.aca = require('com.appcelerator.aca');

// Specify our username.
Alloy.Globals.aca.setUsername('gary');

// Specify device metadata.
Alloy.Globals.aca.setMetadata('device', {
    model: Ti.Platform.model,
	network_type: Ti.Network.networkTypeName,
	os: `${Ti.Platform.osname} ${Ti.Platform.version}`
});