
import { useTheme, Heading, Text } from '@aws-amplify/ui-react';


export const formFields = {
    confirmVerifyUser: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
  
export  const components = {
    VerifyUser: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  
    ConfirmVerifyUser: {
      Header() {
        const { tokens } = useTheme();
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  };