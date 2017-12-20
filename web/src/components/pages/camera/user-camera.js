import React, {Component} from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import moment from 'moment'
import {history} from "../../../history";

const UserCameraWrapper = styled.div `

    
`

const ActionButton = styled.button `
    background: none;
    border: 0 none;
    padding: 3px 10px;
    font-weight: 600;
    color: rgba(0,0,0,0.8);
    font-size: 15px;
`

export default class UserCamera extends Component {


    render() {

        const {store} = this.props;


        const cameras = store.getUserCameras();

        console.log("User camera", cameras);

        return <UserCameraWrapper>

            <h2>Your camera list</h2>


            <ActionButton onClick={() => {

                history.push('/dashboard/camera/add')
            }}>Add new Camera</ActionButton>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Live</th>
                    <th>Is Connected</th>
                    <th>Last connected</th>
                    <th>Public</th>
                </tr>
                </thead>
                <tbody>
                {cameras.map((cam, index) => {
                    const lastConnected = _.get(cam, 'lastConnected');
                    return (
                        <tr key={index}>
                            <td>{_.get(cam, 'name')}</td>
                            <td>{_.get(cam, 'live') ? "Live" : "Offline"}</td>
                            <td>{_.get(cam, 'isConnected') ? "Connected" : "Disconnected"}</td>
                            <td>{lastConnected ? moment(lastConnected).fromNow() : "Disconnected"}</td>
                            <td>{_.get(cam, 'public') ? "Public" : "Private"}</td>

                        </tr>
                    )

                })}

                </tbody>
            </table>

        </UserCameraWrapper>

    }
}