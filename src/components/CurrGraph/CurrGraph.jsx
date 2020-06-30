import React from 'react'
import { Line} from 'react-chartjs-2';

const CurrGraph = (props) => {
    if(!props.data){
        return 'Please choose a Currency'
    }

    var dateList=[]
    var ratesList=[]
    if (Object.values(props.data).length){
        for(var i=0; i<Object.keys(props.data).length;i++){
            var obj = props.data[i] 
            dateList.push(obj[Object.keys(obj)[0]])
            ratesList.push(obj[Object.keys(obj)[1]])
        }
        dateList.reverse()
        ratesList.reverse()
    }

    const data = {
        labels: dateList,
        datasets: [
          {
            label: props.secondaryCurrency,
            data: ratesList,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
        ]
      };

    return(
       <Line data={data} />
    )
}

export default CurrGraph