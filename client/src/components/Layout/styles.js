const styles = {
  layout: {
    background: "#E0E0E0",
    padding: "20px",
    color:'#fff'
  },
  header: {
    color: "#fff",
    fontSize: "3rem",
    background: "#7FB3D5",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)", // Add a subtle shadow for depth
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    margin: "0",
    color: "#fff", // Moved color property here
  },
  menu:{
    background:'none',
    color:'#fff',
  },
  footer: {
    color: "white",
    textAlign: "center",
    background:
      "#7FB3D5",
  },
};
export default styles;