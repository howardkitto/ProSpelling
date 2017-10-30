import React, {Component} from 'react'



class DateTime extends Component{

    constructor(props){
        super(props)
        this.state = {
            dateTime:''
        }
    }

    formatDateTime(dateTime){
        
            let dateTimeObj = new Date(dateTime)
            let hours = String(dateTimeObj.getHours())
            let rawMinutes = String(dateTimeObj.getMinutes())
            let minutes = (rawMinutes.length > 1)?rawMinutes:'0'+rawMinutes
            let date = String(dateTimeObj.getDate())
            let month = String(dateTimeObj.getMonth())
            let fullYear = String(dateTimeObj.getFullYear())

            let dateTimeString = hours+':' + minutes+'  '+date + '/' + month +'/' + fullYear

            this.setState({dateTime : dateTimeString})

        }
    
    componentDidMount(){
        this.formatDateTime(this.props.utc)
    }

    render(){

        return(
            <div>
                {this.state.dateTime}
            </div>
        )
    }
}

export default DateTime