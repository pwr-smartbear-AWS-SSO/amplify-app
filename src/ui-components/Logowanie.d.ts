/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, PasswordFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LogowanieInputValues = {
    Field0?: string;
    Field1?: string;
};
export declare type LogowanieValidationValues = {
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LogowanieOverridesProps = {
    LogowanieGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
    Field1?: PrimitiveOverrideProps<PasswordFieldProps>;
} & EscapeHatchProps;
export declare type LogowanieProps = React.PropsWithChildren<{
    overrides?: LogowanieOverridesProps | undefined | null;
} & {
    onSubmit: (fields: LogowanieInputValues) => void;
    onChange?: (fields: LogowanieInputValues) => LogowanieInputValues;
    onValidate?: LogowanieValidationValues;
} & React.CSSProperties>;
export default function Logowanie(props: LogowanieProps): React.ReactElement;
