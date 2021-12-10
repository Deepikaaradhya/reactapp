import React,{Component} from 'react';
import './placeorder.css';

const url="https://julynodeapi.herokuapp.com/menuItem";
const PostUrl="https://julynodeapi.herokuapp.com/placeOrder";

class PlaceOrder extends Component {
    constructor(props) {
        super(props)

        this.state={
            details:'',
            tPrice:'',
            hotel_name:this.props.match.params.restName,
            name:'',
            phone:'',
            email:'',
            address:'',
            status:'Pending'
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})

    }

    handleSubmit = () =>{
        console.log(this.state)
        fetch(PostUrl,
            {
                method:'POST',
                headers:{
                    'accept':'application/json',
                    'content-type':'application/json'
                },
                body:JSON.stringify(this.state)
            }
        )
        .then(this.props.history.push('/viewOrder'))
    }

    renderItem = (data) => {
        if(data){
            return data.map((item) =>{
                return(
                    <div className="items" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <h3>{item.menu_name}</h3>
                        <h4>Rs {item.menu_price}</h4>
                    </div>
                )
            })    
        }else{
            return(
                <img src="/images/loader.gif" alt="loader"/>
            )
        }
    }
    render(){
        return(
            <div className="container">
                <br/>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3>
                            Your order from {this.props.match.params.restName} is below:
                        </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input className="form-control" name="name" value={this.state.name}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div> 
                                <div className="col-md-6"> 
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input className="form-control" name="email" value={this.state.email}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>    
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input className="form-control" name="phone" value={this.state.phone}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <input className="form-control" name="address" value={this.state.address}
                                        onChange={this.handleChange}/>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        {this.renderItem(this.state.details)}
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Total Cost is Rs.{this.state.tPrice}</h2>
                            </div>
                        </div>
                        <button className="btn btn-success" onClick={this.handleSubmit} type="submit">
                            Checkout
                        </button>      
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        var menuItem = sessionStorage.getItem('menu');
        var orderId = []
        menuItem.split(',').map((item) =>{
            orderId.push(parseInt(item))
            return 'ok'
        })
        fetch(url,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(orderId)
        })
        .then((res) => res.json())
        .then((data) => 
        {
            var Totalprice = 0;
            data.map((item) => {
                Totalprice = Totalprice+parseInt(item.menu_price)
                return 'ok'
            })
            this.setState({details:data,tPrice:Totalprice})
        })
    }
}

export default PlaceOrder