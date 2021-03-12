import React from 'react';
import CharacterDetails from './characterdetails.js';
import {Button, Form, Col, Figure} from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import charsheet from './CharSheetData.js';
import { lengthy_entry, get_ellispis } from './FontFunctions.js';
import { shield, attack_information, intitive } from './encodebase64.js';
import FileSaver from 'file-saver';
import axios from 'axios';
import { parse } from '../../../node_modules/querystring/index.js';


export default class UploadButton extends React.Component{

  render(){
    return(
      <div className="fileUpload">
        <h1> HELLO! </h1>
        <input type="file" name="file" onChange={this.props.onChange} />
      </div>

    );
    }
}
