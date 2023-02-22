import axios from "axios"

const getCommands = async (data) => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCAL_URI}/commands`, data);
        return res;
      } catch (err) {
        console.error(err);
      }
}

const setCommand = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCAL_URI}/modifyCommand`, data);
      return res;
    } catch (err) {
      console.error(err);
    }
}

const deleteCommand = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCAL_URI}/deleteCommand`, data);
    return res;
  } catch (err) {
    console.error(err);
  }
}

const CommandService = {
    getCommands,
    setCommand,
    deleteCommand
}

export default CommandService