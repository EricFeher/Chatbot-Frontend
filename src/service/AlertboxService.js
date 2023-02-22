import axios from "axios"

const alertboxFollowChange = async (data) => {
    const headers = {
        'Content-Type': 'multipart/form-data'
      }

    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCAL_URI}/editFollow`, data, headers);
        return res
      } catch (err) {
        console.error(err);
      }
}

const AlertboxService = {
    alertboxFollowChange
}

export default AlertboxService