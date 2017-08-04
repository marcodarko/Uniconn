import React from 'react';
import geolib from 'geolib';
import FaveBox from './FaveBox';
import UnblockAllButton from './UnblockAllButton';
import DeleteAccountButton from './DeleteAccountButton';
import UpdateLocationButton from './UpdateLocationButton';
import Modal from 'react-awesome-modal';
import axios from 'axios';

export default class LocationBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
            visible : false,
            description:'',
            message:''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getDescription = this.getDescription.bind(this);
        this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);
  }

  getDescription(e){
    this.setState({
      description: e.target.value.trim()
    });
  }

  handleDescriptionSubmit(e){
    e.preventDefault();
    document.getElementById('textarea').value=''; 
    axios.put('/api/user-description/'+this.props.user._id, {description: this.state.description}).then(res=>{
      this.setState({
        message:'Update Successful'
      })
      this.props.updateUser();
    }).catch(err=>{
      this.setState({
        message:'Update Failed'
      })
    });
  }

  openModal() {
        this.setState({
            visible : true
        });
    }
 
  closeModal() {
        this.setState({
            visible : false
        });
  }

  render() {

    return (
     <div className="panel panel-default col-sm-12 col-m-12 col-lg-12 rainPurple2 noBorder whiteText clearBoth" style={{margin:'0px'}}>
	    <div className="panel-body text-center ">
	    	{!this.props.user.name && <h4 className="heartbeat whiteText">Log in to start</h4>}
	  		{this.props.user.name && 
	  		<div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 rainGreen  text-center purpleText" style={{borderRadius:'10px', padding:'10px', marginBottom:'10px'}}>
	  			<img className="jello-horizontal" id="profilePhoto" src={this.props.user.photo || './images/default.png'} alt="user photo"/>
          <br/>
          <span style={{fontSize:'12px', color:'hotpink'}}>Public Information</span> <br/>
          <table className="table themeTable">
            <tbody>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.name}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.age} yrs old
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-stats" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.weight} lbs, {this.props.user.height} ft. 
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.identity}, {this.props.user.relationship}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-phone" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.herefor}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.friends.length} friends
                </td>
              </tr>
            </tbody>
          </table>
          
          <span style={{fontSize:'12px', color:'violet'}}>Private Information</span> <br/>
          <table className="table themeTablePrivate">
            <tbody>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.email}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                </td>
                <td>
                  {this.props.user.latitude}, {this.props.user.longitude}
                </td>
              </tr>              
            </tbody>
          </table>
          <hr/>
  				<div className="rainOrange" style={{borderRadius:'10px', marginTop:'10px', border:'2px white solid', padding:'10px'}}>
  				<span style={{fontSize:'12px', color:'white'}}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</span> 
          <br/>				
          <input type="button" className="btn loginButton" value="Edit Info" onClick={this.openModal} />
          <Modal visible={this.state.visible} width="500px" height="600px" effect="fadeInUp" onClickAway={() => this.closeModal()} style={{backgroundColor:'hotpink'}}>
              <div style={{padding:'10px'}} >
                  <h5 className="purpleText"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Edit Personal Info</h5>
                  <br/>
                  <div className='form-group'>
                    <form onSubmit={this.handleDescriptionSubmit}>
                      <textarea id="textarea" onChange={this.getDescription} rows="4" maxLength='130' placeholder={this.props.user.description || 'Type Here...'} style={{margin:'auto'}} type="text" className="form-control themeInput"></textarea>
                      {this.state.description && <button type='submit' className='btn connButton'><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Save</button>}
                    </form>
                    <span className="whiteText">{this.state.message}</span>
                  </div>
                  <hr/>
                  <h5 className="purpleText"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Uniconn Settings</h5>
                  <br/>
                  <UnblockAllButton ID={this.props.user._id}/>
                  <br/>
                  <UpdateLocationButton ID={this.props.user._id}/>
                  <br/>
                  <DeleteAccountButton ID={this.props.user._id} user={this.props.user}/>
                  <br/>
                  <hr/>
                  <button className="btn loginButton" onClick={() => this.closeModal()}>close</button>
              </div>
          </Modal>
          </div>
	  		</div>}

	  		{this.props.user.name && <FaveBox user={this.props.user} updateUser={this.props.updateUser}/>}	
		</div>
	</div>
    );
  }
}
