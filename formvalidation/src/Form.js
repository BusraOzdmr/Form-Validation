import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {

    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false
        }
      }
    
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

    render () {
        return (
        
          <form className="formstructure">

            <fieldset>
            <h2 className="formv-title">Sign up</h2>
            <hr />
            <div><FormErrors formErrors={this.state.formErrors} /></div>
            <div value={this.errorClass(this.state.formErrors.email)}>

                <input type="email" required name="email" placeholder="Email" value={this.state.email} onChange={this.handleUserInput}/>
            </div>
            <div value={this.errorClass(this.state.formErrors.password)}>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleUserInput} />
            </div>
                <button type="submit" className="formstructure button" disabled={!this.state.formValid}>
                    Sign up
                </button>
                </fieldset>
          </form>
         
        )
    }
}
export default Form;