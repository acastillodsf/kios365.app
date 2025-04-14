import React, { useEffect, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import clienteAxios from 'src/config/axios'
import { useDispatch } from 'react-redux'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandWarning = getStyle('warning') || '#f9b115'
const brandDanger = getStyle('danger') || '#f86c6b'

const DigiGrapic = ({setData,...attributes}) => {
    const [labels,setLabels] = useState([]);
    const [defaultDatasets,setdefaultDatasets] = useState([])
    const dispatch = useDispatch();
 
    useEffect(() => getToken(), []);

    const getToken = async () => {
      try {
        dispatch({type: 'DKGRAFIC'})

        const peticion = await clienteAxios.get("/dk_grafico");
        dispatch({type: 'DKGRAFIC_OK',payload : peticion})
        const lab = []
        const data1 = []
        const data2 = []
        const data3 = []
        const data4 = []
        peticion.data.map((row)=>{
            lab.push(row.label);
            data1.push(row.ahorro);
            data2.push(row.aportaciones);
            data3.push(row.certificado);
            data4.push(row.digiplatinum);
            setData(row);
            console.log()
        })
        setLabels(lab);
        setdefaultDatasets([
            {
                label: 'Ahorro',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: brandInfo,
                borderWidth: 1,
                data: data1
              },
              {
                label: 'Aportaciones',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: brandSuccess,
                borderWidth: 1,
                data: data2
              },
              {
                label: 'Certificado',
                backgroundColor: 'transparent',
                borderColor: brandWarning,
                pointHoverBackgroundColor: brandWarning,
                borderWidth: 1,
                // borderDash: [8, 5],
                data: data3
              },
              {
                label: 'Digiplatinum',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: brandDanger,
                borderWidth: 1,
                // borderDash: [8, 5],
                data: data4
              }
        ])
      } catch (error) {
        dispatch({type: 'DKGRAFIC_ERROR',payload : error.response.data})
        console.log(error.response.data)}
    };
  const defaultDatasetss = (()=>{
    let elements = 27
    const data1 = []
    const data2 = []
    const data3 = []
    
    // for (let i = 0; i <= elements; i++) {
    //   data1.push(random(50, 200))
    //   data2.push(random(80, 100))
    //   data3.push(65)
    // }
    // console.log(data1)
    return [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2
      },
      {
        label: 'My Third dataset',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: data3
      }
    ]
  })()

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


export default DigiGrapic
