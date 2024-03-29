import { useEffect, useState } from 'react'
import { Participant, StatusEnum } from '../types/Participant'
import { tracks } from '../../../common/types/tracks'
import classes from './AllPars.module.css'
import ParItem from './ParItem'
import InputBar from '../../../common/components/InputBar/InputBar'
import DropDown from '../../../common/components/DropDown/DropDown'
import { useAppDispatch, useAppSelector } from '../../../app/typings'
import {
  participantSelected,
  selectAllParticipants,
  selectChosenParticipantId,
} from '../participantSlice'

const AllPars = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectAllParticipants)
  const chosenParId = useAppSelector(selectChosenParticipantId)

  const [filteredData, setFilteredData] = useState<Participant[]>(data)
  const [chosenTrack, setChosenTrack] = useState<string>('All')
  const [search, setSearch] = useState<string>('')
  const [parState, setParState] = useState<string>('All')

  const onChoose = (id: string) => {
    dispatch(participantSelected(id))
  }

  let output

  useEffect(() => {
    if (chosenTrack === 'All' && parState === 'All') {
      setFilteredData(data)
    } else if (chosenTrack === 'All' && parState !== 'All') {
      setFilteredData(data.filter((par) => par.acceptanceStatus === parState))
    } else if (chosenTrack !== 'All' && parState === 'All') {
      setFilteredData(data.filter((par) => par.firstPreference === chosenTrack))
    } else if (chosenTrack !== 'All' && parState !== 'All') {
      setFilteredData(
        data.filter(
          (par) =>
            par.firstPreference === chosenTrack &&
            par.acceptanceStatus === parState
        )
      )
    }
  }, [chosenTrack, parState, data])

  const filt = (par: Participant, entry: 'phone' | 'name', input: string) => {
    if (entry === 'name') {
      return (
        par.name.toLowerCase().includes(input.toLowerCase()) &&
        (chosenTrack === 'All' || par.firstPreference === chosenTrack) &&
        (parState === 'All' || par.acceptanceStatus === parState)
      )
    }

    if (entry === 'phone') {
      return (
        par.phone.includes(input) &&
        (chosenTrack === 'All' || par.firstPreference === chosenTrack) &&
        (parState === 'All' || par.acceptanceStatus === parState)
      )
    }
  }

  const onTrackChangeHandler = (track: string) => {
    if (track === 'All') {
      setChosenTrack('All')
    } else {
      setChosenTrack(track)
    }
    setSearch('')
  }

  const onSearchHandler = (input: string) => {
    setSearch(input)
    if (!isNaN(parseInt(input))) {
      setFilteredData(data.filter((par) => filt(par, 'phone', input)))
    } else {
      setFilteredData(data.filter((par) => filt(par, 'name', input)))
    }
  }

  const onStateChangeHandler = (state: string) => {
    if (state === 'All') {
      setParState('All')
    } else {
      setParState(state)
    }
    setSearch('')
  }

  if (data[0]) {
    output = (
      <div>
        <div className={classes['sidebar-header']}>
          <InputBar
            type="text"
            placeholder="Phone or Name"
            onChange={onSearchHandler}
            value={search}
          />
          <DropDown choices={tracks} onChange={onTrackChangeHandler} />
          <DropDown
            choices={['All', ...Object.values(StatusEnum)]}
            onChange={onStateChangeHandler}
          />
          <p className={classes['total']}>
            Total: {filteredData.length} Participant
          </p>
        </div>
        {filteredData.map((item) => (
          <ParItem
            key={item._id}
            name={item.name}
            onChoose={onChoose.bind(null, item._id)}
            chosen={chosenParId === item._id}
          />
        ))}
      </div>
    )
  }
  return <div className={classes['all-pars']}>{output}</div>
}

export default AllPars
