import React, {PropTypes} from 'react';
import Immutable, {List, Map} from 'immutable';
import './styles.scss';
import Tabs from 'components/Tabs';
import Tab from 'components/Tab';
import ThreadsList from 'components/ThreadsList';
import Search from 'components/Search';


export default class ThreadsSection extends React.Component {

  static propTypes = {
    channels: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(List).isRequired,
    setCurrentChannel: PropTypes.func.isRequired,
    local: PropTypes.instanceOf(Map).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      currentTabId: 2,
      filterData: '',
      filterText: '',
      oldData: '',
    };
  }


  componentDidMount = () => {
    const threadsWrapper = this.refs.threads.parentNode;
    threadsWrapper.style.overflowX = 'hidden';
  }


  shouldComponentUpdate = (nextProps, nextState) => {
    return !(
      Immutable.is(nextProps.channels, this.props.channels) &&
      Immutable.is(nextProps.contacts, this.props.contacts) &&
      Immutable.is(nextProps.local, this.props.local) &&
      Immutable.is(nextState.currentTabId, this.state.currentTabId) &&
      Immutable.is(nextState.filterData, this.state.filterData)
    );
  }

  changeTab = (tabId) => {
    this.setState({
      currentTabId: tabId,
    });
  };


  render() {
    const {channels, contacts, setCurrentChannel, local} = this.props;

    const tabs = List.of(
      Map({id: 1, name: 'People', sendToServer: false, list: contacts }),
      Map({id: 2, name: 'Channels', sendToServer: false, list: channels }),
    );

    const currentTabData = tabs.find(tab => tab.get('id') === this.state.currentTabId);

    const filter = (e) => {
      const filterText = e.target.value;

      if (!currentTabData.get('sendToServer')) {
        if (this.state.filterText !== '' && filterText === '') {
          this.setState({
            filterText: filterText,
            oldData: '',
          });
          this.setState({
            filterData: '',
          });
        } else {
          if (this.state.filterText === '' && filterText !== '') {
            this.setState({
              filterText: filterText,
              oldData: currentTabData.get('list'),
            });
            const items = currentTabData.get('list').filter((listItem) => {
              if (listItem.get('name').indexOf(filterText) !== -1) {
                return listItem;
              }
            });
            this.setState({
              filterData: items,
            });
          } else {
            this.setState({
              filterText: filterText,
            });
            const items = this.state.oldData.filter((listItem) => {
              if (listItem.get('name').indexOf(filterText) !== -1) {
                return listItem;
              }
            });
            this.setState({
              filterData: items,
            });
          }
        }
      }
    };

    return (
      <div className='threads' ref='threads'>
        <Tabs
          currentTabId={this.state.currentTabId}
          changeTab={this.changeTab}
        >
          <Tab id={1}>People</Tab>
          <Tab id={2}>Channels</Tab>
        </Tabs>

        <ThreadsList
          list={this.state.filterData ? this.state.filterData : currentTabData.get('list')}
          local={local}
          setCurrentChannel={setCurrentChannel}
          type={currentTabData.get('name')}
        />
        <Search currentData={currentTabData} filter={filter} sendToServer={false} className='threads__search' />
      </div>
    );
  }
}
