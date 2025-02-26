import { useAuth } from "@/app/Hooks/AuthContextHook";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success("Logged in successfully!",{position: "bottom-right"});
    } catch (error: any) {
      toast.error(error.message, {position: "bottom-right"});
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="soft" color="blue">Sign In</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter your credentials to access your account.
        </Dialog.Description>

        <form onSubmit={handleLogin}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Root 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button variant="solid" type="submit">Login</Button>
            </Dialog.Close>   
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Login;
