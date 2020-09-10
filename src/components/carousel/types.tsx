import { Interface } from "readline";

export interface AnimationType {
  animatein: boolean;
  direction: '' | 'left' | 'right';
}

export interface WrapperProps {
  viewportBoxShadow: string;
}