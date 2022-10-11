import { useState } from 'react';
import RoomSelection from './peopleChat/index';
import MachineChat from './machineChat/index';
import '../sass/main.scss';

const SelectChatWay = () => {
  const [selectChatWay, setSelectChatWay] = useState('');

  const handleSelectClick = (e) => {
    setSelectChatWay(e.target.textContent);
  };

  return (
    <>
      {selectChatWay === '' && (
        <div className="start-container">
          <div onClick={handleSelectClick} className="start-box">
            Machine Chat
          </div>
          <div onClick={handleSelectClick} className="start-box">
            People Chat
          </div>
        </div>
      )}

      {selectChatWay === 'Machine Chat' && <MachineChat />}
      {selectChatWay === 'People Chat' && <RoomSelection />}
    </>
  );
};

export default SelectChatWay;
