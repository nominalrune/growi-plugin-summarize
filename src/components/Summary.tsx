import { memo, ReactNode } from 'react';

export const Summary = memo((props: {children:ReactNode}): JSX.Element => {
  const { children } = props;
  console.log('plugin', children);

  return (
    children
      ? (
        <div key={children as string}>
          {children}
        </div>
      )
      : <div key={children as string} />
  );
});
Summary.displayName = 'Summary';
