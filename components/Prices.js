class Prices extends React.Component {
  state = {
    currency: 'USD'
  };
  render() {
    let api;
    if (this.props.bpi) {
      api = (
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              Bitcoin rate for {this.props.bpi.bpi.USD.description}:
              <span className="badge badge-primary mx-2">
                {this.props.bpi.bpi.USD.code}
              </span>
              <strong>{this.props.bpi.bpi.USD.rate}</strong>
            </li>
          </ul>
        </div>
      );
    } else {
      api = <h1>Loading</h1>;
    }
    return <div>{api}</div>;
  }
}

export default Prices;
