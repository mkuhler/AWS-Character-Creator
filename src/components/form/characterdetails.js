import React from 'react';


class CharacterDetails extends React.Component{


  render() {
     if (this.props.currentStep !== 1){
       return null
     }
     console.log(this.props.charSheet.name);
     return(
       <form onSubmit={this.props.nextStep}>
         <label>{this.props.charSheet.name}</label>
         <input type='text' onChange={this.props.updateCharsheet}/>

         <input type='submit' value='Next'/>
       </form>

     )}
 };


}
