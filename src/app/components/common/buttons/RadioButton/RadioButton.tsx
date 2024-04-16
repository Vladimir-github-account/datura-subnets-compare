import React from 'react'
import classNames from 'classnames';

const RadioButton = ({
  name,
  id,
  value,
  onChange,
  checked,
  text
}: {
  name: string,
  id: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  checked: boolean,
  text: string
}) => {
  return (
    <label htmlFor={id} className="text-sm mr-2 cursor-pointer">
      <input
        className="m-0 invisible [&:checked+span]:border-primary [&:checked+span:after]:opacity-100"
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={classNames(
        'relative -left-2 top-1.5 cursor-pointer size-4 border border-primary rounded',
        'inline-block transition-all after:content-[\'\'] after:absolute after:top-1/2 after:left-1/2 after:h-3',
        'after:w-3 after:bg-primary after:opacity-0 after:rounded after:-translate-x-1/2 after:-translate-y-1/2',
      )} />
      {text}
    </label>
  )
}

export default RadioButton