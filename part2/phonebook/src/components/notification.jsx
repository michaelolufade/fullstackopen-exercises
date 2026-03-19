const Notification = ({ message, color}) => {
    if (message === null) {
      return null
    }

    const style = {
      color: color,
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
      display: message ? "block" : "none"
    }

    return (
      <div style={style}>
        {message}
      </div>
    )
  }

  export default Notification