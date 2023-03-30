import axios from "axios"
import BasicFunctions from "../utils/BasicFunctions";

const getCommands = async (data) => {

    try {
        const res = await axios.post(`${BasicFunctions.getCorrectBackendUrl()}/commands`, data);
        return res;
      } catch (err) {
        console.error(err);
      }
}

const setCommand = async (data) => {
    try {
      const res = await axios.post(`${BasicFunctions.getCorrectBackendUrl()}/modifyCommand`, data);
      return res;
    } catch (err) {
      console.error(err);
    }
}

const deleteCommand = async (data) => {
  try {
    const res = await axios.post(`${BasicFunctions.getCorrectBackendUrl()}/deleteCommand`, data);
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