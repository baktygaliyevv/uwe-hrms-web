import { FC, useCallback, useState, ChangeEvent } from "react";
import styles from './Login.module.css';
import { Card, CardBody, CardHeader, FormControl, InputGroup, InputLeftAddon, Input, Heading, CardFooter, Button, useToast } from "@chakra-ui/react";
import { apiAuthLogin } from "../../../../api/auth/login";
import { useSetRole } from "../../../../stores/RoleStore";
import { useNavigate } from "react-router-dom";

export const Login: FC = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const setRole = useSetRole();

    const handlePhoneChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setPhone(target.value), []);
    const handlePasswordChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setPassword(target.value), []);
    const handleSubmit = useCallback(() => {
        apiAuthLogin({
            phone,
            password
        })
        .then(({ data }) => {
            setRole(data.payload.role);
            toast({
                title: 'Logged in!',
                status: 'success',
                duration: 1000
            });
            navigate('/');
        })
        .catch(() => {
            setRole({});
            toast({ // FIXME хрень полная, надо выделять красненьким поля в форме
                title: 'Error logging in :(',
                status: 'error',
                duration: 2000
            });
            setPhone('');
            setPassword('');
        })
    }, [phone, password]);

    return ( // TODO валидация телефона и пароля
        <div className={styles.wrapper}>
            <Card w="md">
                <CardHeader>
                    <Heading size="md">Login</Heading>
                </CardHeader>
                <CardBody>
                    <FormControl>
                    <InputGroup>
                        <InputLeftAddon children='+44' />
                        <Input 
                            type='tel' 
                            placeholder='Phone number' 
                            value={phone} 
                            onChange={handlePhoneChange}
                        />
                    </InputGroup>
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
                    <Button 
                        colorScheme="teal" 
                        width="100%"
                        onClick={handleSubmit}
                    >Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}