import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import './shopping.css';

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidUpdate(prevProps)
  {
    if(this.props.isAuthenticated){
    if(prevProps.isAuthenticated !==this.props.isAuthenticated)
    {
      const userId=this.props.auth.user.id;
      const data={
        userId:userId
      }
      this.props.getItems(data);
    }
  }
  }


  onDeleteClick = name => {
    const data={
      userId:this.props.auth.user.id,
      name:name
    }
    this.props.deleteItem(data);
  };

  render() {
    const { items } = this.props.item
   
    return (
      <div>
      {this.props.isAuthenticated?<Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem style={{color:"black",fontSize:"1rem",fontWeight:"400"}}>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this,name)}
                      style={{float:"right"}}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>:<div style={{textAlign:"center"}}><h4  style={{textAlign:"center",fontSize:"4rem",marginTop:"25px"}}><b>"You can forget but not me "</b></h4>
      <div>
        <img src={require('../image/time.svg')} className="imagestyle"></img>
      </div>
      </div>
      }
      </div>
      
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  auth:state.auth
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);