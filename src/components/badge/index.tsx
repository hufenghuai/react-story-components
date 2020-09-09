import React, { PropsWithChildren, HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { typography } from '../shared/styles'
import { badgeColor, badgeBackground } from './config'
import { statusObj, StatusRange } from './types'

// Controls 里面的文档说明必须要在 类文件 导出 比如 export function Badge
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** 状态色 */
  status?: StatusRange
}

const BadgeWrapper = styled.div<BadgeProps>`
	display: inline-block;
	vertical-align: top;
	font-size: 11px;
	line-height: 12px;
	padding: 4px 12px;
	border-radius: 3em;
	font-weight: ${typography.weight.bold};

	svg {
		height: 12px;
		width: 12px;
		margin-right: 4px;
		margin-top: -2px;
	}

	${(props) =>
		props.status === statusObj.positive &&
		css`
			color: ${badgeColor.positive};
			background: ${badgeBackground.positive};
		`};

	${(props) =>
		props.status === statusObj.negative &&
		css`
			color: ${badgeColor.negative};
			background: ${badgeBackground.negative};
		`};

	${(props) =>
		props.status === statusObj.warning &&
		css`
			color: ${badgeColor.warning};
			background: ${badgeBackground.warning};
		`};

	${(props) =>
		props.status === statusObj.error &&
		css`
			color: ${badgeColor.error};
			background: ${badgeBackground.error};
		`};

	${(props) =>
		props.status === statusObj.neutral &&
		css`
			color: ${badgeColor.neutral};
			background: ${badgeBackground.neutral};
		`};
`

export function Badge(props: PropsWithChildren<BadgeProps>) {
	return <BadgeWrapper {...props} />;
}

Badge.defaultProps = {
	status: "neutral",
}

export default Badge
