import React, { Component } from 'react';
import { View } from 'react-native';
import { OTSession, OTPublisher, OTSubscriber, OT } from 'opentok-react-native';

class VideoCall extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apiKey: '',
            sessionId: '',
            token: '',
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