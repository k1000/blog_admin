//yourcomponent.tsx
import { createElement, StatelessProps } from 'tsx-create-element';

interface YourProps {
  yourText: string;
}

export const YourComponent = (props: StatelessProps<YourProps>) => {
  return <div>{props.yourText}</div>;
};
