import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import './cat-list.css';


class CatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      catList: [], // example of an item object: {catName: '', catAge: ''}
      showNewField: true
    };
  }

  generateKey(maximum, minimum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  handleChangeOfCatDataFactory = (type, itemIndex, generateKey) => (event) => {
    const catData = event.target.value;

    this.setState((prevState) => {
      const newCatList = [...prevState.catList];

      newCatList[itemIndex] = {
        ...prevState.catList[itemIndex],
        generateKey: generateKey,
        [type]: catData,
      };

      const showNewField = this.shouldCreateAdditionalFields(newCatList);

      return {
        ...prevState,
        catList: newCatList,
        showNewField,
      };
    });
  }

  renderList() {
    const {
      catList,
      showNewField,
    } = this.state;

    const nextIndex = catList.length;

    const listOfCustomHeaderField = catList.map((cat, index) => [
      <React.Fragment key={cat.generateKey}>
        <div className="Rtable-cell">
          <input
            type="text"
            value={this.getCatDataSafely(index, 'catName')}
            onChange={this.handleChangeOfCatDataFactory('catName', index, cat.generateKey)} 
          />
        </div>
        <div className="Rtable-cell">
          <input
            type="text"
            value={this.getCatDataSafely(index, 'catAge')}
            onChange={this.handleChangeOfCatDataFactory('catAge', index, cat.generateKey)}
          />
            <FontAwesomeIcon icon={faMinusCircle} className="icon-delete-wrapper" onClick={() => this.deleteCustomHeader(index)} />
        </div>
      </React.Fragment>
    ]);

    // do we need to add additional new empty row?
    if (showNewField) {
      const generateKey = this.generateKey(1, 100000);

      listOfCustomHeaderField.push([
        <React.Fragment key={generateKey}>
          <div className="Rtable-cell">
            <input
              type="text"
              value={this.getCatDataSafely(nextIndex, 'catName')}
              onChange={this.handleChangeOfCatDataFactory('catName', nextIndex, generateKey)}
              placeholder="Enter a cat name"
            />
          </div>
          <div className="Rtable-cell">
            <input
              type="text"
              value={this.getCatDataSafely(nextIndex, 'catAge')}
              onChange={this.handleChangeOfCatDataFactory('catAge', nextIndex, generateKey)}
              placeholder="Enter a cat age"
            />
          </div>
        </React.Fragment>
      ]);
    }

    return listOfCustomHeaderField;
  }

  shouldCreateAdditionalFields(catList) {
    return !catList.find((catData) => (
      !catData.catAge || !catData.catName)
    );
  }
  
  getCatDataSafely(index, keyToCheck) {
    const {
      catList,
    } = this.state;

    return (catList[index]) ? catList[index][keyToCheck] : '';
  }

  deleteCustomHeader(byIndexId) {
    const {
      catList,
    } = this.state;

    const newArray = [...catList];

    newArray.splice(byIndexId, 1);

    this.setState({
      catList: newArray,
    });
  }

  render() {

    return (
      <div className="row custom-headers Rtable Rtable--2cols">
        <div className="Rtable-cell">Cat Name</div>
        <div className="Rtable-cell">Cat Age</div>

        {this.renderList()}
      </div>
    );
  }
}

export default CatList;
