import React, { Component } from 'react';
import { View } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber, OT } from 'opentok-react-native';

class VideoCall extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: '46824604',
            sessionId: '1_MX40NjgyNDYwNH5-MTU5NjYwNjE5MzkyNX56ejRvRDA0L3VDQm9OVUlRNyswREExSUl-fg',
            token: 'T1==cGFydG5lcl9pZD00NjgyNDYwNCZzaWc9YjgyYjEwYWIwMWI1NTQ1OTg5NWY5NzYxMzI5YzBhYmYxZTliNTE5NjpzZXNzaW9uX2lkPTFfTVg0ME5qZ3lORFl3Tkg1LU1UVTVOall3TmpFNU16a3lOWDU2ZWpSdlJEQTBMM1ZEUW05T1ZVbFJOeXN3UkVFeFNVbC1mZyZjcmVhdGVfdGltZT0xNTk2NjA2MjE5Jm5vbmNlPTAuNzg1NjgzNTA5ODQxMTkzOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk5MTk4MjE5JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9',
        }

        // OTSession EventHandlers
        this.sessionEventHandlers = {
            connectionCreated: event => {
                console.log("connection created", event);
            },
            connectionDestroyed: event => {
                this.disconnectSession()
                console.log("connection destroyed", event);
            },
            sessionConnected: () => {
                console.log("Client connect to a session")
            },
            sessionDisconnected: () => {
                console.log("Client disConnect to a session")
            },
            sessionReconnected: () => {
                console.log("session reconnected")
            },
        };

        // OTPublisher EventHandlers
        this.publisherEventHandlers = {
            streamCreated: event => {
                console.log('Publisher stream created!', event);
            },
            streamDestroyed: event => {
                console.log('Publisher stream destroyed!', event);
            }
        };

        // OTSubscriber EventHandlers
        this.subscriberEventHandlers = {
            videoDataReceived: event => {
                console.log('videoDataReceived subscriber:', event);
            },
            error: (error) => {
                console.log(`There was an error with the subscriber: ${error}`);
            },
        };

    }

    render() {
        return (
            <View style={{ height: "100%", width: "100%" }}>

                <OTSession
                    apiKey={this.state.apiKey}
                    sessionId={this.state.sessionId}
                    token={this.state.token}
                    eventHandlers={this.sessionEventHandlers}
                >

                    <OTPublisher
                        publisherID={this.state.publisherId}
                        style={{ width: '100%', height: '50%' }}
                        properties={this.state.publisherProperties}
                        eventHandlers={this.publisherEventHandlers}
                    />

                    <OTSubscriber
                        style={{ width: '100%', height: '100%' }}
                        eventHandlers={this.subscriberEventHandlers}
                    />

                </OTSession>

            </View>
        );
    }

    // disconnect OTSession
    disconnectSession() {
        OT.disconnectSession(this.state.sessionId, (disconnectError) => {
            if (disconnectError) {
                console.log('disconnected error');
            }
        });
    }

}

export default VideoCall;