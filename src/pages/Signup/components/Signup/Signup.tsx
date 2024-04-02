import { FC, useCallback, useState, ChangeEvent } from "react";
import { Card, CardBody, CardHeader, FormControl, Input, Heading, CardFooter, Button, Link, useToast } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import styles from './Signup.module.css';
import { authSignupPost } from "../../../../api/auth/authSignupPost";

export const Signup: FC = () => {
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setEmail(target.value), []);
    const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value), []);
    const handleFirstNameChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setFirstName(target.value), []);
    const handleLastNameChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setLastName(target.value), []);

    const handleSubmit = () => {
        authSignupPost({
            email,
            password,
            first_name: firstName,
            last_name: lastName
        }).then(() => {
            toast({
                title: 'Please check your email for verification link!',
                status: 'success',
                duration: 2000
            });
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }).catch(() => {
            toast({
                title: 'Error creating your account:(',
                status: 'error',
                duration: 2000
            });
        })
    };

    return (
        <div className={styles.wrapper}>
            <Card w="md">
                <CardHeader>
                    <Heading size="md">Create your account</Heading>
                    <div className={styles.subtitle}>Already have one? <Link color="blue" as={ReactRouterLink} to="/login">Log in</Link></div>
                </CardHeader>
                <CardBody>
                    <FormControl>
                        <Input 
                            type='email' 
                            placeholder='Email' 
                            value={email} 
                            onChange={handleEmailChange}
                        />
                        <Input 
                            mt={6} 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={handlePasswordChange}
                        />
                        <Input 
                            mt={6}
                            type='text'
                            placeholder="First name"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                        <Input 
                            mt={6}
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <Button 
                        colorScheme="teal" 
                        width="100%"
                        onClick={handleSubmit}
                    >Create your account</Button>
                </CardFooter>
            </Card>
        </div>
    );
}