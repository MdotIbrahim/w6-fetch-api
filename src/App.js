import { useEffect, useState, React } from "react";
import './App.css';
import Modal from 'react-modal';
import styled from "styled-components"
let show = false
const App = () => {
    const [randomPersonArr, setRandomPersonArr] = useState([])

    const fetchData =  async () => {
      try {
      const response = await fetch("https://randomuser.me/api/?results=20")
      const data = await response.json()
      if (!response.ok){
        throw new Error(response.statusText)
      }
      console.log(response)
      setRandomPersonArr(data.results) // add object to the array so can use map function. - edit: or in this new case just take the array from the object if it exists...
      console.log(randomPersonArr)
      } catch (err) {
        console.log(err)
      }
    }

    useEffect (() => {
      fetchData()// eslint-disable-next-line
    }, [])

    const [showModal, setShowModal] = useState(false)
    // useEffect (() => {
    //   showInfo()
    // },[showModal])

    // handleOpenModal = handleOpenModal.bind();
    // handleCloseModal = handleCloseModal.bind();

    const handleOpenModal = () => {
      setShowModal(true)
    }

    const handleCloseModal = () => {
      setShowModal(false)
    }
    const [modalHuman, setModalHuman] = useState(randomPersonArr[0]);
    
    const showInfo = () => {
      if (modalHuman !== null){
        show = true
      }
    }
    return (
      <>
      <h1>Random Humans</h1>
      <div className="container">
          
          {randomPersonArr.map((human, index) => {
            return (
            <div key= {index} className="human-container">
                <img src = {human.picture.large} alt="human" width={"100%"} onClick={() => {setModalHuman(human); showInfo(); handleOpenModal();}}/>
                {/* <button onClick={handleOpenModal}>Open Modal</button> */}
                <Modal isOpen = {showModal} contentLabel = "Random Human Modal" onRequestClose={handleCloseModal}>
                  <ModalStyling>
                  {show && 
                  <>
                  <HumanImgModal>
                  <img src = {modalHuman.picture.large} alt="human" onClick={handleCloseModal}/>
                  </HumanImgModal>
                  <p>Name: {modalHuman.name.first} {modalHuman.name.last}</p>
                  <p>Gender: {modalHuman.gender}</p>
                  <p>Age: {modalHuman.dob.age}</p>
                  <p>Country: {modalHuman.location.country}</p>
                  <p>Email: {modalHuman.email}</p>
                  </>
                  }

                  </ModalStyling>
                {/* <button onClick={handleCloseModal}>Close Modal</button> */}
                </Modal>
                {/* <p>Name: {human.name.first} {human.name.last}</p>
                <p>Gender: {human.gender}</p>
                <p>Age: {human.dob.age}</p>
                <p>Country: {human.location.country}</p>
                <p>Email: {human.email}</p> */}
            </div>
            
            )
            
          })}

      </div>
      </>
    );
}

export default App;

const HumanImgModal = styled.div`
    max-width: 10%;
    max-height: 10%;
    display: block;
    padding-left: 640px;
`

const ModalStyling = styled.div`
    color: #965fc7;
    text-align: center;
    
`
