import React from 'react';
import moment from 'moment';

export type TimezoneClock = {
  name: string;
  offset: number;
};

type ClockListProps = {
  clocks: TimezoneClock[];
  removeClock: (index: number) => void;
};

type ClockListState = {
  currentTime: moment.Moment;
};

export default class ClockList extends React.Component<ClockListProps, ClockListState> {
  timerID?: number;

  constructor(props: ClockListProps) {
    super(props);
    this.state = {
      currentTime: moment()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick = () => {
    this.setState({
      currentTime: moment()
    });
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getFormattedTime = (offset: number) => {
    return this.state.currentTime.clone().utc().add(offset, 'hours').format('HH:mm:ss');
  };

  render() {
    const { clocks, removeClock } = this.props;
    return (
      <div className='clock-list'>
        {clocks.map((clock, index) => (
          <div key={index} className='clock'>
            <div className='clock-name'>{clock.name}</div>
            <div className='clock-time'>{this.getFormattedTime(clock.offset)}</div>
            <div className='clock-close' onClick={() => removeClock(index)}>X</div>
          </div>
        ))}
      </div>
    );
  }
}
