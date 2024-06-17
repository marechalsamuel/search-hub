import { CopyIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";

export type CopyButtonProps = {
    text: string
}
export const CopyButton = ({ text }: CopyButtonProps) => {
    const toast = useToast()

    const handleMouseDown = () => {
      navigator.clipboard.writeText(text);
      
      toast({
        title: `Copied \`${text}\` to clipboard`,
        status: 'success',
        duration: 2500,
        isClosable: true,
        icon: <CopyIcon />,
      })
    };
    return (
        <Button leftIcon={<CopyIcon />} onMouseDown={handleMouseDown}>{text}</Button>
    );
}