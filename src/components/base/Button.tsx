import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = React.memo((props: ButtonProps) => {
  const { onClick, text } = props;

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
});

export default Button;
