import { ChangeEvent, FC, useCallback, useState } from "react";
import { Card, CardBody, CardHeader, Input, Heading, CardFooter, Button } from "@chakra-ui/react";
import styles from "./Forgot.module.css";

export const Forgot: FC = () => {
    const [email, setEmail] = useState('');
    const handleEmailChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => setEmail(target.value), []);

    const handleSubmit = useCallback(() => {
        // TODO
    },[]);

    return (
        <div className={styles.wrapper}>
            <Card w="md">
                <CardHeader>
                    <Heading size="md">Reset your password</Heading>
                    <div className={styles.subtitle}>Enter the email address used to register your account with us</div>
                </CardHeader>
                <CardBody>
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={handleEmailChange}
                    />
                </CardBody>
                <CardFooter>
                    <Button 
                        colorScheme="teal" 
                        width="100%"
                        onClick={handleSubmit}
                    >Reset your password</Button>
                </CardFooter>
            </Card>
        </div>
    )
}