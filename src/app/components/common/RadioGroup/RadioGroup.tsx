import React from 'react';
import classNames from 'classnames';
import RadioButton from '@/app/components/common/buttons/RadioButton/RadioButton';


export const RadioGroup = ({
  fields,
  selectedField,
  onChangeField,
  inline
}: {
  fields: string[],
  selectedField: string,
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void,
  inline?: boolean
}) => {
  return (
    <div className={classNames('min-w-[274px] pl-4 py-3', inline && 'flex flex-col  items-center pr-4')}>
      <p className='mb-2'>Please select a field</p>
      <div className={classNames('flex flex-col gap-3', inline && '!flex-row justify-between flex-wrap')}>
        {fields.map(field => (
          <RadioButton
            key={field}
            name={field}
            id={field}
            value={field}
            text={field}
            onChange={onChangeField}
            checked={selectedField === field}
          />
        ))}
      </div>
    </div>
  )
}