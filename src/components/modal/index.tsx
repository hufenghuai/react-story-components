import React, { PropsWithChildren, useState, useMemo, ReactNode, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CSSProperties } from 'styled-components'
import { ModalWrapper, ModalViewport, TitleWrapper, CloseBtn, ChildrenWrapper, ConfirmWrapper, ModalMask } from './components'
import Button from '../button'
import { Icon } from '../icon'

export interface ModalProps {
  /** 父组件用来控制的状态 */
	visible: boolean;
	/** 容器位置 */
	container?: Element;
	/** 父组件setState */
	parentSetState: (v: boolean) => void;
	/** 弹出框标题 */
	title?: ReactNode;
	/** 是否有确认按钮 */
	confirm?: boolean;
	/** 改变确认按钮文本*/
	okText?: string;
	/** 改变取消按钮文本*/
	cancelText?: string;
	/** 点了确认的回调，如果传了，需要自行处理关闭 */
	onOk?: (set:(v: boolean) => void) => void;
	/** 点了取消的回调，如果传了，需要自行处理关闭*/
	onCancel?: (set:(v: boolean) => void) => void;
	/** 点确认或者取消都会走的回调 */
	callback?: (v: boolean) => void;
	/** 点击mask是否关闭模态框 */
	maskClose?: boolean;
	/** 是否有mask */
	mask?: boolean;
	/** 自定义模态框位置 */
	style?: CSSProperties;
	/** 是否有右上角关闭按钮 */
	closeButton?: boolean;
	/** 动画时间 */
	delay?: number;
	/** 是否停止滚动*/
	stopScroll?: boolean;
	/** portalStyle*/
	portalStyle?: CSSProperties;
	/** portal的回调 */
	refCallback?: (ref: HTMLDivElement) => void;
	/** 没点确认于取消，直接关闭的回调 */
	closeCallback?: () => void;
}

export function useStateAnimation (
  parentSetState: (v: boolean) => void, // 父组件修改显示隐藏的方法
  delay: number
): [boolean, (v: boolean) => void, () => void] {
  const [state, setState] = useState(true)

  const [innerClose, unmount] = useMemo(() => {
    let timer: number
    let innerClose = (v: boolean) => {
      setState(v)
      timer = window.setTimeout(() => {
        parentSetState(v)
        setState(true)
      }, delay)
    }

    let unmount = () => window.clearTimeout(timer)

    return [innerClose, unmount]
  }, [setState, parentSetState, delay])

  return [state, innerClose, unmount]
}

// 制作个停止滚动的hooks，在modal开启后，如果还能滚动就会显得很怪异，antd的modal打开后就不会滚动，所以我们写个自定义hook解决 modal 打开后背后的 body 不允许滚动
export function useStopScroll (state: boolean, delay: number, open?: boolean) {
  if (open) {
    const width = window.innerWidth - document.body.clientWidth
    if (state) {
      document.body.style.overflow = 'hidden'
      document.body.style.width = `calc(100% - ${width}px)`
    } else {
      //等动画渲染
			const timer = setTimeout(() => {
				document.body.style.overflow = "auto"
        document.body.style.width = `100%`
        clearTimeout(timer)
			}, delay)
    }
  }
} 

export function Modal (props: PropsWithChildren<ModalProps>) {
  const {
    visible,
		maskClose,
		closeButton,
		delay,
		mask,
		container,
		confirm,
		okText,
		style,
		cancelText,
		onOk,
		onCancel,
		callback,
		title,
		parentSetState,
		stopScroll,
		portalStyle,
		refCallback,
		closeCallback,
  } = props
  
  const ref = useRef<HTMLDivElement>(null);

	const [state, setState, unmount] = useStateAnimation(parentSetState, delay!);

	const render = useMemo(() => {
		if (!visible) {
			unmount();
			return null;
		} else {
			return createPortal(
				<ModalWrapper ref={ref} style={portalStyle}>
					<ModalViewport style={style} visible={state} delay={delay!}>
						<div>
							{title && <TitleWrapper>{title}</TitleWrapper>}
							{closeButton && (
								<CloseBtn>
									<Button
										style={{
											background: "white",
											borderRadius: "5px",
											padding: "5px",
										}}
										onClick={() => {
											setState(false);
											if (closeCallback) closeCallback();
										}}
									>
										<Icon icon="closeAlt"></Icon>
									</Button>
								</CloseBtn>
							)}
						</div>
						{<ChildrenWrapper>{props.children}</ChildrenWrapper>}
						{confirm && (
							<ConfirmWrapper>
								<Button
									appearance="secondary"
									onClick={() => {
										onOk ? onOk(setState) : setState(false);
										if (callback) callback(true);
									}}
								>
									{okText ? okText : "确认"}
								</Button>
								<Button
									appearance="secondary"
									onClick={() => {
										onCancel ? onCancel(setState) : setState(false);
										if (callback) callback(false);
									}}
									style={{ marginLeft: "10px" }}
								>
									{cancelText ? cancelText : "取消"}
								</Button>
							</ConfirmWrapper>
						)}
					</ModalViewport>
					{mask && (
						<ModalMask
							onClick={() => {
								if (maskClose) {
									setState(false);
									if (closeCallback) {
										closeCallback();
									}
								}
							}}
						></ModalMask>
					)}
				</ModalWrapper>,
				container!
			);
		}
	}, [
		callback,
		cancelText,
		closeButton,
		closeCallback,
		confirm,
		container,
		mask,
		maskClose,
		okText,
		onCancel,
		onOk,
		portalStyle,
		props.children,
		setState,
		style,
		title,
		state,
		visible,
		delay,
		unmount,
	]);
	useStopScroll(visible!, 300, stopScroll!);
	useEffect(() => {
		if (refCallback && ref.current) {
			refCallback(ref.current);
		}
	}, [refCallback]);
	return <>{render}</>;
}

Modal.defaultProps = {
  visible: false,
  container: window.document.body,
  confirm: true,
  title: "标题",
  maskClose: true,
  mask: true,
  closeButton: true,
  delay: 200,
  stopScroll: true,
  btnSize: "default"
}
