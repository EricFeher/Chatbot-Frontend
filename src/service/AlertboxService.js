import axios from "axios"
import BasicFunctions from "../utils/BasicFunctions";

const alertboxFollowChange = async (data) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
      }

    try {
        const res = await axios.post(`${BasicFunctions.getCorrectBackendUrl()}/editFollow`, data, headers);
        return res
      } catch (err) {
        console.error(err);
      }
}

const AlertboxService = {
    alertboxFollowChange
}

export default AlertboxService