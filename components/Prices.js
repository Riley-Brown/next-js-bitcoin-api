import fetch from 'isomorphic-unfetch';

class Prices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'USD',
      price: this.props.bpi.bpi.USD.rate,
      description: this.props.bpi.bpi.description,
      currencyCode: this.props.bpi.bpi.USD.code
    };
  }

  componentDidMount() {
    setInterval(this.getBitcoinData, 15000);
    this.getBitcoinData();
  }
  componentWillUnmount() {
    clearInterval(this.getBitcoinData);
  }

  getBitcoinData = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(function(response) {
        return response.json();
      })
      .then(api => {
        this.setState({
          price: api.bpi.USD.rate,
          description: api.bpi.USD.description,
          currencyCode: api.bpi.USD.code
        });
        console.log(api.bpi);
      });

    console.log('running');
    // this.setState({
    //   price: '1234'
    // });
  };

  render() {
    let api;
    if (this.props.bpi) {
      api = (
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              Bitcoin rate for {this.state.description}:
              <span className="badge badge-primary mx-2">
                {this.state.currencyCode}
              </span>
              <strong>{this.state.price}</strong>
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
