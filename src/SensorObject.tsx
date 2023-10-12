function SensorObject(props: any) {
    return (
      <>
        <h3 style={{ color: "black", background:'white' }}>{props.children}</h3>
      </>
    );
}

export default SensorObject;