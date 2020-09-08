import { PropsWithChildren } from "react";
import { ButtonProps } from "./types";
export declare const btnPadding: {
    medium: string;
    small: string;
};
declare function Button(props: PropsWithChildren<ButtonProps>): JSX.Element;
declare namespace Button {
    var defaultProps: {
        isLoading: boolean;
        loadingText: null;
        link: boolean;
        appearance: "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "tertiary" | "outline" | "inversePrimary" | "inverseSecondary" | "inverseOutline";
        disabled: boolean;
        unClickable: boolean;
        containsIcon: boolean;
        size: "small" | "medium";
        ButtonWrapper: undefined;
    };
}
export default Button;
