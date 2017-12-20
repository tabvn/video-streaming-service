import React, {Component} from 'react';
import styled from 'styled-components'
import {
    FormSuccessMessage,
    FormErrorMessage,
    Form,
    FormItem,
    FormAction,
    FormInput,
    FormLabel,
    FormSubmit
} from '../../themes/form'

import _ from 'lodash'

const LoginWrapper = styled.div `

`
export default class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            message:{
                type: 'success',
                msg: null
            },
            user: {
                email: "",
                password: "",
            }
        }

        this._onSubmit = this._onSubmit.bind(this);
        this._onTextFieldChange = this._onTextFieldChange.bind(this);
    }

    _onTextFieldChange(event) {

        let {user} = this.state;

        const field = event.target.name;
        const value = event.target.value;

        user[field] = value;

        this.setState({
            user: user
        });

    }

    _onSubmit(event) {
        const {user} = this.state;
        const {store} = this.props;

        event.preventDefault();

        console.log("FOrm is submitted with value", user)

        store.login(user, (err, result) => {

            if (err) {

                this.setState({
                    message: {type:'error', msg: _.get(err, 'response.data.error.message', "Login Error")}
                })
            } else {

                this.setState({
                    message: {type:'success', msg: 'Login successful.'}
                })
            }

        });
    }

    render() {

        const {user, message} = this.state;

        return (
            <LoginWrapper>
                <h2>Sign In</h2>
                <Form onSubmit={this._onSubmit}>
                    {
                        message.msg ? message.type === 'success' ?
                            <FormSuccessMessage>{message.msg}</FormSuccessMessage> :
                            <FormErrorMessage>{message.msg}</FormErrorMessage> : null
                    }
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormInput onChange={this._onTextFieldChange} value={_.get(user, 'email', '')} type={'email'}
                                   name={'email'} placeholder={'Your email address'}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput onChange={this._onTextFieldChange} value={_.get(user, 'password', '')}
                                   type={'password'} name={'password'} placeholder={'Password'}/>
                    </FormItem>
                    <FormAction>
                        <FormSubmit type={"submit"}>Login</FormSubmit>
                    </FormAction>
                </Form>
            </LoginWrapper>
        )

    }
}