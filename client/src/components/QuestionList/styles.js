const styles = {
    row:{
        marginBottom: '10px'
    },
    sider:{
        background: '#f0f2f5'
    },
    content:{
        margin:'2rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px', // Adjust margin as needed
      },
    button: {
        color:'#fff',
        width: '200px',
        background: '#1AAD1F',
        textAlign: 'center',
        transition: 'background 0.3s ease', // Adding transition for smooth effect
        cursor: 'pointer' // Change cursor to pointer on hover
      },
      // Hover effect
      buttonHover: {
        background: '#7FB3D5', // Change background color on hover
      },
      result: {
        
        background: '#fff',
        borderRadius: '2px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop:'20px',
        marginBottom: '20px',
        fontSize: '16px'
      },
      cell: {
        padding: '10px',
        textAlign: 'center',
        border: '1px solid #ddd'
      }
}

export default styles