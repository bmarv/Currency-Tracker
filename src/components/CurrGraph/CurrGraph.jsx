import React from 'react'
import {Line} from 'react-chartjs-2';

const CurrGraph = (props) => {
    if(!props.data){
        return 'Please choose a Currency'
    }


    var dateObject = {}
    var ratesObject = {}
    for (var curr in props.data){
      if(Object.values(props.data[curr]).length){
        for(var i=0; i< Object.keys(props.data[curr]).length; i++){
          var obj = props.data[curr][i]
          if (dateObject[curr]===undefined){
            dateObject[curr] = []
            ratesObject[curr] = []
          } else{
            dateObject[curr].push(obj[Object.keys(obj)[0]])
            ratesObject[curr].push(obj[Object.keys(obj)[1]])
          }
        }
        dateObject[curr].reverse()
        ratesObject[curr].reverse()
      }
    }

    const data = {
        labels: dateObject[Object.keys(dateObject)[0]],
        datasets: [
          {
            label: Object.keys(props.data)[0],
            hidden: (Object.keys(props.data)[0]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[0]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: Object.keys(props.data)[1],
            hidden: (Object.keys(props.data)[1]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[1]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 223, 111, 1)"
          },
          {
            label: Object.keys(props.data)[2],
            hidden: (Object.keys(props.data)[2]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[2]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 20, 111, 1)"
          },
        ]
      };

      const data4 = {
        labels: dateObject[Object.keys(dateObject)[0]],
        datasets: [
          {
            label: Object.keys(props.data)[0],
            hidden: (Object.keys(props.data)[0]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[0]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: Object.keys(props.data)[1],
            hidden: (Object.keys(props.data)[1]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[1]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 223, 111, 1)"
          },
          {
            label: Object.keys(props.data)[2],
            hidden: (Object.keys(props.data)[2]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[2]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 20, 111, 1)"
          },
          {
            label: Object.keys(props.data)[3],
            hidden: (Object.keys(props.data)[3]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[3]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 192, 20, 1)"
          },
        ]
      };

      const data5 = {
        labels: dateObject[Object.keys(dateObject)[0]],
        datasets: [
          {
            label: Object.keys(props.data)[0],
            hidden: (Object.keys(props.data)[0]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[0]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: Object.keys(props.data)[1],
            hidden: (Object.keys(props.data)[1]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[1]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 223, 111, 1)"
          },
          {
            label: Object.keys(props.data)[2],
            hidden: (Object.keys(props.data)[2]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[2]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 20, 111, 1)"
          },
          {
            label: Object.keys(props.data)[3],
            hidden: (Object.keys(props.data)[3]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[3]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 192, 20, 1)"
          },{
            label: Object.keys(props.data)[4],
            hidden: (Object.keys(props.data)[4]===props.secondaryCurrency)? false:true,
            data: ratesObject[Object.keys(ratesObject)[4]],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(1, 100, 100, 100)"
          },
        ]
      };
    return(
      <div>
        {(Object.keys(props.data)[4])?
            <Line data={data5} />
          : ((Object.keys(props.data)[3])?
            <Line data={data4} />
            : <Line data={data} />)
        }
      </div>
    )
}

export default CurrGraph