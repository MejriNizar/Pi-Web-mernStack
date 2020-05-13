import { slide as Menu } from 'react-burger-menu'
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '30px',
      height: '20px',
      left: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#fafafa'
    },
    bmBurgerBarsHover: {
      background: '#fafafa'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#fafafa'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#fafafa',
      padding: '1.4em 0.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
  

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.type = "Push";
        this.btnClick = this.btnClick.bind(this);
        this.closeClick = this.closeClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.state = {projectsSide: []};
        this.data = ["Groups", "Projects"];

        this.fields = { text: "name", tooltip: "name", id: "_id" };
    }
    componentDidMount() {
         axios.get('/api/project/activatedProject')
            .then(response => {
                this.setState({ projectsSide: response.data });
                this.fields = { text: "name", tooltip: "name", id: "_id" };
                console.log(this.state)
            })
            .catch(function (error){
                console.log(error);
            })
    }
    onCreate() {
        this.sidebarObj.element.style.visibility = '';
    }
    // Toggle button click event handler
    btnClick() {
        if (this.btnObj.element.classList.contains('e-active')) {
            this.btnObj.iconCss = 'e-icons burg-icon';
            this.sidebarObj.show();
        }
        else {
            this.btnObj.iconCss = 'e-icons burg-icon';
            this.sidebarObj.hide();
        }
    }
    // Toggle(Open/Close) the Sidebar
    toggleClick() {
        this.sidebarObj.toggle();
    }
    // Close the Sidebar
    closeClick() {
        this.sidebarObj.hide();
    }
    // function to handle the CheckBox change event
    onChange(args) {
        this.sidebarObj.position = (args.event.target.id === "left") ? "Left" : "Right";
    }
    generate(element) {
      return [0, 1].map((value) =>
        React.cloneElement(element, {
          key: value,
        }),
      );
    }
    
    render() {
        return (
            <div id="outer-container">
  
            <Menu styles={ styles } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } width={ 273 }>
            <div className="title"><i className="fas fa-code"></i>EDUPS</div>
            <div >
            <List >
              
                <ListItem>
                <ListItemAvatar>
                  <Avatar>
                  <HomeIcon />
                  </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Home"
                  />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                  <Avatar>
                  <GroupIcon/>
                  </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Groups"
                  />
                </ListItem>
              
            </List>
          </div>
          <br/>
            <hr/>
            <div >
            <Link to="/all-project"><h6>Projects</h6></Link>
            <List dense={true}>
              {this.state.projectsSide.map(p=>
                <ListItem
                   onClick={<Redirect to={`/project-details/${p._id}`}/> }>
                  <ListItemAvatar>
                  <Avatar>{p.name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.name}
                    
                  />
                </ListItem>,
              )}
            </List>
          </div>
            
            
          </Menu>
          </div>
          
          );
    }
}
