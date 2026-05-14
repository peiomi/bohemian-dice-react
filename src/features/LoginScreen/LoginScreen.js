import React, { useState } from 'react';
import SubHeader from '../../components/SubHeader';
import Button from '../../components/Button';
import './login-screen.css';
import { useNavigate } from 'react-router-dom';

const initialValues = { name: '' }
const LoginScreen = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formValues, updateFormValues] = useState(initialValues);
    const { name } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(name);
        navigate('/');
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        updateFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-screen'>
                <div className='name-panel'>
                    <SubHeader className='login-header' text='hi gamer!' />
                    <p>what is your name?</p>

                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        placeholder='Your name'
                        className='player-input'
                    />
                    <Button text='Continue' type='submit' />
                </div>
            </div>
        </form>
    );
};

export default LoginScreen;