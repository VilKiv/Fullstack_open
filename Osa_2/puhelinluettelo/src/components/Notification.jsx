const Notification = ({ message,active,color}) => {
    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      }

    if (!active) {
      return null
    }
  
    return (
        <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  export default Notification