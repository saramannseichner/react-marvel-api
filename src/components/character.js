import React from "react";
import "./character.css";


class Character extends React.Component {
  handleClick = () => {
    this.props.selectCharacter(this.props.character);
  }
  render () {
    const title = this.props.character.name

    const style = {
      backgroundImage: `url('${this.props.character.thumbnail.path+'.'+ this.props.character.thumbnail.extension}')`
    };

    return (
      <div className="character" onClick={this.handleClick}>
        <div className="character-picture" style={style}> </div>
        <div className="character-name">
          {title}
        </div>
      </div>
    );
  }
}

export default Character;
