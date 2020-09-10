import React, { ReactNode, useState, ReactElement, PropsWithChildren, useMemo, useEffect, useRef, TouchEvent } from 'react'
import { moveTo } from '../../utils/js/dom'
import styled from 'styled-components'
import { AnimationType, WrapperProps } from './types'
import Radio from '../radio'
import { color } from '../shared/styles'

interface TransitionType extends AnimationType {
  delay: number;
  width: number
}

const Transition = styled.div<TransitionType>`
	${(props) =>
		!props.animatein &&
		props.direction === "left" &&
		`
		transform: translateX(${props.width}px);
		`
  }
	${(props) =>
		!props.animatein &&
		props.direction === "right" &&
		`
		transform: translateX(-${props.width}px);
		`
  }
	${(props) =>
		props.animatein &&
		props.direction === "left" &&
		`
		transform: translateX(0);
			transition: all ${props.delay / 1000}s ease;
		`
  }
	${(props) =>
		props.animatein &&
		props.direction === "right" &&
		`
		transform: translateX(0);
		transition: all ${props.delay / 1000}s ease;
		`
  }
`

const Wrapper = styled.div<WrapperProps>`
  box-shadow: ${props => props.viewportBoxShadow};
  padding: 10px;
  border-radius: 5px;
`

function currentSetMap (current: number, map: [number, number, number]): [number, number, number]{
  let mid = map[1]
  if (mid === current) {
    return map
  } else if (mid < current) {
    return [mid, current, -1]
  } else {
    return [-1, current, mid]
  }
}

function mapToState (
  map: [number, number, number],
  children: ReactNode,
  totalLength: number
) {
  if (totalLength <= 1) {
    return [null, children, null]
  } else {
    return map.map(v => {
      if (v === -1) {
        return null
      } else {
        const child = children as ReactElement[]
        return child[v]
      }
    })
  }
}

export function Carousel (props: PropsWithChildren<CarouselProps>) {
  const { viewportBoxShadow, defaultIndex, height, autoplay, delay, animationDelay, autoplayDelay, autoplayReverse, radioAppear, touchDiff } = props

  // 设置需要展示的元素
  const [state, setState] = useState<ReactNode[]>([])

  // 设置显示元素
  const [indexMap, setIndexMap] = useState<[number, number, number]>([
    -1, -1, -1
  ])

  // 设置方向
  const [animation, setAnimation] = useState<AnimationType>({
    animatein: true,
    direction: ""
  })

  // 设置宽度
  const [bound, setBound] = useState<DOMRect>()

  // 
  const totalLength = useMemo(() => {
    let len: number
    // 如果children是个数组
    if (props.children instanceof Array) {
      len = props.children.length
    } else {
      len = 1
    }
    return len
  }, [props.children])

  useMemo(() => {
    let map: [number, number, number] = [-1, -1, -1]
    map[1] = defaultIndex!
    let res = mapToState(map, props.children, totalLength)
    setState(res)
    setIndexMap(map)
  }, [defaultIndex, props.children, totalLength])

  useEffect(() => {
    let child = props.children as ReactElement[]
    let timer: number
    if (child) {
      let tmp = indexMap.map(item => {
        return item !== -1 ? child[item] : null
      })
      let flag: boolean
      setState(tmp)

      if (indexMap[0] === -1 && indexMap[2] === -1) {
				//首轮
				return;
			} else if (indexMap[0] === -1) {
				flag = true;
				setAnimation({ animatein: false, direction: "right" });
			} else {
				flag = false;
				setAnimation({ animatein: false, direction: "left" });
			}
			timer = window.setTimeout(() => {
				if (flag) {
					setAnimation({ animatein: true, direction: "right" });
				} else {
					setAnimation({ animatein: true, direction: "left" });
				}
      }, delay!)
    }
    return () => window.clearTimeout(timer)
  }, [delay, indexMap, props.children])

  const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const setBoundFunc = () => {
			if (ref.current) {
				let bounds = ref.current.getBoundingClientRect()
				setBound(bounds)
			}
		};
		setBoundFunc();
		const resizeFunc= () => {
			setBoundFunc()
		};
		window.addEventListener("resize", resizeFunc);
		return () => {
			window.removeEventListener("resize", resizeFunc);
		}
  }, [])

  useEffect(() => {
    let timer: number
    if (autoplay) {
      timer = window.setTimeout(() => {
        moveTo(!autoplayReverse!, totalLength, indexMap, setIndexMap, currentSetMap)
      }, autoplayDelay)
    }

    return () => clearTimeout(timer)

  }, [autoplay, autoplayDelay, indexMap, totalLength, autoplayReverse])

  // 兼容移动端
  const [start, setStart] = useState(0)
  const touchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStart(e.touches[0].clientX)
  }
  const touchEnd = (e: TouchEvent<HTMLDivElement>) => {
    let end = e.changedTouches[0].clientX;
		let val = end - start;
		let abs = Math.abs(val);
		if (abs > touchDiff!) {
			//说明可以进一步判断
			if (val > 0) {
				//从左往右 向左翻
				moveTo(false, totalLength, indexMap, setIndexMap, currentSetMap);
			} else {
				moveTo(true, totalLength, indexMap, setIndexMap, currentSetMap);
			}
		}
  }
  
  return (
    <Wrapper 
      ref={ref}
      // style={style}
			className='viewport'
			viewportBoxShadow={viewportBoxShadow!}
    >
      <div
        className="viewport"
        style={{ width: '100%', height: `${height}px`, overflow: "hidden", position: "relative" }}
        onTouchStart={touchStart}
				onTouchEnd={touchEnd}
      >
        <Transition
          animatein={animation.animatein}
          direction={animation.direction}
          delay={animationDelay!}
          width={bound?.width!}
        >
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              width: `${bound?.width! * 3}px`,
              left: `${-bound?.width!}px`
            }}
          >
            {
              state.map((item, index) => {
                return <div
                  key={index}
                  style={{
                    height: `${height!}px`,
                    width: `${bound?.width}px`
                  }}
                >
                  {item}
                </div>
              })
            }
          </div>
        </Transition>
      </div>
      <ul
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{new Array(totalLength).fill(1).map((x, y) => {
					return (
						<Radio
              appearance={radioAppear}
							label=""
							key={y}
							hideLabel
							value={0}
							checked={y === indexMap[1]}
							onChange={() => {}}
							onClick={() => {
								let newMap = currentSetMap(y, indexMap);
								setIndexMap(newMap);
							}}
						/>
					);
				})}
			</ul>
    </Wrapper>
  )
}

Carousel.defaultProps = {
	defaultIndex: 0,
	delay: 100,
	height: 200,
	autoplay: false,
  autoplayDelay: 5000,
  animationDelay: 500,
  touchDiff: 100
}

type CarouselProps = WrapperProps & {
  /** 默认索引 */
  defaultIndex?: number;
  /** 轮播图高度 */
	height?: number;
	/** 是否自动播放 */
	autoplay: boolean;
	/** 自动播放延迟 */
	autoplayDelay: number;
	/** 翻页动画延迟 */
  delay?: number;
  /**  动画速度 1000是1秒 */
  animationDelay?: number;
  /**自动播放时是否反向播放 */
  autoplayReverse?: boolean;
  /** radio color */
  radioAppear?: keyof typeof color;
  /** 手势滑动距离差值 */
  touchDiff: number;
}
