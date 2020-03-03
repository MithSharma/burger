import React from 'react';
import { Modal , Button } from 'react-bootstrap';
import classes from './Modal.module.css'

const modal = ( props ) => {
        return(
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                <p>
                  {props.children}
                </p>
              </Modal.Body>
              {/* <Modal.Footer className={classes.ModalFooter}>
              <Button onClick={props.onHide} variant="danger">Close</Button>
                <Button onClick={props.onHide} variant="success">Continue</Button>
              </Modal.Footer> */}
            </Modal>
        )
}

export default modal;