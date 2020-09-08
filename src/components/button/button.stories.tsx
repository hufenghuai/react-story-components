import React from 'react'
import Button from './index'
import { APPEARANCES, AppearancesType, SIZES, SizeTypes } from './types'
import {
	withKnobs,
	text,
	boolean,
	select,
} from "@storybook/addon-knobs"

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs]
}

export const knobsBtn = () => (
  <Button
    size={select<SizeTypes>("size", SIZES, SIZES.medium)}
    href={text("hrefText", "")}
    link={boolean("link", false)}
    loadingText={text("loadingText", "I AM isLoading")}
    isLoading={boolean("isLoading", false)}
    disabled={boolean("disabled", false)}
    appearance={select<AppearancesType>(
      "APPEARANCES",
      APPEARANCES,
      APPEARANCES.primary
    )}
  >
    {text("childrenText", "Hello Storybook")}
  </Button>
)

export const buttons = () => (
	<>
		<Button appearance="primary">Primary</Button>
		<Button appearance="secondary">Secondary</Button>
		<Button appearance="tertiary">Tertiary</Button>
		<Button appearance="outline">Outline</Button>
		<Button appearance="primaryOutline">Outline primary</Button>
		<Button appearance="secondaryOutline">Outline secondary</Button>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inversePrimary">Primary inverse</Button>
		</div>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inverseSecondary">Secondary inverse</Button>
		</div>
		<div style={{ background: "grey", display: "inline-block" }}>
			<Button appearance="inverseOutline">Outline inverse</Button>
		</div>
	</>
)

export const sizes = () => (
	<>
		<Button appearance="primary">Default</Button>
		<Button appearance="primary" size="small">
			Small
		</Button>
	</>
)

export const isLoading = () => (
	<>
		<Button appearance="primary" isLoading>
			Primary
		</Button>
		<Button appearance="secondary" isLoading>
			Secondary
		</Button>
		<Button appearance="tertiary" isLoading>
			Tertiary
		</Button>
		<Button appearance="outline" isLoading>
			Outline
		</Button>
		<Button appearance="outline" isLoading loadingText="Custom...">
			Outline
		</Button>
	</>
)

export const disabled = () => (
	<>
		<Button appearance="primary" disabled>
			Primary
		</Button>
		<Button appearance="secondary" disabled>
			Secondary
		</Button>
		<Button appearance="tertiary" disabled>
			Tertiary
		</Button>
		<Button appearance="outline" disabled>
			Outline
		</Button>
	</>
)

export const link = () => (
	<>
		<Button appearance="primary" link href="/">
			Primary
		</Button>
		<Button appearance="secondary" link href="/">
			Secondary
		</Button>
		<Button appearance="tertiary" link href="/">
			Tertiary
		</Button>
		<Button appearance="outline" link href="/">
			Outline
		</Button>
	</>
)
