import { useState } from 'react';
import ClockList, { TimezoneClock } from './Clocks';

const TimezoneClocks = () => {
  const [clocks, setClocks] = useState<TimezoneClock[]>([]);
  const [newClockName, setNewClockName] = useState('');
  const [newClockOffset, setNewClockOffset] = useState('');

  const addClock = () => {
    const offsetNum = parseFloat(newClockOffset);
    if (newClockName && !isNaN(offsetNum)) {
      setClocks([...clocks, { name: newClockName, offset: offsetNum }]);
      setNewClockName('');
      setNewClockOffset('');
    }
  };

  const removeClock = (index: number) => {
    setClocks(clocks.filter((_, i) => i !== index));
  };

  return (
    <div className='container'>
      <div>
        <label htmlFor="clockName">Название:</label>
        <input
          className='input-name'
          type="text"
          id="clockName"
          value={newClockName}
          onChange={(e) => setNewClockName(e.target.value)}
          placeholder="Название"
        />
        <label htmlFor="timezoneOffset">Смещение (часы):</label>
        <input
          className='input-tz'
          type="number"
          id="timezoneOffset"
          value={newClockOffset}
          onChange={(e) => setNewClockOffset(e.target.value)}
          placeholder="Смещение (часы)"
        />
        <button onClick={addClock}>Добавить</button>
      </div>
      <ClockList 
        clocks={clocks} 
        removeClock={removeClock} />
    </div>
  );
}

export default TimezoneClocks;
