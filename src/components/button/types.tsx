import { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react"

type btnType = | "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "tertiary"
  | "outline"
  | "inversePrimary"
  | "inverseSecondary"
  | "inverseOutline"


// keyof 可以把一个交叉类型变成对应的联合类型
type AppearancesObj = { // 把联合类型 btnType 变成 交叉类型
    [key in btnType]: btnType;
}

export const APPEARANCES: AppearancesObj = {
	primary: "primary",
	primaryOutline: "primaryOutline",
	secondary: "secondary",
	secondaryOutline: "secondaryOutline",
	tertiary: "tertiary",
	outline: "outline",
	inversePrimary: "inversePrimary",
	inverseSecondary: "inverseSecondary",
	inverseOutline: "inverseOutline",
}

export type AppearancesType = keyof typeof APPEARANCES

type sizeType = 'small' | 'medium'

export type sizeObj = {
  [key in sizeType]: sizeType
}

export const SIZES: sizeObj = {
  small: 'small',
  medium: 'medium'
}

export type SizeTypes = keyof typeof SIZES



// 对传入的接口定义  自定义属性必须导出，必须按此格式写注释，这种写法会被dockgen插件捕获从而显示到属性页面上。

export interface CustomButtonProps {
    /** 是否禁用 */
    disabled?: boolean
    /** 是否加载中 */
    isLoading?: boolean
    /** 是否是a标签 */
    link?: boolean
    /** 是否替换加载中的文本 */
    loadingText?: ReactNode
    /** 按钮大小 */
    size?: SizeTypes
    /** 按钮类型 */
    appearance?: AppearancesType
    /** 无效点击 */
    unClickable?: boolean
  }
  
  export type ButtonProps = CustomButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLAnchorElement>
