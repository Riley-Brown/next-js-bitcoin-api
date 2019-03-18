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
    setInterval(this.getBitcoinData, 30000);
    this.getBitcoinData();
  }
  componentWillUnmount() {
    clearInterval(this.getBitcoinData);
  }

  getBitcoinData = () => {
    console.log('running');
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(function(response) {
        return response.json();
      })
      .then(api => {
        let currentCurrency = this.state.currency;
        this.setState({
          price: api.bpi[currentCurrency].rate,
          description: api.bpi[currentCurrency].description,
          currencyCode: api.bpi[currentCurrency].code
        });
      });
  };
  onChange = e => {
    e.preventDefault();
    let target = e.target.value;
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(function(response) {
        return response.json();
      })
      .then(api => {
        this.setState({
          price: api.bpi[target].rate,
          description: api.bpi[target].description,
          currencyCode: api.bpi[target].code,
          currency: target
        });
      });
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
            <li className="list-group-item">
              <form onChange={this.onChange}>
                <span className="mr-1">Change Currency: </span>
                <select name="currency" id="">
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                </select>
              </form>
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
