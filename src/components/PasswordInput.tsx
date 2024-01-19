import React from 'react';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

const PasswordInput = React.memo((props: PasswordInputProps) => {
  const { label, value, onValueChange, ...restProps } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div>
      <div className="mb-px-1 text-sm text-gray-600">{label}</div>
      <input
        {...restProps}
        placeholder="Input your password"
        type="password"
        className="text-md block px-3 py-2 rounded-lg w-full 
        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default PasswordInput;
