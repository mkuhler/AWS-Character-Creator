import React from 'react';


class CharacterDetails extends React.Component{

//this.props.data.basic_info.name returns Madison

  render() {
      console.log(this.props.data.basic_info.name);
      return(
        <form onSubmit={this.props.nextStep}>
          <label>{this.props.data.basic_info.name}</label>
          <input type='text' onChange={this.props.updateCharacterSheet}/>

        <input type='submit' value='Next'/>
      </form>
      );

     }


}

export default CharacterDetails;
