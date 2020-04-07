import React ,{useState}from 'react'
import PropTypes from 'prop-types'
import { Document, Page } from "react-pdf";
const ProfileCV = ({profile:{CV,user:{name}}}) => {
    const [state, setState] = useState( {numPages: null, pageNumber: 1});
  const  onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      };
      const {
        numPages,
      
        pageNumber
       
    } = state;
     const  goToPrevPage = () =>
       setState(state => ({ pageNumber: state.pageNumber - 1 }));
    const  goToNextPage = () =>
      setState(state => ({ pageNumber: state.pageNumber + 1 }));
    
    return (
        <div>
        <nav>
          <button onClick={()=>goToPrevPage()}>Prev</button>
          <button onClick={()=>goToNextPage()}>Next</button>
        </nav>
        <h2>{name}'s CV</h2>
        <div style={{ width: 600 }}>
            
          <Document
            file={CV && {CV}}
            onLoadSuccess={(e)=>onDocumentLoadSuccess(e)}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
}

ProfileCV.propTypes = {
    profile: PropTypes.object.isRequired,

}

export default ProfileCV
