'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('providerApp')

    .value('version', '0.1')
    .service("MessagingService", function () {
        var messages = [];
        return {
            setMessage: function (message) {
                messages.push(message);
            },
            getMessage: function () {
                return messages;
            },
            resetMessage: function () {
                messages = [];
            }
        }
    })
