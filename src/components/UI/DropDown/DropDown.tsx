import { ChangeEvent, useState } from 'react'
import classes from './DropDown.module.css'

const DropDown = ({
  choices,
  onChange,
}: {
  choices: Array<string>
  onChange?: (event: string) => void
}) => {
  const [track, setTrack] = useState(choices[0])

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setTrack(event.target.value)
    if (onChange) {
      onChange(event.target.value)
    }
  }

  let key = 0
  return (
    <div>
      <select
        className={classes.select}
        value={track}
        onChange={onChangeHandler}
      >
        {choices.map((choice) => (
          <option key={key++}>{choice}</option>
        ))}
      </select>
    </div>
  )
}

export default DropDown
