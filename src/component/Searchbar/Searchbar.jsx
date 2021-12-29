import {  useState } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled'
import PropTypes from "prop-types";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MdFindReplace } from "react-icons/md";
import { IconContext } from "react-icons";




const Searchbar = ({onSubmit}) =>{


const [searchQuery, setSearchQuery]=useState(''); 

const handleSubmitChange = (event) => {
  setSearchQuery( event.currentTarget.value.toLowerCase())
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
        toast.error('Введите Запрос.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');

    

  };

  return (
    <Header >
      <Form onSubmit={handleSubmit} >
        <Button type="submit"  >
          <IconContext.Provider value={{ color: "ffffff", size: "2em" }}>
            <div>
              <MdFindReplace />
            </div>
          </IconContext.Provider>



          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSubmitChange}

        />
      </Form>
    </Header>
  )


}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;