import React, {Component} from 'react';
import styled from 'styled-components'
import {
    Form,
    FormItem,
    FormLabel,
    FormInput,
    FormCheckboxItem,
    FormAction,
    FormActionLeft,
    FormButton,
    FormErrorMessage,
    FormSuccessMessage,
    FormSubmit
} from "../../themes/form";
import _ from 'lodash';
import {history} from "../../../history";

const AddCameraWrapper = styled.div `

    
`


export default class AddCamera extends Component {


    constructor(props) {
        super(props);


        this.state = {
            message: {
                type: 'success',
                msg: null,
            },
            camera: {
                name: "",
                public: false,
            }
        }


        this._onSubmit = this._onSubmit.bind(this);
        this._onTextFieldChange = this._onTextFieldChange.bind(this);
        this._onCheckboxFieldChange = this._onCheckboxFieldChange.bind(this)
    }

    _onSubmit(event) {

        const {store} = this.props;
        const {camera} = this.state;

        event.preventDefault();


        store.addCamera(camera, (err, result) => {


            if (err) {

                this.setState({
                    message: {type: 'error', msg: _.get(err, 'response.data.error.message', 'An error')}
                })
            } else {

                this.setState({
                    message: {type: 'success', msg: `${camera.name} has been created.`}
                }, () => {

                    history.push('/dashboard/camera');
                })

            }

        });

    }

    _onTextFieldChange(event) {

        let {camera} = this.state;

        const fieldName = event.target.name;
        const fieldValue = event.target.value;


        camera[fieldName] = fieldValue;

        this.setState({
            camera: camera
        });
    }

    _onCheckboxFieldChange(event) {
        let {camera} = this.state;


        const isChecked = event.target.checked;

        const name = event.target.name;

        camera[name] = isChecked;
        this.setState({
            camera: camera
        });
    }

    render() {

        const {camera, message} = this.state;

        const msg = _.get(message, 'msg', null);
        const messageType = _.get(message, 'type', 'success');
        return <AddCameraWrapper>

            <h2>Add new camera</h2>
            <Form onSubmit={this._onSubmit}>
                {
                    msg && messageType === 'success' ? <FormSuccessMessage>{msg}</FormSuccessMessage> : null

                }
                {
                    msg && messageType === 'error' ? <FormErrorMessage>{msg}</FormErrorMessage> : null

                }
                <FormItem>
                    <FormLabel>Name of your camera</FormLabel>
                    <FormInput value={_.get(camera, 'name', '')} name={'name'} type={'text'}
                               onChange={this._onTextFieldChange}/>
                </FormItem>
                <FormCheckboxItem>
                    <FormInput id={'is-camera-public'} value={_.get(camera, 'public', false)} name={'public'}
                               type={'checkbox'}
                               onChange={this._onCheckboxFieldChange}/>
                    <FormLabel htmlFor={'is-camera-public'}>Is public camera ?</FormLabel>
                </FormCheckboxItem>
                <FormAction>
                    <FormActionLeft>
                        <FormSubmit type={'submit'}>Create</FormSubmit>
                    </FormActionLeft>
                    <FormButton onClick={() => {

                        history.push('/dashboard/camera')

                    }} type={'button'}>Cancel</FormButton>
                </FormAction>

            </Form>

        </AddCameraWrapper>

    }
}