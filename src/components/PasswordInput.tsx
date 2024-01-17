import React from 'react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = React.memo((props: PasswordInputProps) => {
  const { label, value } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div>
      <span className="px-1 text-sm text-gray-600">{label}</span>
      <input
        placeholder="Input your password"
        type="password"
        className="text-md block px-3 py-2  rounded-lg w-full 
bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default PasswordInput;
