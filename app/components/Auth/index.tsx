'use client'

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';
import { Form, Input, Button, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


export const Auth: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [color, setColor] = useState('');
    const [status, setStatus] = useState('');

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)};
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {setPass(e.target.value)};

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Logging In...');
        const _email = email;
        const _pass = pass;
        try{
            let response = await fetch(process.env.NEXT_PUBLIC_API_PATH+'/login',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: _email,
                    password: _pass,
                })
            })

            if (!response.ok) throw response.statusText;

            const auth_data = await response.json();
            const expiration = new Date(auth_data.expires * 1000);
            Cookies.set('ontology_auth_email', _email, { expires: expiration });
            Cookies.set('ontology_auth_name', auth_data.name, { expires: expiration });
            Cookies.set('ontology_auth_access', auth_data.access_token, { expires: expiration });
            Cookies.set('ontology_auth_refresh', auth_data.refresh_token, { expires: expiration });
            setColor('green');
            setStatus('Success...');
            setTimeout(() => {
                router.push('/explorer');
            }, 1000);
        } catch (e) {
            setColor('red');
            setStatus('Error: '+e);
            setTimeout(() => {
                setStatus('');
                setColor('');
            }, 4000);
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Input type='email' name='email' placeholder='Email' onChange={handleEmailChange}/>
                <Input type='password' name='password' placeholder='Password' onChange={handlePasswordChange} />
                <Button type='submit' href=''>Login To Ontology Explorer </Button>
            </Form>
            {status &&
            <Label color={color}>{status}</Label>
            }
        </div>
    );
}

export default Auth;
