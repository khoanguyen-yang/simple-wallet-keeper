import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = React.memo((props: ButtonProps) => {
  const { text, ...restProps } = props;

  return (
    <button
      {...restProps}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
});

export default Button;
