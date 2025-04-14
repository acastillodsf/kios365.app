import React, { useEffect, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import clienteAxios from 'src/config/axios'
import { useDispatch } from 'react-redux'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandWarning = getStyle('warning') || '#f9b115'
const brandDanger = getStyle('danger') || '#f86c6b'

const DigiGrapicPlatinum = ({DigiAccountGrapic,...attributes}) => {
     const dispatch = useDispatch();
     const [labels, setLabels] = useState([]);
     const [defaultDatasets, setdefaultDatasets] = useState([]);

     useEffect(()=>{

      if(DigiAccountGrapic.mouth_profit !==undefined){
        const lab = []
        const data1 = []
        DigiAccountGrapic.mouth_profit.map((row)=>{
            lab.push(row.mouth);
            data1.push(row.profit_mouth);
            console.log()
        })
        setLabels(lab);
        setdefaultDatasets([
              {
                label: 'Digiplatinum',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: brandDanger,
                borderWidth: 1,
                // borderDash: [8, 5],
                data: data1
              }
        ])
      }
    },[DigiAccountGrapic])
 
     
  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
            //   stepSize: Math.ceil(1 / 5),
            stepSize: 6
            //   max: 210000
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={labels}
    />
  )
}


export default DigiGrapicPlatinum
