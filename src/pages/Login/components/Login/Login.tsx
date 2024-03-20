import { FC, useCallback, useState, ChangeEvent } from "react";
import styles from './Login.module.css';
import { Card, CardBody, CardHeader, FormControl, Input, Heading, CardFooter, Button, useToast, Link, Checkbox } from "@chakra-ui/react";
import { authLoginPost } from "../../../../api/auth/authLoginPost";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

export const Login: FC = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // TODO remember me

    const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setEmail(target.value), []);
    const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value), []);
    const handleSubmit = useCallback(() => {
        authLoginPost({
            // @ts-expect-error FIXME awaiting new swagger
            email,
            password
        })
        // @ts-expect-error будем писать в стор текущего пользователя
        .then(({ data }) => {
            toast({
                title: 'Logged in!',
                status: 'success',
                duration: 1000
            });
            navigate('/');
        })
        .catch(() => {
            toast({ // FIXME хрень полная, надо выделять красненьким поля в форме
                title: 'Error logging in :(',
                status: 'error',
                duration: 2000
            });
            setEmail('');
            setPassword('');
        })
    }, [email, password]);

    return ( // TODO валидация телефона и пароля
        <div className={styles.wrapper}>
            <Card w="md">
                <CardHeader>
                    <Heading size="md">Login</Heading>
                    <div className={styles.subtitle}>New to Horizon restaurants? <Link color="blue" as={ReactRouterLink} to="/signup">Create an account</Link></div>
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
                    </FormControl>
                </CardBody>
                <CardFooter>
                    <div className={styles.actions}>
                        <Button 
                            colorScheme="teal" 
                            width="100%"
                            onClick={handleSubmit}
                        >Login</Button>
                        <div className={styles.subactions}>
                            <Checkbox>Remember Me</Checkbox>
                            <Link color="blue" as={ReactRouterLink} to="/forgot">Forgot Password?</Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}