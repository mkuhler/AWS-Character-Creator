import React from 'react';


class CharacterDetails extends React.Component{



  render() {
    const {state} = this.props;
     return(

       <h1>{this.state.data.basic_info.name} </h1>
     );

     }


}

export default CharacterDetails;
