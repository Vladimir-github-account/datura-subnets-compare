import React from 'react';
import RadioButton from '@/app/components/common/buttons/RadioButton/RadioButton';


export const RadioGroup = ({
  fields,
  selectedField,
  onChangeField
}: {
  fields: string[],
  selectedField: string,
  onChangeField: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className='min-w-72 p-3'>
      <p>Please select a field</p>
      <div className="grid gap-3">
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