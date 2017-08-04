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
          <span style={{fontSize:'12px', color:'white'}}>Public User Information</span> <br/>
          <h4 style={{color:'white', textShadow:"2px 2px 0px purple"}}> @{this.props.user.username}</h4>
	  			<span><strong><span className="textWhite">{this.props.user.name}, </span></strong><span>{this.props.user.identity}, </span><span>{this.props.user.age}</span></span><br/>
          <span><b>Height:</b> {this.props.user.height}, <b>Weight:</b> {this.props.user.weight}</span> <br/>
          <span><b>{this.props.user.friends.length}</b> friends</span> <br/> 			
          <span><b>Here For:</b> {this.props.user.herefor}</span> <br/>
          <span><b>Status:</b> {this.props.user.relationship}</span> <br/>
          <br/>
          <span style={{fontSize:'12px', color:'white'}}>Private Information</span> <br/>
  				<span><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> {this.props.user.email}</span><br/>
  				<span><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> {this.props.user.latitude}, {this.props.user.longitude}</span>
          <br/>
          <hr/>
  				<div className="rainBlue" style={{borderRadius:'10px', marginTop:'10px', border:'2px white solid'}}>
  				<span style={{fontSize:'12px', color:'white'}}><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Settings</span> 
          <br/>				
          <input type="button" className="btn loginButton" value="Edit Info" onClick={this.openModal} />
          <Modal visible={this.state.visible} width="500px" height="600px" effect="fadeInUp" onClickAway={() => this.closeModal()}>
              <div style={{padding:'10px'}} className="modalBack">
                  <h3 className="purpleText"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Edit Info</h3>
                  <br/>
                  <div className='form-group'>
                    <form onSubmit={this.handleDescriptionSubmit}>
                      <textarea id="textarea" onChange={this.getDescription} rows="4" maxLength='130' placeholder={this.props.user.description || 'Type Here...'} style={{margin:'auto'}} type="text" className="form-control themeInput"></textarea>
                      <button type='submit' className='btn connButton'><span className="glyphicon glyphicon-ok" aria-hidden="true"></span> Save</button>
                    </form>
                    <span className="whiteText">{this.state.message}</span>
                  </div>
                  <hr/>
                  <UnblockAllButton ID={this.props.user._id}/>
                  <br/>
                  <UpdateLocationButton ID={this.props.user._id}/>
                  <br/>
                  <DeleteAccountButton ID={this.props.user._id} user={this.props.user}/>
                  <br/>
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
