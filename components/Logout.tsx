import { useAuth } from '@/app/Hooks/AuthContextHook';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const Logout = () => {

    const { logoutUser } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success("Logged out successfully!", { position: "bottom-right" });
            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("An unknown error occurred", { position: "bottom-right" });
        }
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="soft">Logout</Button>
            </AlertDialog.Trigger>

            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Logout</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure you want to logout?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action onClick={handleLogout}>
                        <Button variant="solid" color="red">
                            Logout
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default Logout;
