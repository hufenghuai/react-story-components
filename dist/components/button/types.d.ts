import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";
declare type btnType = "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "tertiary" | "outline" | "inversePrimary" | "inverseSecondary" | "inverseOutline";
declare type AppearancesObj = {
    [key in btnType]: btnType;
};
export declare const APPEARANCES: AppearancesObj;
export declare type AppearancesType = keyof typeof APPEARANCES;
declare type sizeType = 'small' | 'medium';
export declare type sizeObj = {
    [key in sizeType]: sizeType;
};
export declare const SIZES: sizeObj;
export declare type SizeTypes = keyof typeof SIZES;
export interface CustomButtonProps {
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否加载中 */
    isLoading?: boolean;
    /** 是否是a标签 */
    link?: boolean;
    /** 是否替换加载中的文本 */
    loadingText?: ReactNode;
    /** 按钮大小 */
    size?: SizeTypes;
    /** 按钮类型 */
    appearance?: AppearancesType;
    /** 无效点击 */
    unClickable?: boolean;
}
export declare type ButtonProps = CustomButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLAnchorElement>;
export {};
